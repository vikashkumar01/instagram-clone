package com.example.socialmedia.service;

import com.example.socialmedia.exception.ResourcesNotFound;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface ImageOrVideoService {

    Map<String, String> uploadImageOrVideo(MultipartFile file, String folderName) throws IOException;

    void deleteImageOrVideo(String imageId) throws IOException, ResourcesNotFound;
}
