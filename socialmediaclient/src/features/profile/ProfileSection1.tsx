import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { userPropsType } from "../../vite-env";
import ProfileSettingModal from "./ProfileSettingModal";
import Spinner from "../../ui/Spinner";
import { toast } from "react-toastify";
import { Link, useParams } from 'react-router-dom'
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";
import { authClearState } from "../authentication/authSlice";
import {
  changeProfileImageFails,
  changeUserProfileImageRequest,
  changeUserProfileImageSuccess,
  followOrUnFollowUserFails,
  followOrUnFollowUserRequest,
  followOrUnFollowUserSuccess,
  getUserProfileFails,
  getUserProfileRequest,
  getUserProfileSuccess
} from "./profileSlice";
import { changeUserProfilePic, followOrUnFollowUser, getProfile } from "../../services/profileService";
import profileImg from '../../assets/profile.png'
import { createUserMessageFails, createUserMessageRequest, createUserMessageSuccess } from "../message/userMessageSlice";
import { createUserMessage } from "../../services/messageService";

interface userProfileProps {
  profile: {
    isLoading: boolean
    userProfile: userPropsType
    errMessage: string
  }
}

interface authProps {
  auth: {
    user: userPropsType
  }
}


const ProfileSection1 = () => {

  const dispatch = useDispatch();
  const { userId } = useParams();

  const { user } = useSelector((state: authProps) => state.auth)
  const { isLoading, userProfile, errMessage } = useSelector((state: userProfileProps) => state.profile)

  const [profileSettingModal, setProfileSettingModal] = useState<boolean>(false)
  const [followersModal, setFollwersModal] = useState<boolean>(false)
  const [followingModal, setFollowingModal] = useState<boolean>(false)
  const [profileImage, setProfileImage] = useState<File | null>(null)

  useEffect(() => {

    if (userId) {
      dispatch(getUserProfileRequest())
      getProfile(userId).then((res) => {
        dispatch(getUserProfileSuccess(res.data.user))
      }).catch((err) => {
        dispatch(getUserProfileFails(err))
      })
    } else {
      dispatch(getUserProfileRequest())
      getProfile(user?.id).then((res) => {
        dispatch(getUserProfileSuccess(res.data.user))
      }).catch((err) => {
        dispatch(getUserProfileFails(err))
      })
    }

  }, [dispatch, user, userId])

  const profileImageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files && e.target.files[0];
    if (file?.type.startsWith('image/')) {
      setProfileImage(file)
    } else {
      toast.error('please provide valid image')
    }
  }

  useEffect(() => {
    if (profileImage) {
      const formData = new FormData();
      formData.append('image', profileImage);
      dispatch(changeUserProfileImageRequest())
      changeUserProfilePic(user?.id, formData).then((res) => {
        toast.success(res?.data?.message)
        dispatch(changeUserProfileImageSuccess(res?.data?.message))
        getProfile(user?.id).then((res) => {
          dispatch(getUserProfileSuccess(res.data.user))
        })
      }).catch((err) => {
        toast.error(err)
        dispatch(changeProfileImageFails(err))
      })
    }
  }, [dispatch, profileImage, user])

  const checkUserFollowedOrNot = () => {
    return userProfile?.userFollowers?.some((u) => u?.id === user?.id)
  }


  const followOrUnfollowUserHandeler = () => {
    dispatch(followOrUnFollowUserRequest())
    followOrUnFollowUser(user?.id, userProfile?.id).then((res) => {
      toast.success(res.data.message)
      dispatch(followOrUnFollowUserSuccess(res.data.message))
      if (userId) {
        getProfile(userId).then((res) => {
          dispatch(getUserProfileSuccess(res.data.user))
        })
      }

    }).catch((err) => {
      toast.error(err)
      dispatch(followOrUnFollowUserFails(err))
    })
  }

  const sendMessageHandeler = () => {
    dispatch(createUserMessageRequest())
    createUserMessage(user?.id, userProfile.id).then((res) => {
      dispatch(createUserMessageSuccess(res.data.message))
      window.location.href = `/user/${user?.id}/message/${userProfile?.id}`
    }).catch((err) => {
      dispatch(createUserMessageFails(err.message))
    })

  }

  const profileSettingModalHandler = () => {
    setProfileSettingModal((prev) => !prev)
  }

  const follwerModalHandler = () => {
    setFollwersModal((prev) => !prev);
  }

  const followingModalHandler = () => {
    setFollowingModal((prev) => !prev)
  }


  useEffect(() => {
    if (errMessage) {
      toast.error(errMessage)
      dispatch(authClearState())
    }
  }, [dispatch, errMessage])

  return (
    <div className="profile-section-1">
      <div>
        {
          (userProfile?.id !== user?.id) ?
            <label>
              <img src={userProfile?.profileImgUrl !== null ? userProfile?.profileImgUrl : profileImg} alt="not_found" />
            </label>
            :
            <label>
              {
                isLoading && <Spinner />
              }
              <img src={userProfile?.profileImgUrl !== null ? userProfile?.profileImgUrl : profileImg} alt="" />
              <input type="file" onChange={profileImageChangeHandler} />
              {userProfile?.profileImgUrl === null && <FaUserCircle size={160} color={'grey'} />}
            </label>
        }

      </div>
      <div>
        <div>
          <span>{userProfile?.firstName} {userProfile?.lastName}</span>
          {
            (user?.id === userProfile?.id) && <>
              <Link to={`/profile/update-user/${user?.id}`}>Edit Profile</Link>
              <Link to={`/profile/user-archive/${user?.id}`}>View archive</Link>
              <button onClick={profileSettingModalHandler}><IoIosSettings size={26} color={'black'} /></button>
              {
                profileSettingModal && <ProfileSettingModal
                  profileSettingModal={profileSettingModal}
                  profileSettingModalHandler={profileSettingModalHandler}
                  userId={user?.id}

                />
              }
            </>
          }

        </div>
        <div>
          <span>{userProfile?.userPost?.length} posts</span>
          <button onClick={follwerModalHandler}>{userProfile?.userFollowers?.length} followers</button>
          {
            followersModal && <FollowersModal
              followersModal={followersModal}
              followerModalHandler={follwerModalHandler}
              userFollowers={userProfile?.userFollowers}
              userAuthId={user?.id}
              userProfileId={userProfile?.id}
            />
          }
          <button onClick={followingModalHandler}>{userProfile?.userFollowings?.length} following</button>
          {
            followingModal && <FollowingModal
              followingModal={followingModal}
              followingModalHandler={followingModalHandler}
              userFollowings={userProfile?.userFollowings}
              userAuthId={user?.id}
              userProfileId={userProfile?.id}
            />
          }
        </div>
        <div>
          {
            (userProfile?.id !== user?.id) && <button onClick={followOrUnfollowUserHandeler}>
              {checkUserFollowedOrNot() ? "Following" : "Follow"}</button>
          }
          {
            ((userProfile?.id !== user?.id) && checkUserFollowedOrNot()) &&
            <button onClick={sendMessageHandeler}>Message</button>
          }
        </div>
        <div>
          {userProfile?.bio && <p>{userProfile?.bio}</p>}
          {userProfile?.website && <a href={userProfile?.website} target="_blank" >{userProfile?.website}</a>}
        </div>
      </div>
    </div>
  )
}

export default ProfileSection1