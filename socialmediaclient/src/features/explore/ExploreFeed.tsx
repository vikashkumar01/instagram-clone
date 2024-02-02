
import { useDispatch, useSelector } from "react-redux"
import { userPostProps } from "../../vite-env"
import Spinner from "../../ui/Spinner"
import { useEffect, useState } from "react"
import { getAllExploreFeedFails, getAllExploreFeedRequest, getAllExploreFeedSuccess } from "./expolreFeedSlice"
import { getAllFeed } from "../../services/feedService"
import PostShowsModal from "../../ui/PostShowsModal"


interface exploreFeedProps {
    exploreFeed: {
        isLoading: boolean,
        explorefeed: userPostProps[]
    }
}

const ExploreFeed = () => {

    const { isLoading, explorefeed } = useSelector((state: exploreFeedProps) => state.exploreFeed)
    const dispatch = useDispatch()

    const [openExploreModal, setOpenExploreModal] = useState<boolean>(false)
    const [openExploreModalIndex, setOpenExploreModalIndex] = useState<number | null>(null)

    const closeExploreModalHandler = () => {
        setOpenExploreModalIndex(null)
        setOpenExploreModal(false)
    }

    useEffect(() => {
        dispatch(getAllExploreFeedRequest())
        getAllFeed().then((res) => {
            dispatch(getAllExploreFeedSuccess(res?.data))
        }).catch((err) => {
            dispatch(getAllExploreFeedFails(err))
        })
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    if (explorefeed?.length === 0) {
        return <span>No post Found</span>
    }


    return (
        <div className="explore-feed-container">
            {
                explorefeed.length > 0 && explorefeed.map((post, i) => (
                    <>
                        <div key={i} onClick={()=>{setOpenExploreModal(true);setOpenExploreModalIndex(i)}}>
                            {
                                post?.postImgUrl !== null && <img src={post?.postImgUrl} />
                            }
                            {
                                post?.postReelUrl !== null && <video src={post?.postReelUrl} />
                            }
                        </div>
                        { 
                           (openExploreModal && openExploreModalIndex===i) &&
                            <PostShowsModal
                              open={openExploreModal}
                              closeUserPostShowModal={closeExploreModalHandler}
                              postId={post?.id}
                            />
                        }
                    </>
                ))
            }

        </div>
    )
}

export default ExploreFeed