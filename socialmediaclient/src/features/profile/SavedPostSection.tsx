import { useDispatch, useSelector } from "react-redux"
import EmptyPost from "../../ui/EmptyPost"
import { userPropsType } from "../../vite-env"
import { useState } from "react"
import PostShowsModal from "../../ui/PostShowsModal"
import { getUserProfileSuccess, removeUserFavPostFails, removeUserFavPostRequest, removeUserFavPostSuccess } from "./profileSlice"
import { getProfile, removeFeedFromUserFav } from "../../services/profileService"
import { toast } from "react-toastify"

interface savePostAndReelProps {
  profile: {
    userProfile: userPropsType
  }
}

const SavedPostSection = () => {

  const { userProfile } = useSelector((state: savePostAndReelProps) => state.profile)
  const userFavPostAndReel = userProfile.userSavedReelsAndPost
  const dispatch = useDispatch()

  const [openShowModal, setOpenShowModal] = useState<boolean>(false)
  const [openShowModalIndex, setOpenShowModalIndex] = useState<number | null>(null)

  const removeFeedFromFavHandler = (postId: string) => {
        dispatch(removeUserFavPostRequest())
        removeFeedFromUserFav(userProfile?.id,postId).then((res)=>{
          toast.success(res.data.message);
          dispatch(removeUserFavPostSuccess(res.data.message))
          getProfile(userProfile?.id).then((res)=>{
            dispatch(getUserProfileSuccess(res.data.user))
          })
        }).catch((err)=>{
          toast.error(err.errMessage)
          dispatch(removeUserFavPostFails(err))
        })
  }

  const openShowPostModalHandler = () => {
    setOpenShowModal(false);
    setOpenShowModalIndex(null)
  }

  return (
    <div className="save-post-section">
      {
        userFavPostAndReel?.length === 0 && <EmptyPost name={"Save Photos & Reels"} />
      }
      {
        userFavPostAndReel.length > 0 && userFavPostAndReel.map((post, i) => (
          <div key={i} className="save-post">
            <div onClick={() => { setOpenShowModal(true); setOpenShowModalIndex(i) }}>
              {
                post?.postImgUrl !== null && <img src={post?.postImgUrl} alt="" />
              }
              {
                post?.postReelUrl !== null && <video src={post?.postReelUrl} />
              }

            </div>
            <button onClick={() => removeFeedFromFavHandler(post?.id)}>x</button>
            {
              (openShowModal && openShowModalIndex === i) &&
              <PostShowsModal
                open={openShowModal}
                closeUserPostShowModal={openShowPostModalHandler}
                postId={post.id}
              />
            }
          </div>
        ))
      }

    </div>
  )
}

export default SavedPostSection