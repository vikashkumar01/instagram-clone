import axios, { AxiosError } from 'axios';

const apiUrl = 'http://localhost:8080/api/v1/private'

const token = 'Bearer ' + localStorage.getItem('authToken');

export const createUserMessage = async (userId: string, otherUserId: string) => {

    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/other-user/${otherUserId}/create-user-chat`, {
            headers: {
                'Authorization': token,
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

export const getAllUserMessage = async (userId:string) => {

    try {
        const res = await axios.get(`${apiUrl}/user/${userId}/get-user-list-of-message`, {
            headers: {
                'Authorization': token,
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

export const getUserMessage = async (senderId: string, receiverId: string) => {

    try {
        const res = await axios.get(`${apiUrl}/user/${senderId}/message/${receiverId}/get-message`, {
            headers: {
                'Authorization': token,
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

export const sendUserMessage = async (senderId: string, receiverId: string, cmessage: string) => {
    try {
        const res = await axios.post(`${apiUrl}/user/${senderId}/message/${receiverId}/send-message/`, cmessage, {
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

export const deleteUserMessage = async (chatId:string) => {
    try {
        const res = await axios.delete(`${apiUrl}/user/message/${chatId}`, {
            headers: {
                'Authorization': token,
            }
        }
        )
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
