package com.example.socialmedia.repository;

import com.example.socialmedia.entities.Message;
import com.example.socialmedia.entities.User;
import com.example.socialmedia.entities.UserMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,String> {

    List<Message> findAllByUserMessageOrderByCreatedAtAsc(UserMessage userMessage);
}
