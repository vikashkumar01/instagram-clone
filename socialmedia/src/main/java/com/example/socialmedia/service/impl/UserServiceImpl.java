package com.example.socialmedia.service.impl;

import com.example.socialmedia.config.JwtService;
import com.example.socialmedia.entities.Notification;
import com.example.socialmedia.entities.Post;
import com.example.socialmedia.entities.User;
import com.example.socialmedia.exception.ResourcesAlreadyExist;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.exception.SomethingWentWrong;
import com.example.socialmedia.repository.NotificationRepository;
import com.example.socialmedia.repository.PostRepository;
import com.example.socialmedia.repository.RoleRepository;
import com.example.socialmedia.repository.UserRepository;
import com.example.socialmedia.request.AuthenticationLoginRequest;
import com.example.socialmedia.response.AuthenticationLoginResponse;
import com.example.socialmedia.response.UserProfileResponse;
import com.example.socialmedia.service.ImageOrVideoService;
import com.example.socialmedia.service.UserService;
import com.example.socialmedia.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageOrVideoService imageOrVideoService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtHelper;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private PostRepository postRepository;

    @Override
    public Map<String, String> registerUser(String firstName, String lastName, String email, String password) throws SomethingWentWrong, ResourcesAlreadyExist {
        Map<String, String> res = null;
        try {
            Optional<User> existUser = userRepository.findByEmail(email);
            if (existUser.isPresent()) {
                throw new ResourcesAlreadyExist("User Already Exist, Please register with another email");
            } else {
                User u = new User();
                u.setId(UUID.randomUUID().toString());
                u.setFirstName(firstName);
                u.setLastName(lastName);
                u.setEmail(email);
                u.getRoles().add(roleRepository.findById(1L).get());
                u.setPassword(passwordEncoder.encode(password));
                userRepository.save(u);
                res = new HashMap<>();
                res.put("message", " Registered Successfully");
            }
        } catch (ResourcesAlreadyExist e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SomethingWentWrong("Something Went Wrong");
        }
        return res;
    }

    @Override
    public AuthenticationLoginResponse loginUser(AuthenticationLoginRequest req) throws SomethingWentWrong, ResourcesNotFound {
        AuthenticationLoginResponse res = null;
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    req.getEmail(),
                    req.getPassword()
            ));
            User user = userRepository.findByEmail(req.getEmail()).orElseThrow(() ->
                    new ResourcesNotFound("Invalid Credential")
            );
            String token = jwtHelper.generateToken((UserDetails) user);
            res = new AuthenticationLoginResponse("User Logged In Successfully", token);
        } catch (BadCredentialsException e) {
            throw new ResourcesNotFound("Invalid Credential");
        } catch (ResourcesNotFound e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SomethingWentWrong("Something Went Wrong");
        }
        return res;
    }

    @Override
    public Map<String, String> forgotPassword(String userEmail) {
        Map<String, String> res = null;
        try {
            Optional<User> user = userRepository.findByEmail(userEmail);
            if (user.isEmpty()) {
                throw new ResourcesNotFound("User Not Found");
            }
            res = new HashMap<>();
            res.put("message", "please enter 6 digit code");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return res;
    }

    @Override
    public Map<String, String> forgotPasswordChangePassword(String email, String password) {
        return null;
    }

    @Override
    public Map<String, UserProfileResponse> getLoggedUser(String username) throws SomethingWentWrong, ResourcesNotFound {

        Optional<User> user = userRepository.findByEmail(username);
        if (user.isEmpty()) {
            throw new ResourcesNotFound("User Not Found");
        }

        User u = user.get();
        UserProfileResponse userProfileResponse = new UserProfileResponse();
        userProfileResponse.setId(u.getId());
        userProfileResponse.setFirstName(u.getFirstName());
        userProfileResponse.setLastName(u.getLastName());
        userProfileResponse.setEmail(u.getEmail());
        userProfileResponse.setProfileImgUrl(u.getProfileImgUrl());
        userProfileResponse.setPhoneNumber(u.getPhoneNumber());
        userProfileResponse.setBio(u.getBio());
        userProfileResponse.setWebsite(u.getWebsite());
        userProfileResponse.setRole(u.getRoles());
        userProfileResponse.setUserFollowers(u.getFollowers());
        userProfileResponse.setUserFollowings(u.getFollowing());
        userProfileResponse.setUserStory(u.getUserStory());
        List<Post> userPost = u.getUserPost().stream().filter(post -> post.getPostImgUrl() != null).toList();
        userProfileResponse.setUserPost(userPost);
        List<Post> userReel = u.getUserPost().stream().filter(post-> post.getPostReelUrl()!=null).toList();
        userProfileResponse.setUserReels(userReel);
        userProfileResponse.setUserSavedReelsAndPost(u.getUserSavePostAndReel());
        userProfileResponse.setUserHighlight(u.getUserHighlights());
        userProfileResponse.setCreatedAt(u.getCreatedAt());
        userProfileResponse.setUpdatedAt(u.getUpdatedAt());

        Map<String, UserProfileResponse> res = new HashMap<>();
        res.put("user", userProfileResponse);

        return res;
    }

    @Override
    public Map<String, UserProfileResponse> getUserProfile(String userId) throws ResourcesNotFound {

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourcesNotFound("user not found");
        }

        User u = user.get();
        UserProfileResponse userProfileResponse = new UserProfileResponse();
        userProfileResponse.setId(u.getId());
        userProfileResponse.setFirstName(u.getFirstName());
        userProfileResponse.setLastName(u.getLastName());
        userProfileResponse.setEmail(u.getEmail());
        userProfileResponse.setBio(u.getBio());
        userProfileResponse.setPhoneNumber(u.getPhoneNumber());
        userProfileResponse.setWebsite(u.getWebsite());
        userProfileResponse.setProfileImgUrl(u.getProfileImgUrl());
        userProfileResponse.setRole(u.getRoles());
        userProfileResponse.setUserFollowers(u.getFollowers());
        userProfileResponse.setUserFollowings(u.getFollowing());
        userProfileResponse.setUserStory(u.getUserStory());
        List<Post> userPost = u.getUserPost().stream().filter(post -> post.getPostImgUrl() != null).toList();
        userProfileResponse.setUserPost(userPost);
        List<Post> userReel = u.getUserPost().stream().filter(post-> post.getPostReelUrl()!=null).toList();
        userProfileResponse.setUserReels(userReel);
        userProfileResponse.setUserSavedReelsAndPost(u.getUserSavePostAndReel());
        userProfileResponse.setUserHighlight(u.getUserHighlights());
        userProfileResponse.setCreatedAt(u.getCreatedAt());
        userProfileResponse.setUpdatedAt(u.getUpdatedAt());

        Map<String, UserProfileResponse> res = new HashMap<>();
        res.put("user", userProfileResponse);
        return res;
    }

    @Override
    public Map<String, String> changePassword(String userId,String oldPassword, String newPassword) throws ResourcesNotFound, SomethingWentWrong {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourcesNotFound("User not found")
        );
        boolean matchPassword = passwordEncoder.matches(oldPassword,user.getPassword());
        if(!matchPassword){
            throw new SomethingWentWrong("oldPassword does not match, please provide correct password");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        Map<String, String> res = new HashMap<>();
        res.put("message", "password changed successfully ");
        return res;
    }

    @Override
    public Map<String, String> followAndUnfollowUser(String userId, String followUserId) throws ResourcesNotFound {

        Map<String, String> res = new HashMap<>();

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourcesNotFound("user not found");
        }

        Optional<User> followUser = userRepository.findById(followUserId);
        if (followUser.isEmpty()) {
            throw new ResourcesNotFound("user not found");
        }

        if (user.get().getFollowing().contains(followUser.get())) {
            user.get().getFollowing().remove(followUser.get());
            followUser.get().getFollowers().remove(user.get());
            userRepository.save(user.get());
            userRepository.save(followUser.get());
            res.put("message", "you unfollow user");

        } else {
            user.get().getFollowing().add(followUser.get());
            followUser.get().getFollowers().add(user.get());
            userRepository.save(user.get());
            userRepository.save(followUser.get());
            Notification notification = new Notification();
            notification.setId(UUID.randomUUID().toString());
            notification.setFirstName(user.get().getFirstName());
            notification.setLastName(user.get().getLastName());
            notification.setFollower(user.get().getId());
            notification.setFollowing(followUser.get().getId());
            notification.setMessage("stated following you");
            notificationRepository.save(notification);
            res.put("message", "you follow user");
        }

        return res;
    }

    @Override
    public Map<String, String> removeUserFromFollowerUser(String userId, String followUserId) throws ResourcesNotFound {

        Map<String, String> res = new HashMap<>();

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourcesNotFound("user not found");
        }

        Optional<User> followUser = userRepository.findById(followUserId);
        if (followUser.isEmpty()) {
            throw new ResourcesNotFound("user not found");
        }

        if (followUser.get().getFollowing().contains(user.get())) {
            user.get().getFollowers().remove(followUser.get());
            followUser.get().getFollowing().remove(user.get());
            userRepository.save(user.get());
            userRepository.save(followUser.get());
            res.put("message", "user removed");
        }

        return res;
    }

    @Override
    public Map<String, String> upadeteUser(String userId, String firstName, String lastName, String email,Integer phoneNumber,String bio, String website) throws ResourcesNotFound, SomethingWentWrong, ResourcesAlreadyExist {

        Map<String, String> res = new HashMap<>();

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourcesNotFound("user not found");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            if (!(userRepository.findByEmail(email).get().getEmail().equals(user.get().getEmail()))) {
                throw new ResourcesAlreadyExist("user email already exist,Try with another email");
            }
        }
        User u = user.get();
        u.setFirstName(firstName);
        u.setLastName(lastName);
        u.setEmail(email);
        u.setPhoneNumber(phoneNumber);
        u.setBio(bio);
        u.setWebsite(website);
        userRepository.save(u);
        res.put("message", "profile updated");
        return res;
    }

    @Override
    public List<User> searchAllUser(String username) {
        return userRepository.findAllBySearchKey(username.toLowerCase());
    }

    @Override
    public Map<String, String> changeProfilePic(String userId, MultipartFile image) throws ResourcesNotFound, IOException, SomethingWentWrong {

        Map<String, String> res = new HashMap<>();

        if (image == null) {
            throw new SomethingWentWrong("please provide profile image");
        }

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourcesNotFound("user not found");
        }

        User u = user.get();

        if (u.getProfileImgId() != null) {
            imageOrVideoService.deleteImageOrVideo(u.getProfileImgId());
        }
        Map<String, String> updatedImg = imageOrVideoService.uploadImageOrVideo(image, Constants.folderName1);

        u.setProfileImgId(updatedImg.get("imageOrVideoPublicId"));
        u.setProfileImgUrl(updatedImg.get("imageOrVideoUrl"));
        userRepository.save(u);
        res.put("message", "image uploaded");
        return res;
    }

    @Override
    public Map<String, String> savePostInFav(String userId, String postId) throws ResourcesNotFound {

        Map<String,String> res = new HashMap<>();
        User user = userRepository.findById(userId).orElseThrow(()->new ResourcesNotFound("user not found"));
        Post post  = postRepository.findById(postId).orElseThrow(()->new ResourcesNotFound("post not found"));
        if(user.getUserSavePostAndReel().contains(post)){
            throw new ResourcesNotFound("post already exits in fav");
        }else{
            user.getUserSavePostAndReel().add(post);
            userRepository.save(user);
            res.put("message","post saved in fav");
        }
        return res;
    }

    @Override
    public Map<String, String> removePostFromFav(String userId, String postId) throws ResourcesNotFound {

        Map<String,String> res = new HashMap<>();
        User user = userRepository.findById(userId).orElseThrow(()->new ResourcesNotFound("user not found"));
        Post post  = postRepository.findById(postId).orElseThrow(()->new ResourcesNotFound("post not found"));
        if(user.getUserSavePostAndReel().contains(post)){
            user.getUserSavePostAndReel().remove(post);
            res.put("message","post removed from fav");
            userRepository.save(user);
        }else{
             throw new ResourcesNotFound("post not in fav");
        }
        return res;
    }


    @Override
    public Map<String, String> deleteUser(String userId) throws ResourcesNotFound, IOException {
        Map<String, String> res = new HashMap<>();
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourcesNotFound("user not found");
        }
        User u = user.get();
        if (u.getProfileImgId() != null) {
            imageOrVideoService.deleteImageOrVideo(u.getProfileImgId());
        }
        Set<User> userFollowingList = u.getFollowing();
        Set<User> userFollowersList = u.getFollowers();
        for (User us : userFollowingList) {
            User uf = userRepository.findById(us.getId()).orElseThrow(
                    () -> new ResourcesNotFound("user not find")
            );
            uf.getFollowers().remove(u);
            userRepository.save(uf);
        }
        for (User us : userFollowersList) {
            User uf = userRepository.findById(us.getId()).orElseThrow(
                    () -> new ResourcesNotFound("user not find")
            );
            uf.getFollowing().remove(u);
            userRepository.save(uf);
        }

        List<Post> userPost = user.get().getUserPost();
        for(Post post: userPost){
            if(post.getPostReelId()!=null){
                imageOrVideoService.deleteImageOrVideo(post.getPostReelId());
            }
            if(post.getPostImgId()!=null) {
                imageOrVideoService.deleteImageOrVideo(post.getPostImgId());
            }
        }
        userRepository.deleteById(userId);
        res.put("message", "user deleted");
        return res;
    }
}
