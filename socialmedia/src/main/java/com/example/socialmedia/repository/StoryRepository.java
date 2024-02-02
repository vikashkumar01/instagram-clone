package com.example.socialmedia.repository;

import com.example.socialmedia.entities.Story;
import com.example.socialmedia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story,String> {

    List<Story> findAllByUserAndCreatedAtAfterOrderByCreatedAtDesc(User user,Date date);
}
