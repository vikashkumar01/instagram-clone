
import { useState, useEffect } from 'react'
import { FiLock } from "react-icons/fi";
import { passwordValidator } from '../../utils/validation';

const ForgotPasswordChange = () => {

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<boolean>(false)

  const forgotPasswordChangeHandler = () => {
    console.log(password)
    window.location.href = "/"
  }


  useEffect(() => {
    if (password !== "") {
      if (!passwordValidator(password)) {
        setErrorPassword(true)
      } else {
        setErrorPassword(false)
      }
    } else {
      setErrorPassword(false)
    }

    if(confirmPassword !== ""){
      if (!confirmPassword.match(password)) {
        setErrorConfirmPassword(true)
      } else {
        setErrorConfirmPassword(false)
      }
    }else{
      setErrorConfirmPassword(false)
    }
   

  }, [password, confirmPassword])

  return (
    <div className="forgotpassword-container">
      <div>
        <span>Instagram</span>
      </div>
      <div>
        <form>
          <div>
            <FiLock size={100} color={'grey'} />
            <span>Change Password</span>
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
            <input
              className={errorConfirmPassword ? 'input-error' : undefined}
              type="password"
              required
              placeholder="code"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorConfirmPassword && <span className='error'>Password did not match</span>}

          </div>

          <div>
            <input
              className={errorConfirmPassword ? 'input-error' : undefined}
              type="password"
              required
              placeholder="email"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errorConfirmPassword && <span className='error'>Password did not match</span>}

          </div>
          <div>
            <button disabled={password === ""} onClick={forgotPasswordChangeHandler}>Change Password</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default ForgotPasswordChange