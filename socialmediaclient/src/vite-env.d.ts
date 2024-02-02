/// <reference types="vite/client" />

interface role {
    id: number;
    name: string;
}

export interface userProps {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number,
    bio: string,
    website: string,
    profileImgUrl: string | null,
    roles: role[],
    createdAt: Date,
    updatedAt: Date,
}

interface postCommentProps {
    id: string,
    message: string,
    userId: userProps,
    userLikedComment: userProps[],
    createdAt: Date,
    updatedAt: Date,
}

interface userPostProps {
    id: string,
    postTitle: string,
    postDesc: string,
    postImgUrl: string,
    postReelUrl: string,
    postLiked: userProps[],
    user: userProps,
    userComment: postCommentProps[],
    createdAt: Date,
    updatedAt: Date,
}


export interface userPropsType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: number | undefined,
    bio: string | undefined,
    website: string | undefined,
    profileImgUrl: string | null,
    roles: role[],
    userFollowers: userProps[],
    userFollowings: userProps[],
    userPost: userPostProps[],
    userReels: userPostProps[],
    userStory:userStoryProps[],
    userSavedReelsAndPost: userPostProps[],
    userHighlight:userHighlightProps[]
    createdAt: Date,
    updatedAt: Date,
}

export interface userStoryProps{
   id:string,
   user:userProps,
   imgUrl?:string,
   videoUrl?:string,
   createdAt:Date,
}

export interface userHighlightProps {
    id:string,
    highlightName:string,
    storyHighlight:userStoryProps[]
}


export interface userNotification {
    id: string,
    firstName: string,
    lastName: string,
    follower:string,
    following:string,
    message:string,
    createdAt:Date,
}

export interface userChatsProps{
    id:string,
    userId:string,
    userMessage:userMessageProps,
    chatMessage:string,
    createdAt:Date,
}

export interface userMessageProps{
    id:string,
    createdBy:userProps,
    createdFor:userProps, 
    createdAt:Date,
}

export interface errUserPropsType {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    errMessage?: string,
}

export interface sucessLoginPropsType {
    message?: string,
    token?: string
}

