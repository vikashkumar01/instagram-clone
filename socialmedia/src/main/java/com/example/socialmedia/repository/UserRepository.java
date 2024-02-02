package com.example.socialmedia.repository;

import com.example.socialmedia.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    Optional<User> findByEmail(String email);

    long countByCreatedAtBetween(Date startDate, Date endDate);
    @Query("SELECT u FROM User u WHERE LOWER(u.firstName) LIKE %:username% OR LOWER(u.lastName) LIKE %:username%")
    List<User> findAllBySearchKey(String username);
}
