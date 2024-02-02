package com.example.socialmedia.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.Length;

import java.util.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Post {

    @Id
    private String id;

    @NotBlank(message = "postTitle is required")
    @Length(min=5,max=50,message = "postTitle must be between 5 to 50 character")
    private String postTitle;

    @NotBlank(message = "postDesc is required")
    @Length(min=5,max=500,message = "postDesc must be between 5 to 500 character")
    private String postDesc;

    private String postImgUrl;

    private String postImgId;

    private String postReelUrl;

    private String postReelId;

    @ManyToMany
    Set<User> postLiked = new HashSet<>();

    @OneToMany(mappedBy = "postId",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    List<Comment> userComment = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;
}
