package com.example.socialmedia.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Story {

    @Id
    private String id;

    @JsonIgnore
    @ManyToOne
    private User user;

    private String imgUrl;

    private String imgId;

    private String videoUrl;

    private String videoId;

    @JsonIgnore
    @ManyToMany
    private List<Highlight> highlight = new ArrayList<>();

    @CreationTimestamp
    private Date createdAt;
}
