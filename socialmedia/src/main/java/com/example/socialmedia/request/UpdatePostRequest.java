package com.example.socialmedia.request;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdatePostRequest {

    @NotBlank(message = "postTitle is required")
    private String postTitle;
    @NotBlank(message = "postTitle is required")
    @Length(min=5,max=500,message = "postDesc must be between 5 to 500 character")
    private String postDesc;
}
