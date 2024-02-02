
import { Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { userProps, userPropsType } from '../../vite-env'
import { deleteStoryFails, deleteStoryRequest, deleteStorySuccess } from '../feed/feedSlice'
import { getProfile } from '../../services/profileService'
import { toast } from 'react-toastify'
import { deleteUserStory } from '../../services/feedService'
import { getUserProfileSuccess } from './profileSlice'


interface Iprofile {
    profile: {
        userProfile: userPropsType
    }
}

interface Iauth{
    auth:{
        user:userProps
    }
}

const ManageStoryModal = ({ manageStory, manageStoryHandler }: { manageStory: boolean, manageStoryHandler: () => void }) => {

    const { userProfile } = useSelector((state: Iprofile) => state.profile)
    const { user } = useSelector((state: Iauth) => state.auth)
    const dispatch = useDispatch()

    const deleteStoryHandler = (storyId: string) => {
        dispatch(deleteStoryRequest())
        deleteUserStory(storyId).then((res) => {
            console.log(res)
            toast.success(res?.data?.message)
            dispatch(deleteStorySuccess(res?.data?.message))
            getProfile(user?.id).then((res) => {
                dispatch(getUserProfileSuccess(res?.data?.user))
            })
        }).catch((err) => {
            toast.error(err.errMessage)
            dispatch(deleteStoryFails(err.errMessage))
        })

    }

    return (
        <Modal
            open={manageStory}
            onClose={manageStoryHandler}
        >
            <div className='manage-story-container'>

                {
                    userProfile?.userStory.map((story, i) => (
                        <div key={i}>
                            <img src={story?.imgUrl} alt="" />
                            <button onClick={() => deleteStoryHandler(story?.id)}>X</button>
                        </div>
                    ))
                }

            </div>
        </Modal>
    )
}

export default ManageStoryModal