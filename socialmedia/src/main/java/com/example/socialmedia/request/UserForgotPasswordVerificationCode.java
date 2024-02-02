package com.example.socialmedia.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserForgotPasswordVerificationCode {

    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "verification code is required")
    private Integer vcode;
}
