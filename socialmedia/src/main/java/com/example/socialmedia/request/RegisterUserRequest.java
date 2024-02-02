package com.example.socialmedia.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserRequest {

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

    @NotBlank(message = "password is required")
    @Size(min = 6, max = 15, message = "password must be between 6 to 15 characters")
    private String password;
}
