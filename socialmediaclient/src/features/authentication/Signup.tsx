import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { emailValidator, nameValidator, passwordValidator } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { authClearState, signupFail, signupRequest, signupSuccess } from './authSlice';
import { errUserPropsType } from '../../vite-env';
import { sigupUser } from '../../services/authService';
import Spinner from '../../ui/Spinner';


interface signupProps {
    auth: {
        isLoading: boolean,
        successMessage: string,
        errMessage: errUserPropsType,
    }
}

const Signup = () => {

    const { isLoading, successMessage, errMessage } = useSelector((state: signupProps) => state.auth)
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState('')

    const [errorfirstName, setErrorfirstName] = useState<boolean>(false)
    const [errorlastName, setErrorlastName] = useState<boolean>(false)
    const [errorEmail, setErrorEmail] = useState<boolean>(false)
    const [errorPassword, setErrorPassword] = useState<boolean>(false)

    const signupHandler = () => {
        dispatch(signupRequest())
        sigupUser(firstName, lastName, email, password).then((res) => {
            dispatch(signupSuccess(res.data.message))
        }).catch((err) => {
            dispatch(signupFail(err))
        })
    }

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(authClearState())
        }
        if (errMessage) {
            if (errMessage.firstName) {
                toast.error(errMessage.firstName)
            }
            if (errMessage.lastName) {
                toast.error(errMessage.lastName)
            }
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

        if (firstName !== "") {
            if (!nameValidator(firstName)) {
                setErrorfirstName(true)
            } else {
                setErrorfirstName(false)
            }
        } else {
            setErrorfirstName(false)
        }

        if (lastName !== "") {
            if (!nameValidator(lastName)) {
                setErrorlastName(true)
            } else {
                setErrorlastName(false)
            }
        } else {
            setErrorlastName(false)
        }

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

    }, [firstName, lastName, email, password])

    const googleLoginHandler = () => {

    }

    return (
        <div className='signup-container'>
            <div>
                <span>Instagram</span>
                <form>
                    <div>
                        <span>Sign up to see photos and videos from your friends.</span>
                        <button onClick={googleLoginHandler}>
                            <FcGoogle size={22} />
                            <span>Login With Google</span>
                        </button>
                    </div>
                    <div>
                        <div>
                            <hr />
                            <span>OR</span>
                            <hr />
                        </div>
                    </div>
                    <div>
                        <input
                            className={errorfirstName ? 'input-error' : undefined}
                            type="text"
                            required
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        {errorfirstName && <span className='error'>firstName must be char and more than 3 char</span>}
                    </div>
                    <div>
                        <input
                            className={errorlastName ? 'input-error' : undefined}
                            type="text"
                            required
                            placeholder="Last name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errorlastName && <span className='error'>lastName must be char and more than 3 char</span>}
                    </div>
                    <div>
                        <input
                            className={errorEmail ? 'input-error' : undefined}
                            type="email"
                            required
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
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
                        <span>
                            People who use our service may have uploaded your contact information to Instagram.
                            <span>Learn more</span>
                        </span>
                    </div>

                    <div>
                        <span>
                            By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
                        </span>
                    </div>

                    <div>
                        <button
                            disabled={
                                isLoading || firstName === ""|| lastName === "" || email === "" || password === ""}
                            onClick={signupHandler}>{isLoading ? <Spinner /> : 'SignUp'}
                        </button>
                    </div>

                </form>
            </div>

            <div>
                <span>Have an account? </span><Link to={"/"}>Log in</Link>
            </div>
        </div>
    )
}

export default Signup