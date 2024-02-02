package com.example.socialmedia.service.impl;

import com.example.socialmedia.entities.Comment;
import com.example.socialmedia.entities.Post;
import com.example.socialmedia.entities.User;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.repository.CommentRespository;
import com.example.socialmedia.repository.PostRepository;
import com.example.socialmedia.repository.UserRepository;
import com.example.socialmedia.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class CommentServiceImpl implements CommentService {
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    private final CommentRespository commentRepository;

    public CommentServiceImpl(UserRepository userRepository,
                              PostRepository postRepository,
                              CommentRespository commentRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public Map<String, String> commentOnPost(String message, String postId, String userId) throws ResourcesNotFound {
        User user = userRepository.findById(userId).orElseThrow(
                ()->new ResourcesNotFound("user not found")
        );
        Post post = postRepository.findById(postId).orElseThrow(
                ()->new ResourcesNotFound("post not found")
        );
        Comment comment = new Comment();
        comment.setId(UUID.randomUUID().toString());
        comment.setMessage(message);
        comment.setUserId(user);
        comment.setPostId(post);
        Comment c = commentRepository.save(comment);
        user.getUserCommentOnPost().add(c);
        post.getUserComment().add(c);
        userRepository.save(user);
        postRepository.save(post);
        Map<String,String> res = new HashMap<>();
        res.put("message","comment on post");
        return res;
    }

    @Override
    public Map<String, String> deleteComment(String commentId) throws ResourcesNotFound {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(comment.isEmpty()){
            throw new ResourcesNotFound("comment not found");
        }
        Post post = postRepository.findById(comment.get().getPostId().getId()).orElseThrow(
                ()->new ResourcesNotFound("post not found")
        );
        post.getUserComment().remove(comment.get());
        postRepository.save(post);
        User user = userRepository.findById(comment.get().getUserId().getId()).orElseThrow(
                ()->new ResourcesNotFound("user not found")
        );
        user.getUserCommentOnPost().remove(comment.get());
        userRepository.save(user);
        commentRepository.deleteById(commentId);
        Map<String,String> res = new HashMap<>();
        res.put("message","comment deleted");
        return res;
    }

    @Override
    public Map<String, String> likeOrDislikeComment(String userId, String commentId) throws ResourcesNotFound {
        Map<String,String> res = new HashMap<>();
        User user = userRepository.findById(userId).orElseThrow(
                ()->new ResourcesNotFound("user not found")
        );
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                ()->new ResourcesNotFound("comment not found")
        );

        if(comment.getUserLikedComment().contains(user)){
            comment.getUserLikedComment().remove(user);
            commentRepository.save(comment);
            res.put("message","disliked comment");
        }else{
            comment.getUserLikedComment().add(user);
            commentRepository.save(comment);
            res.put("message","uliked comment");
        }
        return res;
    }
}
