import { useEffect, useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";
import profileImg from '../../assets/profile.png'
import { userProps, userPropsType } from '../../vite-env';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserHavingStoryFails, getAllUserOfHavingStroyRequest, getAllUserOfHavingStroySuccess } from './feedSlice';
import { getAllUserHavingStory } from '../../services/feedService';
import ShowStory from './ShowStory';
import { getProfile } from '../../services/profileService';
import { getUserProfileSuccess } from '../profile/profileSlice';
import CreateStoryModal from './CreateStoryModal';
import CreateStoryOrShowStoryModal from './CreateStoryOrShowStoryModal';


interface authProps {
  auth: {
    user: userProps
  }
}

interface userProfileProps {
  profile: {
    userProfile: userPropsType
  }
}

interface storyProps {
  feed: {
    userStory: userPropsType[]
  }
}


const Story = () => {

  const { user } = useSelector((state: authProps) => state.auth)
  const { userProfile } = useSelector((state: userProfileProps) => state.profile)
  const { userStory } = useSelector((state: storyProps) => state.feed)
  const dispatch = useDispatch()


  const [showStoryModal, setShowStoryModal] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [createStoryOrShowStoryModal, setCreateStoryOrShowStoryModal] = useState<boolean>(false)
  const [createStoryModal, setCreateStoryModal] = useState<boolean>(false)

  const userProfileStory = userProfile?.userStory

  const showStoryModalHandler = () => {
    setShowStoryModal((prev) => !prev)
  }

  const createStoryOrShowStoryModalHandler = () => {
    setCreateStoryOrShowStoryModal((prev) => !prev)
  }

  const createStoryModalHandler = () => {
    setCreateStoryModal((prev) => !prev)

  }

  useEffect(() => {
    dispatch(getAllUserOfHavingStroyRequest())
    getAllUserHavingStory(user?.id).then((res) => {
      dispatch(getAllUserOfHavingStroySuccess(res.data))
      getProfile(user?.id).then((res) => {
        dispatch(getUserProfileSuccess(res.data.user))
      })
    }).catch((err) => {
      dispatch(getAllUserHavingStoryFails(err.errMessage))
    })
  }, [dispatch, user?.id])


  return (
    <div className='story-container'>

      <div className='add-story'>

        {
          userProfileStory?.length > 0 &&
          <button onClick={createStoryOrShowStoryModalHandler}>
            <img src={user?.profileImgUrl != null ? user?.profileImgUrl : profileImg} alt="" />
          </button>
        }
        {
          userProfileStory?.length === 0 &&
          <button onClick={createStoryModalHandler}>
            <img src={user?.profileImgUrl != null ? user?.profileImgUrl : profileImg} alt="" />
            <IoIosAddCircle className="story-icon" color={"#1D9AEE"} />
          </button>
        }

        <span>Your Story</span>
      </div>

      <div className='story'>
        {
          userStory?.length > 0 && userStory.map((userS, i) => (

            <button onClick={() => { showStoryModalHandler(); setUserId(userS?.id) }} key={i} >
              <img src={userS?.profileImgUrl != null ? userS?.profileImgUrl : profileImg} />
              <span>{userS?.firstName}...</span>
            </button>


          ))
        }
      </div>
      {
        showStoryModal &&
        <ShowStory isOpen={showStoryModal}
          closeShowStoryModal={showStoryModalHandler}
          createStoryOrShowStoryModalHandler={createStoryOrShowStoryModalHandler}
          userId={userId}
          profileUserId={user?.id}
        />
      }

      {
        createStoryOrShowStoryModal &&
        <CreateStoryOrShowStoryModal
          createStoryOrShowStoryModal={createStoryOrShowStoryModal}
          createStoryModalHandler={createStoryModalHandler}
          showStoryModalHandler={showStoryModalHandler}
          createStoryOrShowStoryModalHandler={createStoryOrShowStoryModalHandler}
          setUserId={setUserId}
          userId={user?.id}
        />
      }
      {
        createStoryModal &&
        <CreateStoryModal
          open={createStoryModal}
          onCloseModalHandler={createStoryModalHandler}
        />
      }
    </div>
  )
}

export default Story