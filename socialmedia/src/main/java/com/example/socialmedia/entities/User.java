package com.example.socialmedia.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User implements UserDetails {

    @Id
    private String id;

    @NotBlank(message = "firstName is required")
    @Size(min = 3,message = "firstName must be more than 3 character")
    private String firstName;

    @NotBlank(message = "lastName is required")
    @Size(min = 3,message = "firstName must be more than 3 character")
    private String lastName;

    @NotBlank(message = "email is required")
    @Email(message = "email must be valid")
    @Column(unique = true)
    private String email;

    @JsonIgnore
    @NotBlank(message = "password is required")
    private String password;

    private String profileImgUrl;

    private String profileImgId;

    private Integer phoneNumber;

    private String bio;

    private String website;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="user_role",
            joinColumns=@JoinColumn(name="user",referencedColumnName = "id"),
            inverseJoinColumns=@JoinColumn(name="role",referencedColumnName = "id")
    )
    private Set<Role> roles = new HashSet<>();


    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    Set<User> followers = new HashSet<>();

    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    Set<User> following = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    List<Post> userPost = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "postLiked",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    Set<Post> userLikePost = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "userId",cascade = CascadeType.ALL)
    List<Comment> userCommentOnPost = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    Set<ReportPost> userReportedPost = new HashSet<>();

    @JsonIgnore
    @ManyToMany
    @JoinTable(name="user_save_post_reels",
            joinColumns=@JoinColumn(name="user",referencedColumnName = "id"),
            inverseJoinColumns=@JoinColumn(name="post",referencedColumnName = "id")
    )
    Set<Post> userSavePostAndReel = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    List<Story> userStory = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    List<Highlight> userHighlights = new ArrayList<>();

    @CreationTimestamp
    private Date createdAt;

    @UpdateTimestamp
    private Date updatedAt;


    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<SimpleGrantedAuthority> authorities = roles.stream().map((role)->new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
        return authorities;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return this.email;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }
}
