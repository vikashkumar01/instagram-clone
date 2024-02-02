import axios, { AxiosError } from 'axios';

const apiUrl = 'http://localhost:8080/api/v1/private'

const token = 'Bearer ' + localStorage.getItem('authToken');


export const getAllUserNotifications = (userId: string) => {
    try {
        const res = axios.get(`${apiUrl}/user/${userId}/get-notification`,
            {
                headers: {

                    'Authorization': token,
                }
            }

        )

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

export const deleteNotifications = (notificationId:string) => {
    try {
        const res = axios.delete(`${apiUrl}/user/notification/${notificationId}/delete-message`,
            {
                headers: {
                    'Authorization': token,
                }
            }

        )

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