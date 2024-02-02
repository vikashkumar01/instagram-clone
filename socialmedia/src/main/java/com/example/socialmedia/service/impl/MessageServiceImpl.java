package com.example.socialmedia.service.impl;


import com.example.socialmedia.entities.Message;
import com.example.socialmedia.entities.User;
import com.example.socialmedia.entities.UserMessage;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.repository.MessageRepository;
import com.example.socialmedia.repository.UserMessageRepository;
import com.example.socialmedia.repository.UserRepository;
import com.example.socialmedia.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserMessageRepository userMessageRepository;

    @Override
    public Map<String, String> sendMessage(String senderId, String receiverId, String cmessage) throws ResourcesNotFound {

        User userSender = userRepository.findById(senderId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );

        User userReceiver = userRepository.findById(receiverId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );

        UserMessage userMessage = null;
        UserMessage userMessage1 = userMessageRepository.findByCreatedByAndCreatedFor(userSender, userReceiver);
        UserMessage userMessage2 = userMessageRepository.findByCreatedByAndCreatedFor(userReceiver, userSender);

        if (userMessage1 != null) {
            userMessage = userMessage1;
        }

        if (userMessage2 != null) {
            userMessage = userMessage2;
        }

        Message message = new Message();
        message.setId(UUID.randomUUID().toString());
        message.setUserId(senderId);
        message.setChatMessage(cmessage);
        message.setUserMessage(userMessage);
        Message mess = messageRepository.save(message);
        assert userMessage != null;
        userMessage.getMessageList().add(mess);
        userMessageRepository.save(userMessage);
        Map<String, String> res = new HashMap<>();
        res.put("message", "message sent");
        return res;
    }

    @Override
    public Map<String, List<Message>> getAllMessageOfUser(String senderId, String receiverId) throws ResourcesNotFound {

        User sender = userRepository.findById(senderId).orElseThrow(() -> new ResourcesNotFound("user not found"));
        User receiver = userRepository.findById(receiverId).orElseThrow(() -> new ResourcesNotFound("user not found"));

        UserMessage userMessage = null;

        UserMessage userMessage1 = userMessageRepository.findByCreatedByAndCreatedFor(sender, receiver);
        UserMessage userMessage2 = userMessageRepository.findByCreatedByAndCreatedFor(receiver, sender);

        if (userMessage1 != null) {
            userMessage = userMessage1;
        }

        if (userMessage2 != null) {
            userMessage = userMessage2;
        }

        List<Message> messageList = messageRepository.findAllByUserMessageOrderByCreatedAtAsc(userMessage);

        Map<String, List<Message>> res = new HashMap<>();
        res.put("message", messageList);

        return res;
    }

    @Override
    public Map<String, String> deleteMessage(String messageId) throws ResourcesNotFound {

        Message message = messageRepository.findById(messageId).orElseThrow(
                () -> new ResourcesNotFound("message not found")
        );
        message.getUserMessage().getMessageList().remove(message);
        messageRepository.deleteById(messageId);
        Map<String, String> res = new HashMap<>();
        res.put("message", "message deleted");
        return res;
    }
}
