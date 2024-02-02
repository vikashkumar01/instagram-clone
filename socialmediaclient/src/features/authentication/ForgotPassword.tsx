
import { useState, useEffect } from 'react'
import { FiLock } from "react-icons/fi";
import { emailValidator } from '../../utils/validation'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEamil] = useState<string>('')
    const [errorEmail, seterrorEmail] = useState<boolean>(false)

    const forgotPasswordHandler = () => {

    }

    useEffect(() => {
        if (email !== "") {
            if (!emailValidator(email)) {
                seterrorEmail(true)
            } else {
                seterrorEmail(false)
            }
        } else {
            seterrorEmail(false)
        }
    }, [email])

    return (
        <div className="forgotpassword-container">
            <div>
                <span>Instagram</span>
            </div>
            <div>
                <form>
                    <div>
                        <FiLock size={100} color={'grey'} />
                        <span>Trouble with logging in?</span>
                        <span>Enter your email address and we'll send you a link to get back into your account.</span>
                    </div>
                    <div>
                        <input
                            className={errorEmail ? 'input-error' : undefined}
                            type="email"
                            required
                            placeholder="Email address"
                            onChange={(e) => setEamil(e.target.value)}
                        />
                        {errorEmail && <span className='error'>Email must be valid</span>}
                    </div>
                    <div>
                        <button disabled={email === ""} onClick={forgotPasswordHandler}>Send Login Link</button>
                    </div>
                    <div>
                        <div>
                            <hr />
                            <span>OR</span>
                            <hr />
                        </div>
                    </div>
                    <div>
                        <Link to={"/signup"}>Create New Account</Link>
                    </div>
                    <div>
                        <Link to={"/"}>Back to Login</Link>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default ForgotPassword