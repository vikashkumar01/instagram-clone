package com.example.socialmedia.service.impl;

import com.example.socialmedia.entities.Post;
import com.example.socialmedia.entities.ReportPost;
import com.example.socialmedia.entities.User;
import com.example.socialmedia.exception.ResourcesAlreadyExist;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.exception.SomethingWentWrong;
import com.example.socialmedia.repository.PostRepository;
import com.example.socialmedia.repository.ReportPostRepository;
import com.example.socialmedia.repository.UserRepository;
import com.example.socialmedia.service.ImageOrVideoService;
import com.example.socialmedia.service.PostService;
import com.example.socialmedia.utils.Constants;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.module.ResolutionException;
import java.util.*;

@Service
public class PostServiceImpl implements PostService {
    private final UserRepository userRepository;
    private final ImageOrVideoService imageOrVideoService;
    private final PostRepository postRepository;
    private final ReportPostRepository reportPostRepository;

    public PostServiceImpl(UserRepository userRepository, ImageOrVideoService imageService,
                           PostRepository postRepository,
                           ReportPostRepository reportPostRepository) {
        this.userRepository = userRepository;
        this.imageOrVideoService = imageService;
        this.postRepository = postRepository;
        this.reportPostRepository = reportPostRepository;
    }

    @Override
    public Map<String, String> createPost(String postTitle, String postDesc, MultipartFile file, String userId) throws ResourcesNotFound, IOException, SomethingWentWrong {
        Map<String, String> res = new HashMap<>();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );

        Post post = new Post();
        post.setId(UUID.randomUUID().toString());
        post.setPostTitle(postTitle);
        post.setPostDesc(postDesc);
        Map<String, String> imgOrVideo = imageOrVideoService.uploadImageOrVideo(file, Constants.folderName);
        String contentType = file.getContentType();

        if (contentType != null) {
            if (contentType.startsWith("image")) {
                post.setPostImgId(imgOrVideo.get("imageOrVideoPublicId"));
                post.setPostImgUrl(imgOrVideo.get("imageOrVideoUrl"));
            } else if (contentType.startsWith("video")) {
                post.setPostReelId(imgOrVideo.get("imageOrVideoPublicId"));
                post.setPostReelUrl(imgOrVideo.get("imageOrVideoUrl"));
            } else {
                throw new SomethingWentWrong("unsupported media type");
            }
        }
        post.setUser(user);
        Post p = postRepository.save(post);
        user.getUserPost().add(p);
        userRepository.save(user);
        res.put("message", "post uploaded");
        return res;
    }

    @Override
    public Map<String, String> likeOrUnlikePost(String postId, String userId) throws ResourcesNotFound {
        Map<String, String> res = new HashMap<>();
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourcesNotFound("post not found")
        );

        if (post.getPostLiked().contains(user)) {
            post.getPostLiked().remove(user);
            user.getUserLikePost().remove(post);
            postRepository.save(post);
            userRepository.save(user);
            res.put("message", "unliked post");
        } else {
            post.getPostLiked().add(user);
            user.getUserLikePost().add(post);
            postRepository.save(post);
            userRepository.save(user);
            res.put("message", "liked post");

        }
        return res;
    }

    @Override
    public List<Post> getAllPost() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> getAllReels() {
        return postRepository.findAll().stream().filter((p)->p.getPostReelUrl()!=null).toList();
    }

    @Override
    public List<Post> getAllPostOfUser(String userId) throws ResourcesNotFound {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );
        List<Post> post = postRepository.findAllByUser(user);
        return post;
    }

    @Override
    public Map<String, Post> getPostById(String postId) throws ResourcesNotFound {

        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourcesNotFound("post not found")
        );
        Map<String, Post> res = new HashMap<>();
        res.put("post", post);
        return res;
    }

    @Override
    public Map<String, String> updatePost(String postTitle, String postDesc, String postId) throws
            ResourcesNotFound {

        Map<String, String> res = new HashMap<>();

        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourcesNotFound("post not found")
        );
        post.setPostTitle(postTitle);
        post.setPostDesc(postDesc);
        postRepository.save(post);
        res.put("message", "post updated");
        return res;
    }

    @Override
    public Map<String, String> updatePostImageOrVideo(String postId, MultipartFile image) throws
            IOException, ResourcesNotFound {

        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourcesNotFound("post not found")
        );
        if (post.getPostImgId() != null) {
            imageOrVideoService.deleteImageOrVideo(post.getPostImgId());
        }
        if(post.getPostReelUrl() !=null){
            imageOrVideoService.deleteImageOrVideo(post.getPostReelId());
        }
        Map<String, String> updatedImg = imageOrVideoService.uploadImageOrVideo(image, Constants.folderName);
        post.setPostImgId(updatedImg.get("imageOrVideoPublicId"));
        post.setPostImgUrl(updatedImg.get("imageOrVideoUrl"));
        postRepository.save(post);
        Map<String, String> res = new HashMap<>();
        res.put("message", "image updated");
        return res;
    }

    @Override
    public Map<String, String> deletePost(String postId) throws ResourcesNotFound, IOException {
        Map<String, String> res = new HashMap<>();
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourcesNotFound("post not found")
        );
        for (User u : post.getPostLiked()) {
            User user = userRepository.findById(u.getId()).orElseThrow(
                    () -> new ResourcesNotFound("user not found")
            );
            user.getUserLikePost().remove(post);
            userRepository.save(user);
        }

        List<User> userList  = userRepository.findAll();

        for(User u:userList){
            Set<Post> pst = u.getUserSavePostAndReel();
            pst.remove(post);
            userRepository.save(u);
        }

        if (post.getPostImgId() != null) {
            imageOrVideoService.deleteImageOrVideo(post.getPostImgId());
        }
        if(post.getPostReelId()!=null){
            imageOrVideoService.deleteImageOrVideo(post.getPostReelId());
        }
        postRepository.deleteById(postId);
        res.put("message", "post deleted");
        return res;
    }

    @Override
    public Map<String, String> reportPost(String postId, String userId) throws
            ResourcesNotFound, ResourcesAlreadyExist {

        Map<String, String> res = new HashMap<>();

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );

        ReportPost rpost = reportPostRepository.findByPostId(postId);

        if (rpost == null) {
            ReportPost reportPost = new ReportPost();
            reportPost.setReportedPostId(UUID.randomUUID().toString());
            reportPost.setPostId(postId);
            reportPost.getUser().add(user);
            reportPost.setReportCount(1);
            ReportPost rp = reportPostRepository.save(reportPost);
            user.getUserReportedPost().add(rp);
            userRepository.save(user);
            res.put("message", "user reported post successfully");
        } else {
            if (rpost.getUser().contains(user)) {
                throw new ResourcesAlreadyExist("user already reported this post ");
            } else {
                rpost.getUser().add(user);
                rpost.setReportCount(rpost.getReportCount() + 1);
                ReportPost rp = reportPostRepository.save(rpost);
                user.getUserReportedPost().add(rp);
                userRepository.save(user);
                res.put("message", "reported recorded");
            }
        }
        return res;
    }
}
