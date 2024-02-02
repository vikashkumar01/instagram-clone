package com.example.socialmedia.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
public class UserMessage {

    @Id
    private String id;

    @OneToOne
    private User createdBy;

    @OneToOne
    private User createdFor;

    @JsonIgnore
    @OneToMany
    List<Message> messageList = new ArrayList<>();

    @CreationTimestamp
    private Date createdAt;

}
