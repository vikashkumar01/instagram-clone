package com.example.socialmedia.controller;

import com.example.socialmedia.exception.ResourcesAlreadyExist;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.exception.SomethingWentWrong;
import com.example.socialmedia.request.AuthenticationLoginRequest;
import com.example.socialmedia.request.RegisterUserRequest;
import com.example.socialmedia.request.UserForgotPasswordRequest;
import com.example.socialmedia.response.AuthenticationLoginResponse;
import com.example.socialmedia.response.UserProfileResponse;
import com.example.socialmedia.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1/auth/user/")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    ResponseEntity<Map<String,String>> registerUser(@Valid @RequestBody RegisterUserRequest user) throws SomethingWentWrong, ResourcesAlreadyExist {
       return new ResponseEntity<>(userService.registerUser(
               user.getFirstName(), user.getLastName(), user.getEmail(), user.getPassword()
       ), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    ResponseEntity<AuthenticationLoginResponse> loginUser(@Valid @RequestBody AuthenticationLoginRequest req) throws SomethingWentWrong, ResourcesNotFound {
        return new ResponseEntity<>(userService.loginUser(req),HttpStatus.OK);
    }

    @GetMapping("/forgot-password")
    ResponseEntity<Map<String,String>> forgotPassword(@RequestParam String email){
        return new ResponseEntity<>(userService.forgotPassword(email),HttpStatus.OK);
    }


    @PostMapping("/forgot-password/change-password")
    ResponseEntity<Map<String,String>> forgotPasswordChangePassword(@RequestBody UserForgotPasswordRequest req){
        return new ResponseEntity<>(userService.forgotPasswordChangePassword(req.getEmail(),req.getPassword()),HttpStatus.OK);
    }

    @GetMapping("/get-user")
    ResponseEntity<Map<String, UserProfileResponse>> getLoggedUser(Principal principal) throws SomethingWentWrong, ResourcesNotFound {
        return new ResponseEntity<>(userService.getLoggedUser(principal.getName()), HttpStatus.OK);
    }

}
