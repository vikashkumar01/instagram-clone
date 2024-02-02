
import { FaRegHeart } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { userPostProps, userProps } from '../../vite-env';
import { useEffect, useState } from 'react';
import { getAllReelsFails, getAllReelsRequest, getAllReelsSuccess } from './userReelSlice';
import { getAllFeed, getAllReels, likeOrUnlikeFeed } from '../../services/feedService';
import Spinner from "../../ui/Spinner";
import profileImg from "../../assets/profile.png"
import PostShowsModal from "../../ui/PostShowsModal";
import { getAllFeedSuccess, likeOrUnLikeRequest, likeOrUnlikedSuccess } from "../feed/feedSlice";
import { toast } from "react-toastify";



interface userReelsProps {
    reels: {
        isLoading: true,
        reel: userPostProps[]
    }
}

interface authProps {
    auth: {
        user: userProps
    }
}

const UserReels = () => {

    const { user } = useSelector((state: authProps) => state.auth)
    const { isLoading, reel } = useSelector((state: userReelsProps) => state.reels)
    const dispatch = useDispatch()
    const [openPostShowModal, setOpenPostShowModal] = useState<boolean>(false)
    const [openPostShowModalIndex, setOpenPostShowModalIndex] = useState<number | null>(null)


    useEffect(() => {
        dispatch(getAllReelsRequest())
        getAllReels().then((res) => {
            dispatch(getAllReelsSuccess(res.data))
        }).catch((err) => {
            dispatch(getAllReelsFails(err))
        })
    }, [dispatch])

    const likeOrUnlikePostHandler = (reelId: string) => {
        dispatch(likeOrUnLikeRequest())
        likeOrUnlikeFeed(reelId, user?.id).then((res) => {
            toast.success(res?.data?.message)
            dispatch(likeOrUnlikedSuccess(res?.data?.messge))
            getAllFeed().then((res) => {
                dispatch(getAllFeedSuccess(res?.data))
            })
            getAllReels().then((res) => {
                dispatch(getAllReelsSuccess(res.data))
            })
        }).catch((err) => {
            toast.error(err)
        })
    }

    const checkedUserLikedOrUnlikedPost = (reel: userPostProps): boolean => {
        return reel.postLiked.some(u => u.id === user?.id)
    }

    const openPostShowModalHandler = () => {
        setOpenPostShowModal((prev) => !prev)
        setOpenPostShowModalIndex(null)
    }

    const openProfileHandler = (userId:string) =>{
        (user?.id===userId)?
        window.location.href="/profile":
        window.location.href=`/profile/${userId}`
    }

    return (
        <div className="user-reels">
            {
                isLoading && <Spinner />
            }
            {
                reel?.length === 0 && <span>no reel found</span>
            }
            {
                reel?.length > 0 && reel.map((userreel, i) => (
                    <>
                        <div key={i} >
                            <video src={userreel?.postReelUrl} autoPlay loop />
                            <div>
                                {
                                    checkedUserLikedOrUnlikedPost(userreel) ?
                                        <div onClick={() => { likeOrUnlikePostHandler(userreel?.id) }}>
                                            <FaHeart size={22} color={"red"} />
                                            <span>{userreel?.postLiked?.length}</span>
                                        </div>
                                        : <div onClick={() => { likeOrUnlikePostHandler(userreel?.id) }}>
                                            <FaRegHeart size={22} color={"white"} />
                                            <span>{userreel?.postLiked?.length}</span>
                                        </div>
                                }



                                <div onClick={() => { openPostShowModalHandler(); setOpenPostShowModalIndex(i) }}>
                                    <LuMessageCircle size={22} color={"white"} />
                                    <span>{userreel?.userComment?.length}</span>
                                </div>
                            </div>
                            <div onClick={()=>openProfileHandler(userreel?.user?.id)}>
                                <img src={userreel?.user?.profileImgUrl != null ? userreel?.user?.profileImgUrl : profileImg} alt="" />
                                <span>{userreel?.user.firstName} {userreel?.user?.lastName}</span>
                            </div>
                        </div>
                        {
                            (openPostShowModal && openPostShowModalIndex === i) &&
                            <PostShowsModal
                                open={openPostShowModal}
                                closeUserPostShowModal={openPostShowModalHandler}
                                postId={userreel?.id}
                            />
                        }
                    </>
                ))
            }
        </div>
    )
}

export default UserReels