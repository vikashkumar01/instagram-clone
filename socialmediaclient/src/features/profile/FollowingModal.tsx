
import { Modal } from '@mui/material'
import { useNavigate } from "react-router-dom"
import { userProps } from '../../vite-env'
import profileImg from '../../assets/profile.png'
import { useDispatch } from 'react-redux'
import { followOrUnFollowUserFails, followOrUnFollowUserRequest, followOrUnFollowUserSuccess, getUserProfileSuccess } from './profileSlice'
import { followOrUnFollowUser, getProfile } from '../../services/profileService'
import { toast } from 'react-toastify'

interface follwingProps {
    followingModal: boolean,
    followingModalHandler: () => void,
    userFollowings: userProps[],
    userAuthId: string,
    userProfileId: string

}

const FollowingModal: React.FC<follwingProps> = ({
    followingModal,
    followingModalHandler,
    userFollowings,
    userAuthId,
    userProfileId }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const openFollowingsProfileHandler = (userId: string) => {
        followingModalHandler()
        navigate(`/profile/${userId}`)
    }

    const unFollowUserHandler = (unFollowUserId: string) => {
        dispatch(followOrUnFollowUserRequest())
        followOrUnFollowUser(userAuthId, unFollowUserId).then((res) => {
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
            open={followingModal}
            onClose={followingModalHandler}
        >
            <div className='following-modal-container'>
                <div>
                    <span>Followers</span>
                    <input type="text" placeholder='search friend' />
                </div>
                <div>
                    {
                        userFollowings.length === 0 && <div>No User Found</div>
                    }
                    {
                        userFollowings.map((user, i) => (
                            <div key={i}>
                                <div>
                                    <img src={user?.profileImgUrl != null ? user?.profileImgUrl : profileImg} alt="" />
                                    <button onClick={() => openFollowingsProfileHandler(user?.id)}>{user?.firstName} {user?.lastName}</button>
                                </div>
                                {
                                    (userAuthId === userProfileId) && <button onClick={() => unFollowUserHandler(user?.id)}>Following</button>
                                }

                            </div>
                        ))
                    }
                </div>
            </div>
        </Modal>
    )
}

export default FollowingModal