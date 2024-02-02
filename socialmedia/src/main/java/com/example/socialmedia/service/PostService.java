package com.example.socialmedia.service;

import com.example.socialmedia.entities.Post;
import com.example.socialmedia.exception.ResourcesAlreadyExist;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.exception.SomethingWentWrong;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface PostService {

    Map<String, String> createPost(String postTitle, String postDesc, MultipartFile file, String userId) throws ResourcesNotFound, IOException, SomethingWentWrong;

    Map<String, String> likeOrUnlikePost(String postId, String userId) throws ResourcesNotFound;

    List<Post> getAllPost();

    List<Post> getAllReels();

    List<Post> getAllPostOfUser(String userId) throws ResourcesNotFound;

    Map<String, Post> getPostById(String postId) throws ResourcesNotFound;

    Map<String, String> updatePost(String postTitle, String postDesc, String userId) throws ResourcesNotFound;

    Map<String, String> updatePostImageOrVideo(String postId, MultipartFile imageOrVideo) throws IOException, ResourcesNotFound;

    Map<String, String> deletePost(String postId) throws ResourcesNotFound, IOException;

    Map<String, String> reportPost(String postId, String userId) throws ResourcesNotFound, ResourcesAlreadyExist;
}
