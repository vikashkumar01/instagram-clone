package com.example.socialmedia.service.impl;

import com.example.socialmedia.entities.User;
import com.example.socialmedia.entities.UserMessage;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.repository.UserMessageRepository;
import com.example.socialmedia.repository.UserRepository;
import com.example.socialmedia.service.UserMessageService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserMessageServiceImpl implements UserMessageService {

    private final UserMessageRepository userMessageRepository;

    private final UserRepository userRepository;


    public UserMessageServiceImpl(UserMessageRepository userMessageRepository,
                                  UserRepository userRepository) {
        this.userMessageRepository = userMessageRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Map<String, String> createMessageUser(String userId, String otherUserId) throws ResourcesNotFound {

        Map<String, String> res = new HashMap<>();

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourcesNotFound("user not found"));
        User otheruser = userRepository.findById(otherUserId).orElseThrow(() -> new ResourcesNotFound("user not found"));

        UserMessage userExist1 = userMessageRepository.findByCreatedBy(user);
        UserMessage userExist2 = userMessageRepository.findByCreatedFor(otheruser);
        UserMessage userExist3 = userMessageRepository.findByCreatedBy(otheruser);
        UserMessage userExist4 = userMessageRepository.findByCreatedFor(user);

        if (userExist1 != null || userExist2 != null || userExist3 != null || userExist4 != null) {
            res.put("message", "user already exits");
            return res;
        }

        UserMessage userMessage = new UserMessage();
        userMessage.setId(UUID.randomUUID().toString());
        userMessage.setCreatedBy(user);
        userMessage.setCreatedFor(otheruser);
        userMessageRepository.save(userMessage);

        res.put("message", "user message created");
        return res;
    }

    @Override
    public List<UserMessage> getAllUserMessage(String userId) throws ResourcesNotFound {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );

        List<UserMessage> userMessageList1 = userMessageRepository.findAllByCreatedBy(user);
        List<UserMessage> userMessageList2 = userMessageRepository.findAllByCreatedFor(user);

        List<UserMessage> userMessageList = new ArrayList<>();

        userMessageList.addAll(userMessageList1);
        userMessageList.addAll(userMessageList2);

        return userMessageList;
    }

    @Override
    public Map<String, String> deleteUserMessage(String userMessageId) throws ResourcesNotFound {

        userMessageRepository.findById(userMessageId).orElseThrow(() -> new ResourcesNotFound("user not found"));
        userMessageRepository.deleteById(userMessageId);
        Map<String, String> res = new HashMap<>();
        res.put("message", "message list deleted");
        return res;
    }
}
