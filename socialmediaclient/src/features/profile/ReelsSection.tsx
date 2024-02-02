import { useState } from 'react'
import EmptyPost from "../../ui/EmptyPost"
import UserPostShowsModal from "../../ui/PostShowsModal";
import { IoMdHeart } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { userPropsType } from '../../vite-env';
import { useSelector } from 'react-redux';
import Spinner from '../../ui/Spinner';

interface userProfileProps {
  profile: {
    isLoading: boolean
    userProfile: userPropsType
    errMessage: string
  }
}

const ReelsSection = () => {

  const { isLoading, userProfile } = useSelector((state: userProfileProps) => state.profile)
  const userReels = userProfile.userReels

  const [openPostShowModal, setOpenPostShowModal] = useState<boolean>(false);
  const [openPostModalIndex, setOpenPostModalIndex] = useState<number | null>(null);

  const closeUserPostShowModal = () => {
    setOpenPostModalIndex(null)
    setOpenPostShowModal(false);
  }


  return (
    <div className="reel-section">



      {
        isLoading && <Spinner />
      }

      {
        userReels?.length === 0 && <EmptyPost isReels={true} name={"Share Reels"} />
      }

      {
        userReels?.map((reel, i) => (
          <div>

            <div key={i} onClick={() => { setOpenPostShowModal(true); setOpenPostModalIndex(i) }}>

              <video
                src={reel?.postReelUrl}
              />

              <div>
                <span><IoMdHeart color={'white'} /> <span>{reel?.postLiked?.length}</span> </span>
                <span><FaComment color={'white'} /> <span>{reel?.userComment?.length}</span> </span>
              </div>
              <span>20k</span>

            </div>
            {
              (openPostShowModal && openPostModalIndex === i) &&
              <UserPostShowsModal
                open={openPostShowModal}
                closeUserPostShowModal={closeUserPostShowModal}
                postId={reel?.id}
              />
            }
          </div>
        ))
      }
    </div>

  )
}

export default ReelsSection