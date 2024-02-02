import axios, { AxiosError } from 'axios';

const apiUrl = 'http://localhost:8080/api/v1'

export const sigupUser = async (firstName: string, lastName: string, email: string, password: string) => {
    try {

        const res = await axios.post(`${apiUrl}/auth/user/register`,
            { firstName, lastName, email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        },)

        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                firstName: err?.response.data?.firstName,
                lastName: err?.response.data?.lastName,
                email: err?.response.data?.email,
                password: err?.response.data?.password,
                errMessage: err?.response.data?.errorMessage
            };
        } else {
            throw err;
        }
    }
}


export const signinUser = async (email: string, password: string) => {

    try {
        const res = await axios.post(`${apiUrl}/auth/user/login`,
            {
                email, password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })

        return res
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                email: err?.response?.data?.email,
                password: err?.response?.data?.password,
                errMessage:err?.response?.data?.errorMessage
            }
        } else {
            throw err
        }
    }

}

export const forgotPassword = async (email: string) => {

    try {
        const res = await axios.post(`${apiUrl}/auth/user/forgot-password`,
            { email }, {
            headers: {
                "Content-Type": "application/json"
            }

        })
        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                emailError: err.response.data.errMessage
            }
        } else {
            throw err;
        }
    }
}

export const forgotPasswordChange = async (email: string, code: string, password: string) => {

    try {
        const res = await axios.post(`${apiUrl}/auth/user/forgot-password/change-password`, {
            email, code, password
        })
        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                email: err.response.data.email,
                code: err.response.data.code,
                password: err.response.data.password
            }
        }else{
            throw err
        }
    }

}

export const getLoggedUser = async (token:string) => {
    try {
        const res = await axios.get(`${apiUrl}/auth/user/get-user`, {
            headers: {
                'Authorization': 'Bearer '+token
            }
        })
        return res;
    } catch (err) {
        if (err instanceof AxiosError && err.response) {
            throw {
                errMessage: err.response.data.errMessage
            }
        } else {
            throw err;
        }
    }
}