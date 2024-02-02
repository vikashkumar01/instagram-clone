package com.example.socialmedia.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ReportPost {

    @Id
    private String reportedPostId;

    @NotBlank(message = "postId is required")
    private String postId;

    @NotNull(message = "reportCount is required")
    private Integer reportCount;

    @ManyToMany
    private Set<User> user = new HashSet<>();

    @CreationTimestamp
    private Date createdAt;
}
