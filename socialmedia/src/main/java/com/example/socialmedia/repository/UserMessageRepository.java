package com.example.socialmedia.repository;

import com.example.socialmedia.entities.User;
import com.example.socialmedia.entities.UserMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserMessageRepository extends JpaRepository<UserMessage,String> {

     UserMessage findByCreatedFor(User user);

     UserMessage findByCreatedBy(User user);

     List<UserMessage> findAllByCreatedBy(User user);

     List<UserMessage> findAllByCreatedFor(User user);

     UserMessage findByCreatedByAndCreatedFor(User sender,User receiver);
}
