import { Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { getAllUserStory } from '../../services/feedService'
import { userStoryProps } from '../../vite-env'
import profileImg from '../../assets/profile.png'
import { timeAgo } from '../../utils/timeConverter'

const ShowStory = ({
    isOpen,
    closeShowStoryModal,
    userId,
    createStoryOrShowStoryModalHandler,
    profileUserId }:
    {
        isOpen: boolean,
        closeShowStoryModal: () => void,
        userId: string,
        createStoryOrShowStoryModalHandler: () => void,
        profileUserId: string
    }) => {

    const [userStory, setUserStory] = useState<userStoryProps[]>([])
    const [userStoryIndex, setUserStoryIndex] = useState<number>(0)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [imgUrl, setImgUrl] = useState<string | null>(null)

    useEffect(() => {
        getAllUserStory(userId).then((res) => {

            setFirstName(res?.data?.firstName)
            setLastName(res?.data?.lastName)
            setImgUrl(res?.data?.imgUrl)
            setUserStory(res?.data?.userStoryList)

        })
    }, [userId])


    useEffect(() => {
        if (userStoryIndex === userStory.length) {
            closeShowStoryModal()
            if (profileUserId === userId) {
                createStoryOrShowStoryModalHandler()
            }
        }
        const timeout = setTimeout(() => {
            setUserStoryIndex((prev) => prev + 1)
        }, 5000)

        return () => clearTimeout(timeout);
    }, [closeShowStoryModal,
        userStory.length,
        userStoryIndex,
        createStoryOrShowStoryModalHandler,
        profileUserId, userId])



    return (

        <Modal
            open={isOpen}
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
                        <img src={imgUrl != null ? imgUrl : profileImg} alt="" />
                        <div>
                            <span>{firstName} {lastName}</span>
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
                <button onClick={closeShowStoryModal}>x</button>
                <span>Instagram</span>
            </div>
        </Modal >
    )
}

export default ShowStory