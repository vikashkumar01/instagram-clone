import { useState, useEffect } from 'react'
import { Modal } from '@mui/material'
import { useSelector } from 'react-redux'
import { userHighlightProps, userPropsType, userStoryProps } from '../../vite-env'
import profileImg from '../../assets/profile.png'
import { timeAgo } from '../../utils/timeConverter'

interface Iprofile {
  profile: {
    userProfile: userPropsType
  }
}

const ShowHighlightStory = ({
  showHighlightStory,
  showHighlightStoryHandler,
  highlightId }: {
    showHighlightStory: boolean,
    showHighlightStoryHandler: () => void,
    highlightId: string
  }) => {

  const { userProfile } = useSelector((state: Iprofile) => state.profile)
  const highlightList: userHighlightProps[] = userProfile?.userHighlight

  const [userStory, setUserStory] = useState<userStoryProps[]>([])
  const [userStoryIndex, setUserStoryIndex] = useState<number>(0)

  useEffect(() => {
    let highlightStory: userStoryProps[] = []
    highlightList.forEach((h) => {
      if (h.id === highlightId) {
        highlightStory = h.storyHighlight
      }
    })
    setUserStory([...highlightStory])
  }, [highlightId, highlightList])

  useEffect(() => {
    if (userStoryIndex === userStory.length) {
      showHighlightStoryHandler()
    }
    const timeout = setTimeout(() => {
      setUserStoryIndex((prev) => prev + 1)
    }, 5000)

    return () => clearTimeout(timeout);
  }, [
    showHighlightStoryHandler,
    userStory.length,
    userStoryIndex,
  ])

  return (
    <Modal
      open={showHighlightStory}
    >
      <div className='show-story-container'>
        <div className="user-story">
          <div className='bar-container'>
            {
              userStory.map((_, i) => (
                <div
                  key={i}
                  className='bar'
                  style={{
                    width: `calc((100% / ${userStory.length}) - 0.4rem)`,
                    backgroundColor: userStoryIndex === i ? 'red' : undefined,
                  }}>

                </div>
              ))
            }
          </div>
          <div className='user-story-profile'>
            <img src={userProfile.profileImgUrl != null ? userProfile?.profileImgUrl : profileImg} alt="" />
            <div>
              <span>{userProfile?.firstName} {userProfile?.lastName}</span>
              {
                userStory[userStoryIndex]?.createdAt != null &&
                <span>{timeAgo(userStory[userStoryIndex]?.createdAt)}</span>
              }

            </div>
          </div>

          {
            userStory[userStoryIndex]?.imgUrl != null ? <img src={userStory[userStoryIndex]?.imgUrl} /> :
              <video src={userStory[userStoryIndex]?.videoUrl} autoPlay loop />
          }

        </div>
        <button onClick={showHighlightStoryHandler}>x</button>
        <span>Instagram</span>
      </div>
    </Modal>
  )
}

export default ShowHighlightStory