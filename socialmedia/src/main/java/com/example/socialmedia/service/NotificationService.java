package com.example.socialmedia.service;

import com.example.socialmedia.entities.Notification;
import com.example.socialmedia.exception.ResourcesNotFound;

import java.util.List;
import java.util.Map;

public interface NotificationService {

    Map<String, List<Notification>> getAllUserNotification(String userId) throws ResourcesNotFound;
    Map<String,String> deleteNotification(String notificationId) throws ResourcesNotFound;


}
