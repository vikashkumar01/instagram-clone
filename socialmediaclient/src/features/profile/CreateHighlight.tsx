
import { useState } from 'react'
import { Modal } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { userProps, userPropsType } from "../../vite-env"
import { addStoryInHighlight, createHighlight, getProfile, removeStoryFromHighlight } from '../../services/profileService'
import { addStoryInHighlightFails, addStoryInHighlightRequest, addStoryInHighlightSuccess, createHighlightFails, createHighlightRequest, createHighlightSuccess, getUserProfileSuccess, removeStoryFromHighlightFails, removeStoryFromHighlightRequest, removeStoryFromHighlightSuccess } from './profileSlice'
import { toast } from 'react-toastify'
import Spinner from '../../ui/Spinner'

interface Iprofile {
  profile: {
    userProfile: userPropsType
    isLoading: boolean,
    ishighlightLoading: boolean
  }
}
interface IAuth {
  auth: {
    user: userProps
  }
}

const CreateHighlight = ({ createHighlightModal,
  createHighlightModalHandler,
  activeRoute,
  activeHighlightId }:
  {
    createHighlightModal: boolean,
    createHighlightModalHandler: () => void,
    activeRoute: number | null,
    activeHighlightId: string | null
  }) => {

  const { userProfile, ishighlightLoading } = useSelector((state: Iprofile) => state.profile)
  const { user } = useSelector((state: IAuth) => state.auth)
  const dispatch = useDispatch();

  const [highlightId, setHighlightId] = useState<string>(activeHighlightId != null ? activeHighlightId : "")
  const [highlightName, setHighlightName] = useState<string>("")
  const [activeRouteNumber, setActiveRouteNumber] = useState<number>(activeRoute != null ? activeRoute : 0)

  const createHighlightHandler = () => {
    if (highlightName !== "") {
      dispatch(createHighlightRequest())
      const formDate = new FormData();
      formDate.append("highlightName", highlightName)
      createHighlight(user?.id, formDate).then((res) => {
        dispatch(createHighlightSuccess(res.data.message))
        toast.success(res?.data?.message)
        setHighlightId(res?.data?.highlightId)
        setActiveRouteNumber(1)
        getProfile(user?.id).then((res) => {
          dispatch(getUserProfileSuccess(res?.data?.user))
        })
      }).catch((err) => {
        toast.error(err.errMessage)
        dispatch(createHighlightFails(err.errMessage));
      })
    } else {
      toast.error("please enter hightlight name")
    }
  }

  const addStoryInHighlightHandler = (storyId: string) => {
    dispatch(addStoryInHighlightRequest())
    addStoryInHighlight(user?.id, storyId, highlightId).then((res) => {
      toast.success(res?.data?.message)
      dispatch(addStoryInHighlightSuccess(res?.data?.message))
      getProfile(user?.id).then((res) => {
        dispatch(getUserProfileSuccess(res?.data?.user))
      })

    }).catch((err) => {
      toast.error(err?.errMessage)
      dispatch(addStoryInHighlightFails(err.errMessage))
    })
  }

  const removeStoryFromHighlightHandler = (storyId: string) => {
    dispatch(removeStoryFromHighlightRequest())
    removeStoryFromHighlight(storyId, highlightId).then((res) => {
      toast.success(res?.data?.message)
      getProfile(user?.id).then((res) => {
        dispatch(getUserProfileSuccess(res?.data?.user))
      })
      dispatch(removeStoryFromHighlightSuccess(res?.data?.message))

    }).catch((err) => {
      toast.error(err?.errMessage)
      dispatch(removeStoryFromHighlightFails(err?.errMessage))
    })
  }

  const isStoryExistInHighlight = (storyId: string) => {

    let isExist;
    userProfile.userHighlight.forEach((highlight) => {
      if (highlight.id === highlightId) {
        isExist = highlight.storyHighlight.some(s => s.id === storyId)
      }
    })
    return isExist;
  }



  return (
    <Modal
      open={createHighlightModal}
      onClose={createHighlightModalHandler}
    >
      <div className="create-highlights-container">

        {
          ((activeRouteNumber === 0) && (user?.id === userProfile.id)) &&
          <div className='create-highlight-container'>
            <span>Create Highlight</span>
            <input type="" placeholder="Enter highlight name" onChange={(e) => setHighlightName(e.target.value)} />
            <button disabled={ishighlightLoading} onClick={createHighlightHandler}>
              {
                ishighlightLoading ? <Spinner color={"ffffff"} /> : "Create Highlight"
              }
            </button>
          </div>
        }

        {
          (activeRouteNumber === 1) && userProfile?.userStory?.map((story, i) => (
            <div key={i} className='highlight-story'>
              <img src={story?.imgUrl} alt="" />
              {
                isStoryExistInHighlight(story?.id) &&
                <button className='remove-story' disabled={ishighlightLoading} onClick={() => removeStoryFromHighlightHandler(story?.id)}>X</button>
              }
              <button className="add-story" disabled={ishighlightLoading} onClick={() => addStoryInHighlightHandler(story?.id)}>+</button>

            </div>
          ))
        }
      </div>
    </Modal>
  )
}

export default CreateHighlight