package com.example.socialmedia.response;

import com.example.socialmedia.entities.Story;
import com.example.socialmedia.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserStoryResponse {

    private String id;

    private String firstName;

    private String lastName;

    private String imgUrl;

    private List<Story> userStoryList;

}
