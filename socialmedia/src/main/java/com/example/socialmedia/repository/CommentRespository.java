package com.example.socialmedia.repository;

import com.example.socialmedia.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRespository extends JpaRepository<Comment,String> {
}
