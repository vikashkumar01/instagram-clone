import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { userPostProps, userProps } from "../../vite-env"
import { getAllFeedSuccess, getFeedByIdFails, getFeedByIdRequest, getFeedByIdSuccess, updateFeedFails, updateFeedImageOrVideoFails, updateFeedImageOrVideoRequest, updateFeedImageOrVideoSuccess, updateFeedRequest, updateFeedSuccess } from "./feedSlice"
import { changePostImageOrVideo, getAllFeed, getPostById, updatePost } from "../../services/feedService"
import { toast } from "react-toastify"
import Spinner from "../../ui/Spinner"
import { getProfile } from "../../services/profileService"
import { getUserProfileSuccess } from "../profile/profileSlice"

interface updateFeedProps {
    feed: {
        singlePost: userPostProps,
        isLoading: boolean
    }
}

interface authProps {
    auth: {
        user: userProps
    }
}

const UpdateFeed = () => {

    const { isLoading } = useSelector((state: updateFeedProps) => state.feed)
    const { user } = useSelector((state: authProps) => state.auth)
    const dispatch = useDispatch()
    const { feedId } = useParams()

    const [updateOption, setUpdateOption] = useState<number | null>(0)
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [imageOrVideoPrev, setImageOrVideoPrev] = useState<string>('')
    const [isImage, setImage] = useState<boolean>(false)
    const [postFile, setPostFile] = useState<File | null>(null)

    useEffect(() => {
        dispatch(getFeedByIdRequest())
        getPostById(feedId!).then((res) => {
            dispatch(getFeedByIdSuccess(res.data.post))
            setTitle(res?.data?.post?.postTitle)
            setDesc(res?.data?.post?.postDesc)
            setImageOrVideoPrev(res?.data?.post?.postImgUrl !== null ?
                res?.data?.post?.postImgUrl : res?.data?.post?.postReelUrl)
            res?.data?.post?.postImgUrl !== null ? setImage(true) : setImage(false)
        }).catch((err) => {
            dispatch(getFeedByIdFails(err.errMessage))
        })
    }, [feedId, dispatch])

    const updateFeedHandler = () => {
        dispatch(updateFeedRequest())
        updatePost(feedId!, title, desc).then((res) => {
            toast.success(res.data.message)
            dispatch(updateFeedSuccess(res.data.message))
            getAllFeed().then((res) => {
                dispatch(getAllFeedSuccess(res?.data))
            })
            getProfile(user?.id).then((res) => {
                dispatch(getUserProfileSuccess(res?.data?.user))
            })
        }).catch((err) => {
            toast.error(err.message)
            dispatch(updateFeedFails(err.message))
        })

    }

    const selectFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (!file?.type.startsWith('image/') && !file?.type.startsWith('video/')) {
            toast.error('unsupported file type')
        }

        if (file) {
            setPostFile(file);
        }
    }

    const updateFileHandler = () => {

        const formData = new FormData()
        if (postFile != null) {
            formData.append("imageOrVideo", postFile)
        }
        dispatch(updateFeedImageOrVideoRequest())
        changePostImageOrVideo(feedId!, formData).then((res) => {
            toast.success(res?.data?.message)
            dispatch(updateFeedImageOrVideoSuccess(res?.data?.message))
            getAllFeed().then((res) => {
                dispatch(getAllFeedSuccess(res?.data))
            })
            getProfile(user?.id).then((res) => {
                dispatch(getUserProfileSuccess(res?.data?.user))
            })
            getPostById(feedId!).then((res) => {
                dispatch(getFeedByIdSuccess(res.data.post))
                setTitle(res?.data?.post?.postTitle)
                setDesc(res?.data?.post?.postDesc)
                setImageOrVideoPrev(res?.data?.post?.postImgUrl !== null ?
                    res?.data?.post?.postImgUrl : res?.data?.post?.postReelUrl)
                res?.data?.post?.postImgUrl !== null ? setImage(true) : setImage(false)
            })
        }).catch((err) => {
            toast.success(err.errMessage)
            dispatch(updateFeedImageOrVideoFails(err.errMessage))
        })

    }

    return (
        <div className="update-feed-container">
            <div className="feed-header">
                <span>update feed</span>
                <div>
                    <button className={updateOption === 0 ? 'active-btn' : undefined} onClick={() => setUpdateOption(0)}>Update ImageOrVideo</button>
                    <button className={updateOption === 1 ? 'active-btn' : undefined} onClick={() => setUpdateOption(1)}>Update TitleOrDesc</button>
                </div>
            </div>
            <div className="title-and-description-container">
                {
                    updateOption === 0 ?
                        <>
                            <div>
                                {isImage ?
                                    <img src={imageOrVideoPrev} alt="not_found" /> :
                                    <video src={imageOrVideoPrev} autoPlay loop />
                                }
                                <label className="label-file">
                                    <input type="file" onChange={selectFileHandler} />
                                    Select Image Or Video
                                </label>
                                <button disabled={isLoading} className="file-btn" onClick={updateFileHandler}>
                                    {isLoading ? <Spinner color={'white'} /> : "Update"}
                                </button>
                            </div>

                        </> :
                        updateOption === 1 ?
                            <>
                                <div>
                                    <label htmlFor="">Title</label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="">Description</label>
                                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
                                </div>

                                <div>
                                    <button disabled={isLoading} onClick={updateFeedHandler}>
                                        {
                                            isLoading ? <Spinner color="white" /> : "update"
                                        }
                                    </button>
                                </div>
                            </> : null
                }

            </div>

        </div >
    )
}

export default UpdateFeed