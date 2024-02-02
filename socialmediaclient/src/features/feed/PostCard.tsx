
import { useRef, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { TbFileArrowRight } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import { userPostProps, userProps } from "../../vite-env";
import profileImg from '../../assets/profile.png'
import PostModalAction from "../../ui/PostModalAction";
import Spinner from "../../ui/Spinner";
import PostShowsModal from '../../ui/PostShowsModal';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentOfFeedRequest, createCommentOfFeedSuccess, getAllFeedSuccess } from './feedSlice';
import { commentOnPost, getAllFeed } from '../../services/feedService';
import { toast } from 'react-toastify';
import { getUserProfileSuccess, savePostInFavFails, savePostInFavRequest, savePostInFavSuccess } from '../profile/profileSlice';
import { getProfile, saveFeedInUserFav } from "../../services/profileService"

interface props {
    isLoading: boolean
    post: userPostProps
    isOpenActionPostModal: boolean,
    likedAndUnlikedHandler: (postId: string) => void,
    openActionPostModelHandler: (i: number | null) => void,
    activeIndex: number,
    activeModalIndex: number | null,
    checkedUserLikedOrUnlikedPost: (postId: string, post: userPostProps) => boolean,
    userId: string
}

interface authProps {
    auth: {
        user: userProps
    }
}

const PostCard: React.FC<props> = (
    {
        isLoading,
        post,
        isOpenActionPostModal,
        likedAndUnlikedHandler,
        openActionPostModelHandler,
        activeIndex,
        activeModalIndex,
        checkedUserLikedOrUnlikedPost,
        userId

    }) => {

    const { user } = useSelector((state: authProps) => state.auth)
    const dispatch = useDispatch()

    const [comment, setComment] = useState<string>('')
    const inputRef1 = useRef<HTMLInputElement | null>(null)
    const [openCommentModal, setOpenCommentModal] = useState<boolean>(false)


    const openAndCloseModalCommentHandler = () => {
        setOpenCommentModal((prev) => !prev)
    }

    const commentHandler = () => {
        dispatch(createCommentOfFeedRequest())
        commentOnPost(post?.id, userId, comment).then((res) => {
            toast.success(res?.data?.message)
            dispatch((createCommentOfFeedSuccess(res?.data?.message)))
            getAllFeed().then((res) => {
                dispatch(getAllFeedSuccess(res?.data))
            })
            setComment("")
        }).catch((err) => {
            toast.error(err)
        })
    }

    const saveFeedInFav = (postId: string, userId: string) => {
        if (userId === user?.id) {
            toast.error("can't save your own feed")
            return
        }
        dispatch(savePostInFavRequest())
        saveFeedInUserFav(user?.id, postId).then((res) => {
            toast.success(res.data.message)
            dispatch(savePostInFavSuccess(res.data.message))
            getProfile(user?.id).then((res) => {
                dispatch(getUserProfileSuccess(res.data.user))
            })
        }).catch((err) => {
            toast.error(err.errMessage)
            dispatch(savePostInFavFails(err))
        })
    }

    const goToProfileHandler = (userId:string) =>{
         user?.id===userId?window.location.href='/profile':
          window.location.href = `/profile/${userId}`
    }

    return (
        <div>
            <div>
                <div >

                    <img onClick={()=>goToProfileHandler(post?.user?.id)} src={post?.user?.profileImgUrl !== null ? post?.user?.profileImgUrl : profileImg} alt="" />
                    <div>
                        <span onClick={()=>goToProfileHandler(post?.user?.id)}>{post?.user?.firstName} {post?.user?.lastName} </span>
                        <span>unkown</span>
                    </div>

                </div>
                <div>
                    <button onClick={() => openActionPostModelHandler(activeIndex)}>
                        {isLoading ? <Spinner /> : <BsThreeDots size={22} color={'grey'} />}
                    </button>
                    {
                        (isOpenActionPostModal && activeModalIndex === activeIndex) &&
                        <PostModalAction postId={post?.id}
                            open={isOpenActionPostModal}
                            openAndCloseModalActionHandler={() => openActionPostModelHandler(null)}
                            postUserId={post?.user?.id}
                        />
                    }

                </div>

            </div>
            <div>
                {
                    post?.postReelUrl !== null && <video src={post?.postReelUrl} autoPlay loop />
                }
                {
                    post?.postImgUrl !== null && <img src={post?.postImgUrl} alt="" />
                }

            </div>
            <div>
                <div>
                    <button onClick={() => likedAndUnlikedHandler(post?.id)}>
                        {
                            checkedUserLikedOrUnlikedPost(post?.user?.id, post) ? <FaHeart color={"red"} size={24} /> : <CiHeart size={24} color={"black"} />
                        }
                    </button>
                    <button onClick={openAndCloseModalCommentHandler}>
                        <FaRegComment size={22} color="black" />
                    </button>
                </div>

                <div>
                    <button onClick={() => saveFeedInFav(post?.id, post?.user?.id)}>
                        <TbFileArrowRight size={24} />
                    </button>

                </div>
            </div>
            <div>
                <span>{post?.postLiked?.length} like</span>
                <div>
                    <button onClick={()=>goToProfileHandler(post?.user?.id)}>{post?.user?.firstName} {post?.user?.lastName}</button>
                    <p>{post?.postTitle}</p>
                </div>
                <button onClick={openAndCloseModalCommentHandler}>
                    View all {post?.userComment?.length} comments
                </button>
                {
                    openCommentModal && <PostShowsModal
                        open={openCommentModal}
                        closeUserPostShowModal={openAndCloseModalCommentHandler}
                        postId={post?.id}

                    />
                }
            </div>

            <div>
                <input
                    ref={inputRef1}
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add comment"

                />
                <button onClick={commentHandler}>{isLoading ? <Spinner /> : <IoMdSend size={24} color={'grey'} />}</button>
            </div>
        </div>
    )
}

export default PostCard