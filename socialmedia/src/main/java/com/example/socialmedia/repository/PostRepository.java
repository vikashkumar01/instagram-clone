package com.example.socialmedia.repository;

import com.example.socialmedia.entities.Post;
import com.example.socialmedia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface PostRepository  extends JpaRepository<Post, String> {
    List<Post> findAllByUser(User user);

}
