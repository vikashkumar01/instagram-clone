package com.example.socialmedia.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationLoginRequest {

    @NotBlank(message = "email is required")
    @Email(message="email must be valid")
    private String email;

    @NotBlank(message= "password is reuired")
    private String password;
}
