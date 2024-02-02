package com.example.socialmedia.service;

import com.example.socialmedia.entities.Story;
import com.example.socialmedia.entities.User;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.exception.SomethingWentWrong;
import com.example.socialmedia.response.UserStoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface StoryService {

    Map<String, String> shareUserStory(String userId, MultipartFile file) throws ResourcesNotFound, SomethingWentWrong, IOException;

    List<User> getAllUserHavingStory(String userId) throws ResourcesNotFound;

    UserStoryResponse getAllStoryOfUser(String userId) throws ResourcesNotFound;

    List<Story> getStoryOfUser(String userId) throws ResourcesNotFound;

    Map<String, String> deleteUserStory(String storyId) throws ResourcesNotFound, IOException;

    Map<String,String> createHighlights(String userId,String highlightName) throws ResourcesNotFound;

    Map<String,String> addStoryInHighlight(String userId,String storyId,String highlightId) throws ResourcesNotFound;

    Map<String,String> removeStory(String storyId, String highlightId) throws ResourcesNotFound;

    Map<String,String> deleteHighlight(String highlightId) throws ResourcesNotFound;


}
