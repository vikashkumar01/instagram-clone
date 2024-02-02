package com.example.socialmedia.utils;

import org.springframework.stereotype.Component;

@Component
public class Constants {

    public static final String folderName = "postImageOrVideo";
    public static final String folderName1 = "profileAndCoverPic";
    public static final String getFolderName2 = "statusImageOrVideo";

    public static final Long EXPIRATION_TIME = (long) (24 * 60 * 60 * 1000);
}
