
import { useEffect, useRef, useState } from 'react'
import { Modal } from "@mui/material"
import { FaRegHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import CommentModal from './CommentModal';
import { BsEmojiSmile } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

import PostModalAction from './PostModalAction';

import { useDispatch, useSelector } from 'react-redux';

import profile from '../assets/profile.png'

import { userPostProps, userPropsType } from '../vite-env';
import {
    createCommentOfFeedRequest,
    createCommentOfFeedSuccess,
    getAllFeedSuccess,
    getFeedByIdFails,
    getFeedByIdRequest,
    getFeedByIdSuccess,
    likeOrUnLikeRequest,
    likeOrUnlikedCommentFails,
    likeOrUnlikedCommentRequest,
    likeOrUnlikedCommentSuccess,
    likeOrUnlikedSuccess
} from '../features/feed/feedSlice';
import {
    commentOnPost,
    getAllFeed,
    getAllReels,
    getPostById,
    likeOrUnlikeCommentOnPost,
    likeOrUnlikeFeed
} from '../services/feedService';
import { toast } from 'react-toastify';
import { timeAgo } from '../utils/timeConverter';
import Spinner from './Spinner';
import { getAllReelsSuccess } from '../features/reels/userReelSlice';


interface singlePostProps {
    feed: {
        isLoading: boolean,
        singlePost: userPostProps
    }
}


interface userAuthProps {
    auth: {
        user: userPropsType
    }
}

const PostShowsModal = (
    { open, closeUserPostShowModal, postId }:
        { open: boolean, closeUserPostShowModal: () => void, postId: string }
) => {

    const { isLoading, singlePost } = useSelector((state: singlePostProps) => state.feed)
    const { user } = useSelector((state: userAuthProps) => state.auth)
    const dispatch = useDispatch();

    const [openCommentModel, setOpenCommentModal] = useState<boolean>(false);
    const [openPostModalActions, setOpenPostModalActions] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [commentActiveModal, setCommentActiveModal] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const openUserCommentModelHandler = () => {
        setOpenCommentModal((prev) => !prev)
    }

    useEffect(() => {
        dispatch(getFeedByIdRequest())
        getPostById(postId).then((res) => {
            dispatch(getFeedByIdSuccess(res?.data?.post))
        }).catch((err) => {
            toast.error(err)
            dispatch(getFeedByIdFails(err))
        })
    }, [dispatch, postId])

    const likedOrUnlikedPostHandler = () => {
        dispatch(likeOrUnLikeRequest())
        likeOrUnlikeFeed(singlePost?.id, user?.id).then((res) => {
            toast.success(res?.data?.message)
            dispatch(likeOrUnlikedSuccess(res?.data?.messge))
            getPostById(postId).then((res) => {
                dispatch(getFeedByIdSuccess(res?.data?.post))
            })
            getAllFeed().then((res) => {
                dispatch(getAllFeedSuccess(res?.data))
            })
        }).catch((err) => {
            toast.error(err)
        })
    }

    useEffect(() => {
        const u = singlePost?.postLiked?.find(p => p?.id === user?.id)
        if (u) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
    }, [singlePost, user])


    const checkedUserLikedOrUnlikedComment = (commentId: string): boolean => {

        let likedComment: boolean = false;
        singlePost?.userComment.forEach((comment) => {
            if (comment?.id === commentId) {
                const isExist = comment?.userLikedComment.find(u => u?.id === user?.id)
                likedComment = isExist ? true : false
            }
        })
        return likedComment
    }

    const commentHandler = () => {
        dispatch(createCommentOfFeedRequest())
        commentOnPost(singlePost?.id, user?.id, comment).then((res) => {
            toast.success(res?.data?.message)
            dispatch((createCommentOfFeedSuccess(res?.data?.message)))
            getPostById(postId).then((res) => {
                dispatch(getFeedByIdSuccess(res?.data?.post))
            })
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

    const likeOrUnlikeCommentHandler = (commentId: string) => {
        dispatch(likeOrUnlikedCommentRequest())
        likeOrUnlikeCommentOnPost(user?.id, commentId).then((res) => {
            toast.success(res?.data?.message)
            dispatch(likeOrUnlikedCommentSuccess(res?.data?.message))
            getPostById(postId).then((res) => {
                dispatch(getFeedByIdSuccess(res?.data?.post))
            })
            getAllFeed().then((res) => {
                dispatch(getAllFeedSuccess(res?.data))
            })
        }).catch((err) => {
            toast.error(err)
            dispatch(likeOrUnlikedCommentFails(err))
        })
    }


    const commentFocusHandler = () => {
        inputRef.current && inputRef?.current?.focus();
    }

    const openAndCloseModalActionHandler = () => {
        setOpenPostModalActions((prev) => !prev)
    }

    const goToProfileHandler = (userId: string) => {

        user?.id === userId ? window.location.href = "/profile" :
            window.location.href = `/profile/${userId}`

    }


    return (
        <Modal
            open={open}
            onClose={closeUserPostShowModal}

        >
            <div className="user-post-modal">
                <div>
                    {
                        singlePost?.postImgUrl && <img src={singlePost?.postImgUrl} alt="" />
                    }
                    {
                        singlePost?.postReelUrl && <video src={singlePost?.postReelUrl} autoPlay  loop/>
                    }
                </div>
                <div>
                    <div>
                        <div>
                            <img onClick={() => goToProfileHandler(singlePost?.user?.id)} src={singlePost?.user?.profileImgUrl !== null ? singlePost?.user?.profileImgUrl : profile} alt="" />
                            <h1 onClick={() => goToProfileHandler(singlePost?.user?.id)} >{singlePost?.user?.firstName} {singlePost?.user?.lastName}</h1>
                        </div>
                        <button onClick={openAndCloseModalActionHandler}><BsThreeDots /></button>
                        {
                            openPostModalActions && <PostModalAction
                                open={openPostModalActions}
                                openAndCloseModalActionHandler={openAndCloseModalActionHandler}
                                postId={postId}
                                postUserId={singlePost?.user?.id}
                            />
                        }
                    </div>
                    <div>
                        <div>
                            <div>
                                <img onClick={() => goToProfileHandler(singlePost?.user?.id)}  src={singlePost?.user?.profileImgUrl !== null ? singlePost?.user?.profileImgUrl : profile} alt="" />
                            </div>
                            <div>
                                <p>
                                    <span onClick={() => goToProfileHandler(singlePost?.user?.id)} >{singlePost?.user?.firstName} {singlePost?.user?.lastName}</span> {singlePost?.postDesc}
                                </p>

                            </div>
                        </div>

                        <div>
                            <span>{timeAgo(singlePost?.createdAt)}</span>
                        </div>

                        <div>
                            {
                                singlePost?.userComment?.map((postC, i) => (
                                    <div key={i}>

                                        <div>
                                            <img onClick={() => goToProfileHandler(singlePost?.user?.id)}  src={postC?.userId?.profileImgUrl != null ? postC?.userId?.profileImgUrl : profile} alt="" />
                                        </div>

                                        <div>
                                            <p>
                                                <span onClick={() => goToProfileHandler(singlePost?.user?.id)} >{postC?.userId?.firstName} {postC?.userId?.lastName}</span> {postC?.message}
                                            </p>
                                            <div>
                                                <span>{timeAgo(postC?.createdAt)}</span>
                                                <span>{postC?.userLikedComment?.length} like</span>
                                                <button>Reply</button>
                                                <button onClick={() => { openUserCommentModelHandler(); setCommentActiveModal(i) }}><BsThreeDots /></button>
                                                {
                                                    (openCommentModel && commentActiveModal === i) &&
                                                    <CommentModal
                                                        openCommentModel={openCommentModel}
                                                        openUserCommentModelHandler={openUserCommentModelHandler}
                                                        commentId={postC?.id}
                                                        postId={postId}
                                                    />
                                                }

                                            </div>
                                        </div>

                                        <div>
                                            <button onClick={() => likeOrUnlikeCommentHandler(postC?.id)}>
                                                {
                                                    checkedUserLikedOrUnlikedComment(postC?.id) ? <FaHeart color={"red"} size={18} /> : <FaRegHeart size={18} color={'black'} />
                                                }
                                            </button>
                                        </div>
                                    </div>

                                ))
                            }

                        </div>

                    </div>

                    <div>
                        <div>
                            <div>
                                <button onClick={likedOrUnlikedPostHandler}>
                                    {
                                        isLiked ? <FaHeart color={"red"} size={24} /> : <CiHeart size={24} color={"black"} />
                                    }
                                </button>
                                <button onClick={commentFocusHandler}>
                                    <FaRegComment size={22} color="black" />
                                </button>
                            </div>


                        </div>
                        <div>
                            <span>{singlePost?.postLiked?.length} Like</span>
                            <span>{timeAgo(singlePost?.createdAt)}</span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <BsEmojiSmile />
                            <input type="text"
                                ref={inputRef}
                                value={comment}
                                placeholder='Enter the comment'
                                onChange={(e) => setComment(e.target.value)} />
                        </div>

                        <button onClick={commentHandler}>{isLoading ? <Spinner /> : "Post"}</button>
                    </div>

                </div>

            </div>


        </Modal>

    )
}

export default PostShowsModal