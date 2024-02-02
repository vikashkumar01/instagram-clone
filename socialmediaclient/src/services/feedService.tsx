import axios, { AxiosError } from 'axios';

const apiUrl = 'http://localhost:8080/api/v1/private'

const token = 'Bearer ' + localStorage.getItem('authToken');

export const createUserFeed = async (userId: string, formData: FormData) => {

    try {
        const res = await axios.post(`${apiUrl}/user/${userId}/create-post`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token,
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const getAllFeed = async () => {
    try {
        const res = await axios.get(`${apiUrl}/user/post/all-post`, {
            headers: {
                "Authorization": token
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const getAllReels = async () => {
    try {
        const res = await axios.get(`${apiUrl}/user/post/get-reel`, {
            headers: {
                "Authorization": token
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const getPostById = async (postId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/post/${postId}/get-post`, {
            headers: {
                'Authorization': token
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const updatePost = async (postId: string, postTitle: string, postDesc: string) => {
    try {
        const res = await axios.put(`${apiUrl}/user/post/${postId}/update-post`,
            { postTitle, postDesc },
            {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            }
        )
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                title: err.response.data.title,
                desc: err.response.data.des,
                errMessage: err.response.data.errorMessage
            }
        } else {
            throw err
        }
    }
}

export const changePostImageOrVideo = async (postId: string, formData: FormData) => {
    try {
        const res = await axios.put(`${apiUrl}/user/post/${postId}/change-post-image-or-video`,formData, {
            headers: {
                "Authorization": token,
                'Content-Type': 'multipart/form-data',
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const likeOrUnlikeFeed = async (postId: string, userId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/post/${postId}/like-or-dislike-post`, {
            headers: {
                "Authorization": token
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const deleteFeed = async (postId: string) => {
    try {
        const res = await axios.delete(`${apiUrl}/user/post/${postId}/delete-post`, {
            headers: {
                "Authorization": token
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const reportPost = async (postId: string, userId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/post/${postId}/report-post`, {
            headers: {
                "Authorization": token
            }
        })
        return res
    } catch (err) {
        console.log(err)
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errorMessage
            }
        } else {
            throw err
        }
    }
}

export const commentOnPost = async (postId: string, userId: string, message: string) => {
    try {
        const res = await axios.post(`${apiUrl}/user/${userId}/post/${postId}/comment-on-post`, { message },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": token
                }
            })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}


export const deleteCommentFromPost = async (commentId: string) => {
    try {
        const res = await axios.delete(`${apiUrl}/user/comment/${commentId}/delete-comment`,
            {
                headers: {
                    "Authorization": token
                }
            })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errorMessage
            }
        } else {
            throw err
        }
    }
}

export const likeOrUnlikeCommentOnPost = async (userId: string, commentId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/comment/${commentId}/like-or-dislike-comment`,
            {
                headers: {
                    "Authorization": token
                }
            })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const getAllUserHavingStory = async (userId:string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/get-all-user-having-story`, {
            headers: {
                "Authorization": token
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const getAllUserStory = async (userId:string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/get-all-user-story`, {
            headers: {
                "Authorization": token
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const createUserStory = async (userId:string,formData:FormData) => {
    try {
        const res = await axios.post(`${apiUrl}/user/${userId}/share-story`, formData, {
            headers: {
                "Authorization": token,
                'Content-Type': 'multipart/form-data',
                
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const deleteUserStory = async (storyId:string) => {
    try {
        const res = await axios.delete(`${apiUrl}/user/${storyId}/delete-story` ,{
            headers: {
                "Authorization": token,    
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

