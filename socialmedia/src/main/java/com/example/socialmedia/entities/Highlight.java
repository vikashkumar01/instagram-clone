package com.example.socialmedia.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Highlight {

    @Id
    private String id;

    @NotBlank
    private String highlightName;

    @JsonIgnore
    @ManyToOne
    private User user;

    @ManyToMany(mappedBy = "highlight",fetch = FetchType.EAGER)
    private List<Story> storyHighlight = new ArrayList<>();

}
