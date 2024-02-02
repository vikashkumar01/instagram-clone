import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, Link, useParams } from "react-router-dom"
import Spinner from "../../ui/Spinner"
import { changeUserPaswordFails, changeUserPaswordRequest, changeUserPaswordSuccess } from "./profileSlice"
import { changeUserPassword } from "../../services/profileService"
import { toast } from "react-toastify"

interface changeUserPasswordProps {
  profile: {
    isLoading: boolean
  }
}

const ChangeUserPassword = () => {

  const location = useLocation()
  const locationSplit = location.pathname.split("/")
  const { isLoading } = useSelector((state: changeUserPasswordProps) => state.profile)
  const {userId}= useParams()
  const dispatch = useDispatch()

  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')

  const changeUserPasswordHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      dispatch(changeUserPaswordRequest())
      changeUserPassword(userId!,oldPassword,newPassword).then((res)=>{
         toast.success(res.data.message)
         dispatch(changeUserPaswordSuccess(res.data.message))
         setOldPassword("")
         setNewPassword("")
      }).catch((err)=>{
         toast.error(err.errMessage)
         dispatch(changeUserPaswordFails(err))
      })
  }

  return (
    <div className="user-change-password-container">
      <div>
        <Link to={`/${locationSplit[1]}`}>{locationSplit[1]}</Link><span> / </span><span>{locationSplit[2]}</span>
      </div>
      <form>
        <input
          type="password"
          placeholder="old password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div>
          <button disabled={isLoading} onClick={changeUserPasswordHandler}>
            {isLoading?<Spinner color={"#ffffff"}/>:"change-password"}</button>
        </div>
      </form>
    </div>
  )
}

export default ChangeUserPassword