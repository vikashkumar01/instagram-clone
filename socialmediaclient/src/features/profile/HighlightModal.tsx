
import { Modal } from '@mui/material'
import { userProps, userPropsType } from '../../vite-env'
import { useDispatch, useSelector } from 'react-redux'
import { deleteHighlightFails, deleteHighlightRequest, deleteHighlightSuccess, getUserProfileSuccess } from './profileSlice'
import { deleteHighlight, getProfile } from '../../services/profileService'
import { toast } from 'react-toastify'
import Spinner from '../../ui/Spinner'
import { useState } from 'react'
import ShowHighlightStory from './ShowHighlightStory'

interface Iauth {
    auth: {
        user: userProps
    }
}

interface Iprofile {
    profile: {
        userProfile: userPropsType,
        ishighlightLoading: boolean
    }
}

const HighlightModal = (
    {
        highlightModal,
        highlightModalHandler,
        addHighlightOpenHandler,
        highlightId }
        :
        {
            highlightModal: boolean,
            highlightModalHandler: () => void,
            addHighlightOpenHandler: () => void,
            highlightId: string
        }) => {

    const { user } = useSelector((state: Iauth) => state.auth)
    const { userProfile, ishighlightLoading } = useSelector((state: Iprofile) => state.profile)
    const dispatch = useDispatch()

    const [showhighlightStory, setShowHighlightStory] = useState<boolean>(false)

    const deleteHighlightHandler = () => {
        dispatch(deleteHighlightRequest())
        deleteHighlight(highlightId).then((res) => {
            toast.success(res?.data?.message)
            dispatch(deleteHighlightSuccess(res?.data?.message))
            getProfile(user?.id).then((res) => {
                dispatch(getUserProfileSuccess(res?.data?.user))
            })
            highlightModalHandler()
        }).catch((err) => {
            toast.error(err.errMessage)
            dispatch(deleteHighlightFails(err.errMessage))
        })
    }

    const showHighlightStoryHandler = () => {
        setShowHighlightStory((prev) => !prev)
    }

    return (
        <Modal
            open={highlightModal}
        >
            <div className='highlight-modal-container'>
                <button onClick={showHighlightStoryHandler}>View Hightlight</button>
                {
                    (user?.id === userProfile?.id) && <button onClick={addHighlightOpenHandler}>Add Highlight</button>
                }
                {
                    (user?.id === userProfile?.id) && <button onClick={deleteHighlightHandler}>
                        {
                            ishighlightLoading ? <Spinner /> : "Delete Highlight"
                        }
                    </button>
                }
                <button onClick={highlightModalHandler}>Cancel</button>
                {
                    showhighlightStory && <ShowHighlightStory
                        showHighlightStory={showhighlightStory}
                        showHighlightStoryHandler={showHighlightStoryHandler}
                        highlightId={highlightId}
                    />
                }
            </div>
        </Modal>
    )
}

export default HighlightModal