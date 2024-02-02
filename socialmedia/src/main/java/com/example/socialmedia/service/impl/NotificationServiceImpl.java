package com.example.socialmedia.service.impl;

import com.example.socialmedia.entities.Notification;
import com.example.socialmedia.entities.User;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.repository.NotificationRepository;
import com.example.socialmedia.repository.UserRepository;
import com.example.socialmedia.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NotificationServiceImpl implements NotificationService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Map<String, List<Notification>> getAllUserNotification(String userId) throws ResourcesNotFound {
        List<Notification> notificationList  = notificationRepository.findAllByFollowingOrderByCreatedAtDesc(userId);
        Map<String, List<Notification>> res = new HashMap<>();
        res.put("notificationList",notificationList);
        return res;
    }

    @Override
    public Map<String, String> deleteNotification(String notificationId) throws ResourcesNotFound {
        notificationRepository.findById(notificationId).orElseThrow(()->new ResourcesNotFound("notification not found"));
        notificationRepository.deleteById(notificationId);
        Map<String,String> res = new HashMap<>();
        res.put("message","notification deleted");
        return res;
    }
}
