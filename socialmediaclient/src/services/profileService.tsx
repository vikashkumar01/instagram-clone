
import axios, { AxiosError } from 'axios';

const apiUrl = 'http://localhost:8080/api/v1/private'

const token = 'Bearer ' + localStorage.getItem('authToken');

export const getProfile = async (userId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/get-user`, {
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

export const changeUserPassword = async (userId: string, oldPassword: string, newPassword: string) => {
    try {
        const res = await axios.put(`${apiUrl}/user/${userId}/change-user-password`,
            { oldPassword, newPassword }, {
            headers: {
                'Authorization': token,
                "Content-Type": "application/json"
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

export const updateUser = async (userId: string, firstName: string, lastName: string, email: string, phoneNumber?: number, bio?: string, website?: string) => {
    try {
        const res = await axios.put(`${apiUrl}/user/${userId}/update-user`,
            { firstName, lastName, email, phoneNumber, bio, website }, {
            headers: {
                'Authorization': token,
                "Content-Type": "application/json"
            }
        })
        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                firstName: err.response.data.firstName,
                lastName: err.response.data.lastName,
                email: err.response.data.email,
                errMesage: err.response.data.errMessage
            }
        } else {
            throw err
        }
    }
}

export const followOrUnFollowUser = async (userId: string, otheruserId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/otheruser/${otheruserId}/follow-or-unfollow`, {
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

export const removeUserFollower = async (userId: string, otheruserId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/otheruser/${otheruserId}/remove-user-follower`, {
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


export const changeUserProfilePic = async (userId: string, formData: FormData) => {
    try {
        const res = await axios.put(`${apiUrl}/user/${userId}/change-profile-pic`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": token,

            }
        })

        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                image: err.response.data.image,
                errMessage: err.response.data.message
            }
        } else {
            throw err
        }
    }
}


export const deleteUser = async (userId: string) => {
    try {
        const res = await axios.delete(`${apiUrl}/user/${userId}/delete-user`, {
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

export const getAllSearchUser = async (username: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/search-user?username=${username}`, {
            headers: {
                "Authorization": token
            }
        })
        return res;
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

export const saveFeedInUserFav = async (userId: string, postId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/post/${postId}/save-in-fav`, {
            headers: {
                "Authorization": token
            }
        })
        return res;
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

export const removeFeedFromUserFav = async (userId: string, postId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/post/${postId}/remove-from-fav`, {
            headers: {
                "Authorization": token
            }
        })
        return res;
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

export const createHighlight = async (userId: string, formData: FormData) => {
    try {
        const res = await axios.post(`${apiUrl}/user/${userId}/create-highlight`,formData, {
            headers: {
                "Authorization": token,
                'Content-Type': 'multipart/form-data',
            }
        })
        return res;
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

export const addStoryInHighlight = async (userId: string, storyId: string, highlightId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/story/${storyId}/highlight/${highlightId}/add-story-in-highlight`, {
            headers: {
                "Authorization": token
            }
        })
        return res;
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

export const removeStoryFromHighlight = async (storyId: string, highlightId: string) => {
    try {
        const res = await axios.get(`${apiUrl}/user/story/${storyId}/highlight/${highlightId}/remove-story-from-highlight`, {
            headers: {
                "Authorization": token
            }
        })
        return res;
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

export const deleteHighlight = async (highlightId:string) => {
    try {
        const res = await axios.delete(`${apiUrl}/user/highlight/${highlightId}/delete-highlight`,{
            headers: {
                "Authorization": token
            }
        })
        return res;
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
