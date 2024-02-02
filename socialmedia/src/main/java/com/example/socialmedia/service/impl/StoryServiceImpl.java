package com.example.socialmedia.service.impl;

import com.example.socialmedia.entities.Highlight;
import com.example.socialmedia.entities.Story;
import com.example.socialmedia.entities.User;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.exception.SomethingWentWrong;
import com.example.socialmedia.repository.HighlightRepository;
import com.example.socialmedia.repository.StoryRepository;
import com.example.socialmedia.repository.UserRepository;
import com.example.socialmedia.response.UserStoryResponse;
import com.example.socialmedia.service.ImageOrVideoService;
import com.example.socialmedia.service.StoryService;
import com.example.socialmedia.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class StoryServiceImpl implements StoryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private ImageOrVideoService imageOrVideoService;
    @Autowired
    private HighlightRepository highlightRepository;

    @Override
    public Map<String, String> shareUserStory(String userId, MultipartFile file) throws ResourcesNotFound, SomethingWentWrong, IOException {

        if (file == null) {
            throw new ResourcesNotFound("file not found");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourcesNotFound("user not found"));

        Map<String, String> imgOrVideo = imageOrVideoService.uploadImageOrVideo(file, Constants.getFolderName2);

        String contentType = file.getContentType();

        Story status = new Story();
        status.setId(UUID.randomUUID().toString());
        status.setUser(user);

        if (contentType != null) {
            if (contentType.startsWith("image")) {
                status.setImgId(imgOrVideo.get("imageOrVideoPublicId"));
                status.setImgUrl(imgOrVideo.get("imageOrVideoUrl"));
            } else if (contentType.startsWith("video")) {
                status.setVideoId(imgOrVideo.get("imageOrVideoPublicId"));
                status.setVideoUrl(imgOrVideo.get("imageOrVideoUrl"));
            } else {
                throw new SomethingWentWrong("unsupported media type");
            }
        }

        Story userStatus = storyRepository.save(status);

        user.getUserStory().add(userStatus);
        userRepository.save(user);
        Map<String, String> res = new HashMap<>();
        res.put("message", "story uploaded");
        return res;
    }

    @Override
    public List<User> getAllUserHavingStory(String userId) throws ResourcesNotFound {

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourcesNotFound("user not found"));

        Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000));

        return user
                .getFollowing()
                .stream()
                .filter(u -> !storyRepository.findAllByUserAndCreatedAtAfterOrderByCreatedAtDesc(u, twentyFourHoursAgo).isEmpty())
                .toList();
    }


    @Override
    public UserStoryResponse getAllStoryOfUser(String userId) throws ResourcesNotFound {

        User user = userRepository.findById(userId).
                orElseThrow(() -> new ResourcesNotFound("user not found"));

        Date twentyFourHoursAgo = new Date(System.currentTimeMillis() - (24 * 60 * 60 * 1000));
        List<Story> userStoryList = storyRepository.findAllByUserAndCreatedAtAfterOrderByCreatedAtDesc(user, twentyFourHoursAgo);

        UserStoryResponse res = new UserStoryResponse();
        res.setId(user.getId());
        res.setFirstName(user.getFirstName());
        res.setLastName(user.getLastName());
        res.setImgUrl(user.getProfileImgUrl());
        res.setUserStoryList(userStoryList);
        return res;

    }

    @Override
    public List<Story> getStoryOfUser(String userId) throws ResourcesNotFound {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );

        return user.getUserStory();
    }


    @Override
    public Map<String, String> deleteUserStory(String statusId) throws ResourcesNotFound, IOException {

        Story status = storyRepository.findById(statusId)
                .orElseThrow(() -> new ResourcesNotFound("status not found"));

        status.getUser().getUserStory().remove(status);

        if (status.getImgId() != null) {
            imageOrVideoService.deleteImageOrVideo(status.getImgId());
        }

        if (status.getVideoId() != null) {
            imageOrVideoService.deleteImageOrVideo(status.getImgId());
        }

        storyRepository.deleteById(statusId);

        Map<String, String> res = new HashMap<>();
        res.put("message", "story deleted");

        return res;
    }

    @Override
    public Map<String, String> createHighlights(String userId, String highlightName) throws ResourcesNotFound {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );

        Highlight highlight = new Highlight();
        highlight.setId(UUID.randomUUID().toString());
        highlight.setHighlightName(highlightName);
        highlight.setUser(user);
        Highlight h = highlightRepository.save(highlight);

        user.getUserHighlights().add(h);
        userRepository.save(user);

        Map<String, String> res = new HashMap<>();
        res.put("message", "Highlight Added");
        res.put("highlightId", h.getId());

        return res;
    }

    @Override
    public Map<String, String> addStoryInHighlight(String userId, String storyId, String highlightId) throws ResourcesNotFound {

        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourcesNotFound("user not found")
        );

        Story story = storyRepository.findById(storyId).orElseThrow(
                () -> new ResourcesNotFound("story not found")
        );

        Highlight highlight = highlightRepository.findById(highlightId).orElseThrow(
                () -> new ResourcesNotFound("highlight not found")
        );

        highlight.getStoryHighlight().add(story);
        Highlight saveHighlight = highlightRepository.save(highlight);

        story.getHighlight().add(saveHighlight);
        storyRepository.save(story);

        Map<String, String> res = new HashMap<>();
        res.put("message", "story add in highlight");

        return res;
    }

    @Override
    public Map<String, String> removeStory(String storyId, String highlightId) throws ResourcesNotFound {

        Story story = storyRepository.findById(storyId).orElseThrow(
                () -> new ResourcesNotFound("story not found")
        );

        Highlight highlight = highlightRepository.findById(highlightId).orElseThrow(
                () -> new ResourcesNotFound("highlight not found")
        );

        highlight.getStoryHighlight().remove(story);
        highlightRepository.save(highlight);

        story.getHighlight().remove(highlight);
        storyRepository.save(story);

        Map<String, String> res = new HashMap<>();
        res.put("message", " story from highlight removed");

        return res;
    }

    @Override
    public Map<String, String> deleteHighlight(String highlightId) throws ResourcesNotFound {

       Highlight h =  highlightRepository.findById(highlightId).orElseThrow(
                () -> new ResourcesNotFound("highlight not found")
        );

        List<Story> s = h.getStoryHighlight();

        for(Story st:s){
            st.setHighlight(null);
            storyRepository.save(st);
        }

        highlightRepository.deleteById(highlightId);

        Map<String, String> res = new HashMap<>();
        res.put("message", "highlight deleted");

        return res;
    }


}
