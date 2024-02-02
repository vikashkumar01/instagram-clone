import { useState } from "react";
import EmptyPost from "../../ui/EmptyPost"
import { IoMdHeart } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import UserPostShowsModal from "../../ui/PostShowsModal";
import { userPropsType } from "../../vite-env";
import { useSelector } from 'react-redux'
import Spinner from "../../ui/Spinner";


interface userProfileProps {
  profile: {
    isLoading: boolean
    userProfile: userPropsType
    errMessage: string
  }
}

const PostSection = () => {

  const { isLoading, userProfile } = useSelector((state: userProfileProps) => state.profile)
  const userPosts = userProfile?.userPost

  const [openPostShowModal, setOpenPostShowModal] = useState<boolean>(false);
  const [openPostModalIndex, setOpenPostModalIndex] = useState<number | null>(null);

  const closeUserPostShowModal = () => {
    setOpenPostModalIndex(null);
    setOpenPostShowModal(false);

  }

  return (
    <div className="post-section" >

      {
        isLoading && <Spinner />
      }

      {
        userPosts?.length === 0 && <EmptyPost name="Photos" />
      }

      {
        userPosts?.map((post, i) => (
          <div key={i}>
            <div  onClick={() => { setOpenPostShowModal(true); setOpenPostModalIndex(i) }}>
              <img src={post?.postImgUrl} />
              <div>
                <span><IoMdHeart color={'white'} /> <span>{post?.postLiked?.length}</span> </span>
                <span><FaComment color={'white'} /> <span>{post?.userComment?.length}</span> </span>
              </div>

            </div>
            {
              (openPostShowModal && openPostModalIndex === i) &&
              <UserPostShowsModal
                open={openPostShowModal}
                closeUserPostShowModal={closeUserPostShowModal}
                postId={post?.id}
              />
            }
          </div>
        ))
      }
    </div>
  )
}

export default PostSection