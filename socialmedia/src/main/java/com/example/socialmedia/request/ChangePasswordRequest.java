package com.example.socialmedia.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChangePasswordRequest {

    @NotBlank(message = "old password is required")
    @Length(min=6,max =15,message = "password must be between 6 to 15 character")
    private String oldPassword;

    @NotBlank(message = "new password is required")
    @Length(min=6,max =15,message = "password must be between 6 to 15 character")
    private String newPassword;
}
