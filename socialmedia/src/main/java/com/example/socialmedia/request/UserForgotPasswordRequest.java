package com.example.socialmedia.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserForgotPasswordRequest {

    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "password is required")
    @Length(min=6,max =15,message = "password must be between 6 to 15 character")
    private String password;
}
