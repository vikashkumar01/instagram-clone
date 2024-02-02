package com.example.socialmedia.repository;

import com.example.socialmedia.entities.Post;
import com.example.socialmedia.entities.ReportPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportPostRepository extends JpaRepository<ReportPost,String> {

    ReportPost findByPostId(String postId);
}
