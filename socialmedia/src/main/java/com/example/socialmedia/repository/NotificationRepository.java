package com.example.socialmedia.repository;
import com.example.socialmedia.entities.Notification;
import com.example.socialmedia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,String> {

       List<Notification> findAllByFollowingOrderByCreatedAtDesc(String userId);
}
