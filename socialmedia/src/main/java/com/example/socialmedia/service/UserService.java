package com.example.socialmedia.service;

import com.example.socialmedia.entities.User;
import com.example.socialmedia.exception.ResourcesAlreadyExist;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.exception.SomethingWentWrong;
import com.example.socialmedia.request.AuthenticationLoginRequest;
import com.example.socialmedia.response.AuthenticationLoginResponse;
import com.example.socialmedia.response.UserProfileResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;


public interface UserService {

    Map<String, String> registerUser(String firstName, String lastName, String emial, String password) throws SomethingWentWrong, ResourcesAlreadyExist;

    AuthenticationLoginResponse loginUser(AuthenticationLoginRequest req) throws SomethingWentWrong, ResourcesNotFound;

    Map<String, String> forgotPassword(String userEmail);

    Map<String, String> forgotPasswordChangePassword(String email, String password);

    Map<String, UserProfileResponse> getLoggedUser(String username) throws SomethingWentWrong, ResourcesNotFound;

    Map<String, UserProfileResponse> getUserProfile(String userId) throws ResourcesNotFound;

    Map<String, String> changePassword(String userId, String oldPassword, String newPassword) throws ResourcesNotFound, SomethingWentWrong;

    Map<String, String> upadeteUser(String userId, String firstName, String lastName, String email, Integer phoneNumber, String bio, String website) throws ResourcesNotFound, SomethingWentWrong, ResourcesAlreadyExist;

    List<User> searchAllUser(String username);

    Map<String, String> followAndUnfollowUser(String userId, String followUserId) throws ResourcesNotFound;

    Map<String, String> removeUserFromFollowerUser(String userId, String followUserId) throws ResourcesNotFound;

    Map<String, String> changeProfilePic(String userId, MultipartFile image) throws ResourcesNotFound, IOException, SomethingWentWrong;

    Map<String, String> savePostInFav(String userId, String postId) throws ResourcesNotFound;

    Map<String, String> removePostFromFav(String userId, String postId) throws ResourcesNotFound;

    Map<String, String> deleteUser(String userId) throws ResourcesNotFound, IOException;

}
