package com.example.socialmedia.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.socialmedia.exception.ResourcesNotFound;
import com.example.socialmedia.service.ImageOrVideoService;
import com.example.socialmedia.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class ImageOrVideoServiceImpl implements ImageOrVideoService {

    @Autowired
    private final Cloudinary cloudinary;

    public ImageOrVideoServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    @Override
    public Map<String, String> uploadImageOrVideo(MultipartFile file, String folderName) throws IOException {
        Map uploadResult = null;
        String contentType = file.getContentType();
        if (contentType != null) {
            if (contentType.startsWith("image")) {
                uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", folderName, "resource_type", "image"));
            } else if (contentType.startsWith("video")) {
                uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("folder", folderName, "resource_type", "video"));
            } else {
                throw new IllegalArgumentException("Invalid resourceType. Supported values are 'image' and 'video'.");
            }
        }
        Map<String, String> uploadImageOrVideo = new HashMap<>();
        if (uploadResult != null) {
            uploadImageOrVideo.put("imageOrVideoUrl", uploadResult.get("url").toString());
            uploadImageOrVideo.put("imageOrVideoPublicId", uploadResult.get("public_id").toString());
        }
        return uploadImageOrVideo;
    }

    @Override
    public void deleteImageOrVideo(String imageOrVideoId) throws IOException, ResourcesNotFound {
        if (imageOrVideoId == null) {
            throw new ResourcesNotFound("imageOrVideoId not exist");
        }
        cloudinary.uploader().destroy(imageOrVideoId, ObjectUtils.emptyMap());

    }


}
