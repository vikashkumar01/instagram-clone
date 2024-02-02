
import { Modal } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { userPropsType } from '../vite-env'
import { useEffect, useState } from 'react'
import { deleteFeedByIdFails, deleteFeedByIdRequest, deleteFeedByIdSuccess, getAllFeedSuccess, reportPostFails, reportPostRequest, reportPostSuccess } from '../features/feed/feedSlice'
import { deleteFeed, getAllFeed, reportPost } from '../services/feedService'
import { toast } from 'react-toastify'
import Spinner from './Spinner'
import { getProfile } from '../services/profileService'
import { getUserProfileSuccess } from '../features/profile/profileSlice'



interface userAuthProps {
    auth: {
        user: userPropsType
    }
}

interface userFeedProps {
    feed: {
        isLoading: boolean
    }
}

const PostModalAction = (
    { open, openAndCloseModalActionHandler, postId, postUserId}:
        { open: boolean, openAndCloseModalActionHandler: () => void, postId: string, postUserId?: string }) => {

    const { user } = useSelector((state: userAuthProps) => state.auth)
    const { isLoading } = useSelector((state: userFeedProps) => state.feed)
    const dispatch = useDispatch()

    const [authUserPost, setAuthUserPost] = useState<boolean>(false)

    useEffect(() => {
        if (user?.id === postUserId) {
            setAuthUserPost(true)
        }
    }, [user, postUserId])


    const deletePostHandler = () => {
        dispatch(deleteFeedByIdRequest())
        deleteFeed(postId).then((res) => {
            toast.success(res?.data?.message)
            dispatch(deleteFeedByIdSuccess(res?.data?.message))
            getAllFeed().then((res) => {
                dispatch(getAllFeedSuccess(res?.data))
            })
            getProfile(user?.id).then((res) => {
                dispatch(getUserProfileSuccess(res?.data?.user))
            })
            openAndCloseModalActionHandler()
        }).catch((err) => {
            toast.error(err)
            dispatch(deleteFeedByIdFails(err))
        })
    }

    const updatePostHandler = () =>{
        window.location.href=`/feed/update/${postId}`   
    }


    const reportPostHandler = () => {
         dispatch(reportPostRequest())
         reportPost(postId,user?.id).then((res)=>{
            toast.success(res?.data?.message)
            dispatch(reportPostSuccess(res.data.message))
         }).catch((err)=>{
            toast.error(err?.errMessage)
            dispatch(reportPostFails(err))
         })
    }

    return (
        <Modal
            open={open}
            onClose={openAndCloseModalActionHandler}
        >
            <div className='post-modal-action-container'>
                {
                    !authUserPost && <button onClick={reportPostHandler}>Report</button>
                }
                {
                    authUserPost && <button onClick={updatePostHandler}>
                         Update image/video
                    </button>
                }
                {
                    authUserPost && <button onClick={updatePostHandler}>
                         Update
                    </button>
                }
                {
                    authUserPost && <button onClick={deletePostHandler}>
                        {
                            isLoading ? <Spinner /> : "Delete"
                        }
                    </button>
                }
                <button onClick={openAndCloseModalActionHandler}>Cancel</button>
            </div>
        </Modal>
    )
}

export default PostModalAction