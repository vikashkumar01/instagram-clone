package com.example.socialmedia.repository;

import com.example.socialmedia.entities.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HighlightRepository extends JpaRepository<Highlight,String> {
}
