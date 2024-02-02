import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { emailValidator, passwordValidator } from '../../utils/validation';
import Spinner from '../../ui/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { authClearState, getUserSuccess, signInFail, signInRequest, signInSuccess } from './authSlice';
import { getLoggedUser, signinUser } from '../../services/authService';
import { toast } from 'react-toastify';
import { errUserPropsType } from '../../vite-env';

interface authLoginProps {
    auth: {
        isLoading: boolean,
        errMessage: errUserPropsType,
        successMessage: string
    }
}

const Login = () => {

    const { isLoading, errMessage, successMessage } = useSelector((state: authLoginProps) => state.auth)
    const dispatch = useDispatch();

    const [email, setemail] = useState<string>('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorPassword, setErrorPassword] = useState<boolean>(false)


    const loginHandler = () => {
        dispatch(signInRequest())
        signinUser(email, password).then((res) => {
            toast.success(res.data.message)
            window.localStorage.setItem('authToken', res.data.token)
            dispatch(signInSuccess(res.data.message))
            getLoggedUser(res.data.token).then((res) => {
                dispatch(getUserSuccess(res.data.user))
              })
        }).catch((err) => {
            dispatch(signInFail(err))
        })
    }


    useEffect(() => {
        if (successMessage) {
            dispatch(authClearState())
        }
        if (errMessage) {
            if (errMessage.email) {
                toast.error(errMessage.email)
            }
            if (errMessage.password) {
                toast.error(errMessage.password)
            }
            if (errMessage.errMessage) {
                toast.error(errMessage.errMessage)
                dispatch(authClearState())
            }

        }
    }, [dispatch, successMessage, errMessage])

    useEffect(() => {
        if (email !== "") {
            if (!emailValidator(email)) {
                setErrorEmail(true)
            } else {
                setErrorEmail(false)
            }
        } else {
            setErrorEmail(false)
        }

        if (password !== "") {
            if (!passwordValidator(password)) {
                setErrorPassword(true)
            } else {
                setErrorPassword(false)
            }
        } else {
            setErrorPassword(false)
        }

    }, [email, password])


    const googleLoginHandler = () => {

    }



    return (
        <div className='login-container'>

            <div>

                <span>Instagram</span>

                <form>

                    <div>
                        <input
                            className={errorEmail ? 'input-error' : undefined}
                            type="email"
                            required
                            placeholder="Email address"
                            onChange={(e) => setemail(e.target.value)}
                        />
                        {errorEmail && <span className='error'>Email is not valid</span>}
                    </div>
                    <div>
                        <input
                            className={errorPassword ? 'input-error' : undefined}
                            type="password"
                            required
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errorPassword && <span className='error'>Password must contain 1 char,1 number and 1 special char</span>}
                    </div>
                    <div>
                        <button disabled={isLoading || email === "" || password === ""} onClick={loginHandler}>{isLoading ? <Spinner color={"#ffffff"}/> : "Login"}</button>
                    </div>
                    <div>
                        <div>
                            <hr />
                            <span>OR</span>
                            <hr />
                        </div>
                    </div>

                    <div>
                        <button onClick={googleLoginHandler}>
                            <FcGoogle size={22} />
                            <span>Login With Google</span>
                        </button>
                    </div>

                    <div>
                        <Link to={"/forgot-password"}>Forgotten your password?</Link>
                    </div>
                </form>
            </div>

            <div>
                <span>Don't have an account?</span>
                <Link to={"/signup"}>SignUp</Link>
            </div>

        </div>
    )
}

export default Login