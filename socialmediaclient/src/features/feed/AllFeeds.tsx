
import { useState, useEffect } from 'react'
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { userPostProps, userProps } from '../../vite-env';
import { getAllFeedFails, getAllFeedRequest, getAllFeedSuccess, likeOrUnLikeRequest, likeOrUnlikedFails, likeOrUnlikedSuccess } from './feedSlice';
import { getAllFeed, likeOrUnlikeFeed } from '../../services/feedService';
import { toast } from 'react-toastify';


interface allFeedProps {
    feed: {
        isLoading: boolean
        allFeed: userPostProps[]
    }
}

interface userAuthProps {
    auth: {
        user: userProps
    }
}

const AllFeeds = () => {

    const { isLoading, allFeed } = useSelector((state: allFeedProps) => state.feed)
    const { user } = useSelector((state: userAuthProps) => state.auth)
    const dispatch = useDispatch()

    const [isOpenActionPostModal, setIsOpenActionPostModal] = useState<boolean>(false)
    const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null)
   

    useEffect(() => {
        dispatch(getAllFeedRequest())
        getAllFeed().then((res) => {
            dispatch(getAllFeedSuccess(res?.data))
        }).then((err) => {
            dispatch(getAllFeedFails(err));
        })
    }, [dispatch])

    const checkedUserLikedOrUnlikedPost = (userId: string, post: userPostProps): boolean => {
        return post.postLiked.some(u => u.id === userId)
    }

    const likedAndUnlikedPostHandler = (postId: string) => {
        dispatch(likeOrUnLikeRequest())
        likeOrUnlikeFeed(postId, user?.id).then((res) => {
            toast.success(res?.data?.message)
            dispatch(likeOrUnlikedSuccess(res.data.message))
            getAllFeed().then((res) => {
                dispatch(getAllFeedSuccess(res?.data))
            })
        }).catch((err) => {
            toast.error(err)
            dispatch(likeOrUnlikedFails(err))
        })
    }

    const openActionPostModelHandler = (i: number | null) => {
        setIsOpenActionPostModal((prev) => !prev)
        setActiveModalIndex(i)
    }


    return (
        <div className="post-container">
            {
                allFeed.length > 0 && allFeed?.map((post, i) => (
                    <PostCard
                        key={i}
                        isLoading={isLoading}
                        post={post}
                        isOpenActionPostModal={isOpenActionPostModal}
                        likedAndUnlikedHandler={likedAndUnlikedPostHandler}
                        openActionPostModelHandler={openActionPostModelHandler}
                        checkedUserLikedOrUnlikedPost={checkedUserLikedOrUnlikedPost}
                        activeIndex={i}
                        activeModalIndex={activeModalIndex}
                        userId={user?.id}
                        
                    />
                ))
            }
        </div>

    )

}

export default AllFeeds