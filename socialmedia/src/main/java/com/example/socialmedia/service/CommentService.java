package com.example.socialmedia.service;

import com.example.socialmedia.exception.ResourcesNotFound;
import org.springframework.stereotype.Service;

import java.util.Map;


public interface CommentService {

    Map<String, String> commentOnPost(String message, String postId, String userId) throws ResourcesNotFound;

    Map<String, String> deleteComment(String commentId) throws ResourcesNotFound;

    Map<String, String> likeOrDislikeComment(String userId, String commentId) throws ResourcesNotFound;
}
