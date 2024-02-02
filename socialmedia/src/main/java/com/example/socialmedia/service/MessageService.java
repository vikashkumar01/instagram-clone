package com.example.socialmedia.service;

import com.example.socialmedia.entities.Message;
import com.example.socialmedia.exception.ResourcesNotFound;

import java.util.List;
import java.util.Map;

public interface MessageService {

    Map<String, String> sendMessage(String senderId, String receiverId, String cmessage) throws ResourcesNotFound;

    Map<String, List<Message>> getAllMessageOfUser(String userId, String followerId) throws ResourcesNotFound;

    Map<String, String> deleteMessage(String messageId) throws ResourcesNotFound;
}
