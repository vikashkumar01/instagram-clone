package com.example.socialmedia.response;

import com.example.socialmedia.entities.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String profileImgUrl;
    private Integer phoneNumber;
    private String bio;
    private String website;
    private Set<Role> role;
    private Set<User> userFollowers;
    private Set<User> userFollowings;
    private List<Post> userPost;
    private List<Post> userReels;
    private List<Story> userStory;
    private Set<Post> userSavedReelsAndPost;
    private List<Highlight> userHighlight;
    private Date createdAt;
    private Date updatedAt;
}
