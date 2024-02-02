package com.example.socialmedia.service;

import com.example.socialmedia.entities.User;
import com.example.socialmedia.entities.UserMessage;
import com.example.socialmedia.exception.ResourcesNotFound;

import java.util.List;
import java.util.Map;

public interface UserMessageService {

    Map<String,String> createMessageUser(String userId,String otherUserId) throws ResourcesNotFound;

    List<UserMessage> getAllUserMessage(String userId) throws ResourcesNotFound;

    Map<String,String> deleteUserMessage(String userMessageId) throws ResourcesNotFound;

}
