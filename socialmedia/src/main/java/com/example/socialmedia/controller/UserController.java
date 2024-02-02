package com.example.socialmedia.controller;

import com.example.socialmedia.entities.*;
import com.example.socialmedia.exception.ResourcesAlreadyExist;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.exception.SomethingWentWrong;
import com.example.socialmedia.repository.StoryRepository;
import com.example.socialmedia.request.ChangePasswordRequest;
import com.example.socialmedia.request.UpdatePostRequest;
import com.example.socialmedia.request.UpdateUserRequest;
import com.example.socialmedia.request.UserMessageRequest;
import com.example.socialmedia.response.UserProfileResponse;
import com.example.socialmedia.response.UserStoryResponse;
import com.example.socialmedia.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://127.0.0.1:5173")
@RestController
@RequestMapping("/api/v1/private/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserMessageService userMessageService;

    @Autowired
    private StoryService storyService;
    @Autowired
    private StoryRepository storyRepository;


    //user CRUD request

    @GetMapping("/{userId}/get-user")
    ResponseEntity<Map<String, UserProfileResponse>> getUserProfile(@PathVariable String userId) throws ResourcesNotFound {
        return new ResponseEntity<>(userService.getUserProfile(userId), HttpStatus.OK);
    }

    @PutMapping("/{userId}/change-user-password")
    ResponseEntity<Map<String, String>> changeUserPassword(@PathVariable String userId, @Valid @RequestBody ChangePasswordRequest req) throws SomethingWentWrong, ResourcesNotFound {
        return new ResponseEntity<>(userService.changePassword(userId, req.getOldPassword(), req.getNewPassword()), HttpStatus.OK);
    }

    @PutMapping("/{userId}/update-user")
    ResponseEntity<Map<String, String>> updateUser(@Valid @RequestBody UpdateUserRequest req, @PathVariable String userId) throws SomethingWentWrong, ResourcesNotFound, ResourcesAlreadyExist {
        return new ResponseEntity<>(userService.upadeteUser(
                userId,
                req.getFirstName(),
                req.getLastName(),
                req.getEmail(),
                req.getPhoneNumber(),
                req.getBio(),
                req.getWebsite()
        ), HttpStatus.OK);
    }

    @GetMapping("/search-user")
    ResponseEntity<List<User>> searchedUser(@RequestParam String username){
         return new ResponseEntity<>(userService.searchAllUser(username),HttpStatus.OK);
    }

    @GetMapping("/{userId}/otheruser/{otheruserId}/follow-or-unfollow")
    ResponseEntity<Map<String, String>> followOrUnfollowUser(@PathVariable String userId, @PathVariable String otheruserId) throws ResourcesNotFound {
        return new ResponseEntity<>(userService.followAndUnfollowUser(userId, otheruserId), HttpStatus.OK);
    }

    @GetMapping("/{userId}/otheruser/{otheruserId}/remove-user-follower")
    ResponseEntity<Map<String,String>> removeUserFromFollowers(@PathVariable String userId, @PathVariable String otheruserId) throws ResourcesNotFound {
        return new ResponseEntity<>(userService.removeUserFromFollowerUser(userId,otheruserId),HttpStatus.OK);
    }

    @PutMapping("/{userId}/change-profile-pic")
    ResponseEntity<Map<String, String>> changeProfilePic(@PathVariable String userId, @RequestParam MultipartFile image) throws SomethingWentWrong, ResourcesNotFound, IOException {
        return new ResponseEntity<>(userService.changeProfilePic(userId, image), HttpStatus.OK);
    }

    @GetMapping("/{userId}/post/{postId}/save-in-fav")
    ResponseEntity<Map<String,String>> savePostInFav(@PathVariable String userId,@PathVariable String postId) throws ResourcesNotFound {
        return new ResponseEntity<>(userService.savePostInFav(userId,postId),HttpStatus.OK);
    }

    @GetMapping("/{userId}/post/{postId}/remove-from-fav")
    ResponseEntity<Map<String,String>> removePostFromFav(@PathVariable String userId,@PathVariable String postId) throws ResourcesNotFound {
        return new ResponseEntity<>(userService.removePostFromFav(userId,postId),HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/delete-user")
    ResponseEntity<Map<String, String>> deleteUser(@PathVariable String userId) throws ResourcesNotFound, IOException {
        return new ResponseEntity<>(userService.deleteUser(userId), HttpStatus.OK);
    }

    // user status

    @PostMapping("/{userId}/share-story")
    ResponseEntity<Map<String,String>> shareStory(@PathVariable String userId,MultipartFile file) throws SomethingWentWrong, ResourcesNotFound, IOException {
       return new ResponseEntity<>(storyService.shareUserStory(userId,file),HttpStatus.OK);
    }

    @GetMapping("/{userId}/get-all-user-having-story")
    ResponseEntity<List<User>> getAllUserOfHavingStory(@PathVariable String userId) throws ResourcesNotFound {
        return new ResponseEntity<>(storyService.getAllUserHavingStory(userId),HttpStatus.OK);
    }

    @GetMapping("/{userId}/get-all-user-story")
    ResponseEntity<UserStoryResponse> getAllUserStory(@PathVariable String userId) throws ResourcesNotFound {
        return new ResponseEntity<>(storyService.getAllStoryOfUser(userId),HttpStatus.OK);
    }

    @GetMapping("/{userId}/get-user-story")
    ResponseEntity<List<Story>> getUserStory(@PathVariable String userId) throws ResourcesNotFound {
        return new ResponseEntity<>(storyService.getStoryOfUser(userId),HttpStatus.OK);
    }

    @DeleteMapping("/{storyId}/delete-story")
    ResponseEntity<Map<String,String>> deleteStory(@PathVariable String storyId) throws ResourcesNotFound, IOException {
        return new ResponseEntity<>(storyService.deleteUserStory(storyId),HttpStatus.OK);
    }

    @PostMapping("/{userId}/create-highlight")
    ResponseEntity<Map<String,String>> addHighlight(@PathVariable String userId,@RequestParam String highlightName) throws ResourcesNotFound {
        return new ResponseEntity<>(storyService.createHighlights(userId,highlightName),HttpStatus.OK);
    }

    @GetMapping("/{userId}/story/{storyId}/highlight/{highlightId}/add-story-in-highlight")
    ResponseEntity<Map<String,String>> addStoryInHighlights(@PathVariable String userId,@PathVariable String storyId,@PathVariable String highlightId) throws ResourcesNotFound {
        return new ResponseEntity<>(storyService.addStoryInHighlight(userId,storyId,highlightId),HttpStatus.OK);
    }

    @GetMapping("/story/{storyId}/highlight/{highlightId}/remove-story-from-highlight")
    ResponseEntity<Map<String,String>> removeStoryFromHighlight(@PathVariable String storyId, @PathVariable String highlightId) throws ResourcesNotFound {
        return new ResponseEntity<>(storyService.removeStory(storyId,highlightId),HttpStatus.OK);
    }

    @DeleteMapping("/highlight/{highlightId}/delete-highlight")
    ResponseEntity<Map<String,String>> deleteHighlight(@PathVariable String highlightId) throws ResourcesNotFound {
        return new ResponseEntity<>(storyService.deleteHighlight(highlightId),HttpStatus.OK);
    }

    //user chat

    @GetMapping("/{userId}/other-user/{otherUserId}/create-user-chat")
    ResponseEntity<Map<String,String>> createUserChat(@PathVariable String userId,@PathVariable String otherUserId) throws ResourcesNotFound {
        return new ResponseEntity<>(userMessageService.createMessageUser(userId,otherUserId),HttpStatus.OK);
    }

    @GetMapping("/{createdBy}/get-user-list-of-message")
    ResponseEntity<List<UserMessage>> getUserListOfMessage(@PathVariable String createdBy) throws ResourcesNotFound {
        return new ResponseEntity<>(userMessageService.getAllUserMessage(createdBy),HttpStatus.OK);
    }

    @DeleteMapping("/{userMessageId}/delete-User-message")
    ResponseEntity<Map<String,String>> deleteUserMessage(@PathVariable String userMessageId) throws ResourcesNotFound {
        return new ResponseEntity<>(userMessageService.deleteUserMessage(userMessageId),HttpStatus.OK);
    }

    @PostMapping("/{senderId}/message/{receiverId}/send-message/")
    ResponseEntity<Map<String, String>> sendMessage(@PathVariable String senderId, @PathVariable String receiverId, @Valid @RequestBody UserMessageRequest req) throws ResourcesNotFound {
        return new ResponseEntity<>(messageService.sendMessage(senderId, receiverId, req.getCmessage()), HttpStatus.OK);
    }

    @GetMapping("/{senderId}/message/{receiverId}/get-message")
    ResponseEntity<Map<String, List<Message>>> getMessageOfUser(@PathVariable String senderId, @PathVariable String receiverId) throws ResourcesNotFound {
        return new ResponseEntity<>(messageService.getAllMessageOfUser(senderId, receiverId), HttpStatus.OK);
    }

    @DeleteMapping("/message/{messageId}")
    ResponseEntity<Map<String, String>> deleteMessage(@PathVariable String messageId) throws ResourcesNotFound {
        return new ResponseEntity<>(messageService.deleteMessage(messageId), HttpStatus.OK);
    }

    //  Notification

    @GetMapping("/{userId}/get-notification")
    ResponseEntity<Map<String, List<Notification>>> getAllNotification(@PathVariable String userId) throws ResourcesNotFound {
        return new ResponseEntity<>(notificationService.getAllUserNotification(userId), HttpStatus.OK);
    }

    @DeleteMapping("/notification/{notificationId}/delete-message")
    ResponseEntity<Map<String, String>> deleteNotification(@PathVariable String notificationId) throws ResourcesNotFound {
        return new ResponseEntity<>(notificationService.deleteNotification(notificationId),HttpStatus.OK);
    }

    // post CRUD request

    @PostMapping("/{userId}/create-post")
    ResponseEntity<Map<String, String>> createUserPost(@RequestParam String postTitle,
                                                       @RequestParam String postDesc,
                                                       @RequestParam MultipartFile file,
                                                       @PathVariable String userId) throws ResourcesNotFound, IOException, SomethingWentWrong {
        return new ResponseEntity<>(postService.createPost(
                postTitle,
                postDesc,
                file,
                userId
        ), HttpStatus.CREATED);
    }

    @GetMapping("/post/all-post")
    ResponseEntity<List<Post>> getALlPost() {
        return new ResponseEntity<>(postService.getAllPost(), HttpStatus.OK);
    }


    @GetMapping("/post/{postId}/get-post")
    ResponseEntity<Map<String, Post>> getPostById(@PathVariable String postId) throws ResourcesNotFound {
        return new ResponseEntity<>(postService.getPostById(postId), HttpStatus.OK);
    }

    @GetMapping("/post/get-reel")
    ResponseEntity<List<Post>> getAllReels(){
        return new ResponseEntity<>(postService.getAllReels(),HttpStatus.OK);
    }

    @PutMapping("/post/{postId}/update-post")
    ResponseEntity<Map<String, String>> updatePostById(@Valid @RequestBody UpdatePostRequest req, @PathVariable String postId) throws ResourcesNotFound {
        return new ResponseEntity<>(postService.updatePost(req.getPostTitle(), req.getPostDesc(), postId), HttpStatus.OK);
    }

    @PutMapping("/post/{postId}/change-post-image-or-video")
    ResponseEntity<Map<String, String>> updatePostImage(@PathVariable String postId, @RequestParam MultipartFile imageOrVideo) throws ResourcesNotFound, IOException {
        return new ResponseEntity<>(postService.updatePostImageOrVideo(postId, imageOrVideo), HttpStatus.OK);
    }

    @GetMapping("/{userId}/post/{postId}/like-or-dislike-post")
    ResponseEntity<Map<String, String>> likeOrDislikePost(@PathVariable String userId, @PathVariable String postId) throws ResourcesNotFound {
        return new ResponseEntity<>(postService.likeOrUnlikePost(postId, userId), HttpStatus.OK);
    }

    @DeleteMapping("/post/{postId}/delete-post")
    ResponseEntity<Map<String, String>> deletePostById(@PathVariable String postId) throws ResourcesNotFound, IOException {
        return new ResponseEntity<>(postService.deletePost(postId), HttpStatus.OK);
    }

    @GetMapping("/{userId}/post/{postId}/report-post")
    ResponseEntity<Map<String, String>> reportPost(@PathVariable String userId, @PathVariable String postId) throws ResourcesNotFound, ResourcesAlreadyExist {
        return new ResponseEntity<>(postService.reportPost(postId, userId), HttpStatus.OK);
    }

    @PostMapping("/{userId}/post/{postId}/comment-on-post")
    ResponseEntity<Map<String, String>> commentOnPost(@PathVariable String userId,
                                                      @PathVariable String postId,
                                                      @RequestParam String message) throws ResourcesNotFound {
        return new ResponseEntity<>(commentService.commentOnPost(message, postId, userId), HttpStatus.OK);
    }


    @DeleteMapping("/comment/{commentId}/delete-comment")
    ResponseEntity<Map<String, String>> deleteComment(@PathVariable String commentId) throws ResourcesNotFound {
        return new ResponseEntity<>(commentService.deleteComment(commentId), HttpStatus.OK);
    }

    @GetMapping("/{userId}/comment/{commentId}/like-or-dislike-comment")
    ResponseEntity<Map<String, String>> likeOrDislikeComment(@PathVariable String userId, @PathVariable String commentId) throws ResourcesNotFound {
        return new ResponseEntity<>(commentService.likeOrDislikeComment(userId, commentId), HttpStatus.OK);
    }

}
