import { useState } from 'react'
import { useLocation, Link } from "react-router-dom"
import { userPropsType } from "../../vite-env"
import { useDispatch, useSelector } from "react-redux"
import { updateUserProfileFails, updateUserProfileRequest, updateUserProfileSuccess } from './profileSlice'
import { updateUser } from '../../services/profileService'
import { toast } from 'react-toastify'
import { getLoggedUser } from '../../services/authService'
import { getUserSuccess } from '../authentication/authSlice'
import { getUserProfileSuccess } from './profileSlice'
import Spinner from '../../ui/Spinner'

interface userAuthProps {
  auth: {
    user: userPropsType
  }
}

interface userProfileProps {
  profile: {
    isLoading: boolean
  }

}

const UpdateUser = () => {

  const location = useLocation()
  const locationSplit = location.pathname.split("/")
  const { isLoading } = useSelector((state: userProfileProps) => state.profile)
  const { user } = useSelector((state: userAuthProps) => state.auth)
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState<string>(user?.firstName)
  const [lastName, setLastName] = useState<string>(user?.lastName)
  const [email, setEmail] = useState<string>(user?.email)
  const [phoneNumber, setPhoneName] = useState<number | undefined>(user?.phoneNumber)
  const [bio, setBio] = useState<string | undefined>(user?.bio)
  const [website, setWebsite] = useState<string | undefined>(user?.website)

  const updateUserHandler = () => {
    dispatch(updateUserProfileRequest())
    updateUser(
      user?.id,
      firstName,
      lastName,
      email,
      phoneNumber,
      bio,
      website
    ).then((res) => {
      toast.success(res.data.message)
      dispatch(updateUserProfileSuccess(res.data.message))
      getLoggedUser().then((res) => {
        dispatch(getUserProfileSuccess(res.data.user))
        dispatch(getUserSuccess(res.data.user))
      })
    }).catch((err) => {
      toast.error(err)
      dispatch(updateUserProfileFails(err))
    })
  }

  return (
    <div className="update-user-container">
      <div>
        <Link to={`/${locationSplit[1]}`}>{locationSplit[1]}</Link><span> / </span><span>{locationSplit[2]}</span>
      </div>
      <div>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            placeholder="First name"
            onChange={(e) => { setFirstName(e.target.value) }}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            placeholder="Last name"
            onChange={(e) => { setLastName(e.target.value) }}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => { setEmail(e.target.value) }}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="number"
            value={phoneNumber}
            placeholder="Phone number"
            onChange={(e) => { setPhoneName(Number(e.target.value)) }}
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea
            value={bio}
            placeholder='Bio'
            onChange={(e) => { setBio(e.target.value) }}
          />
        </div>
        <div>
          <label>website</label>
          <input
            type="text"
            placeholder='website link'
            value={website}
            onChange={(e) => { setWebsite(e.target.value) }}
          />
        </div>
        <div>
          <button disabled={isLoading} onClick={updateUserHandler}>
            {isLoading?<Spinner color={"#ffffff"} /> : "update"}</button>
        </div>

      </div>
    </div>
  )
}

export default UpdateUser