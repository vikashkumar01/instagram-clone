package com.example.socialmedia.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Message {

    @Id
    private String id;

    @NotBlank
    private String userId;

    @ManyToOne
    private UserMessage userMessage;

    @NotBlank(message = "message is required")
    private String chatMessage;

    @CreationTimestamp
    private Date createdAt;
}
