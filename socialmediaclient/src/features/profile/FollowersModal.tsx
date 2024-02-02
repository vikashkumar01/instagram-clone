
import { Modal } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { userProps } from '../../vite-env'
import profileImg from '../../assets/profile.png'
import { useDispatch } from 'react-redux'
import {
    followOrUnFollowUserFails,
    followOrUnFollowUserRequest,
    followOrUnFollowUserSuccess,
    getUserProfileSuccess
} from './profileSlice'
import { getProfile, removeUserFollower } from '../../services/profileService'
import { toast } from 'react-toastify'

interface followerProps {
    followersModal: boolean,
    followerModalHandler: () => void,
    userFollowers: userProps[],
    userAuthId: string,
    userProfileId: string

}

const FollowersModal: React.FC<followerProps> =
    ({ followersModal,
        followerModalHandler,
        userFollowers,
        userAuthId,
        userProfileId
    }) => {

        const navigate = useNavigate()
        const dispatch = useDispatch()

        const openUserProfileHandler = (followerProfileId: string) => {
            followerModalHandler()
            if (userAuthId === followerProfileId) {
                navigate("/profile")
            } else {
                navigate(`/profile/${followerProfileId}`)
            }
        }

        const removeFollowerHandler = (unFollowUserId: string) => {
            dispatch(followOrUnFollowUserRequest())
            removeUserFollower(userAuthId, unFollowUserId).then((res) => {
                toast.success(res.data.message)
                dispatch(followOrUnFollowUserSuccess(res.data.message))
                getProfile(userProfileId).then((res) => {
                    dispatch(getUserProfileSuccess(res.data.user))
                })

            }).catch((err) => {
                toast.error(err)
                dispatch(followOrUnFollowUserFails(err))
            })
        }

        return (

            <Modal
                open={followersModal}
                onClose={followerModalHandler}

            >
                <div className='follower-modal-container'>
                    <div>
                        <span>{userFollowers.length} Followers</span>
                        <input type="text" placeholder='search friend' />
                    </div>
                    <div>
                        {
                            userFollowers.length === 0 && <div>No User Found</div>
                        }
                        {
                            userFollowers.map((user, i) => (
                                <div key={i}>
                                    <div>
                                        <img src={user?.profileImgUrl != null ? user?.profileImgUrl : profileImg} alt="" />
                                        <button onClick={() => openUserProfileHandler(user?.id)}>{user.firstName} {user.lastName}</button>
                                    </div>
                                    {
                                        (userAuthId === userProfileId) &&
                                        <button onClick={() => removeFollowerHandler(user?.id)}>Remove</button>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        )
    }

export default FollowersModal