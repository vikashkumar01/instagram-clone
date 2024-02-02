import { Modal } from "@mui/material"
import { useState } from 'react'
import { IoImagesSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createFeedFails, createFeedRequest, createFeedSuccess,getAllFeedSuccess } from './feedSlice';
import { createUserFeed, getAllFeed } from '../../services/feedService';
import { userPropsType } from '../../vite-env';
import { toast } from 'react-toastify';
import Spinner from "../../ui/Spinner";
import { getProfile } from "../../services/profileService";
import { getUserProfileSuccess } from "../profile/profileSlice";


interface props {
    createPostModal: boolean,
    createPostModalHandler: () => void
}

interface feedPropsType {
    feed: {
        isLoading: boolean,
        successMessage: string,
        errMessage: string
    }
}

interface userProfilePropsType {
    auth: {
        user: userPropsType
    }
}

const CreatePost: React.FC<props> = ({ createPostModal, createPostModalHandler }) => {

    const dispatch = useDispatch()
    const { isLoading } = useSelector((state: feedPropsType) => state.feed)
    const { user } = useSelector((state: userProfilePropsType) => state.auth)

    const [postFile, setPostFile] = useState<File | null>(null)
    const [isImage, setIsImage] = useState<boolean>();
    const [imgOrVideoPrev, setImgVideoPrev] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [postRoute, setPostRoute] = useState<number>(0)

    const postFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file?.type.startsWith('image/')) {
            setIsImage(true)
        } else if (file?.type.startsWith('video/')) {
            setIsImage(false)
        } else {
            console.log('unsupported file')
        }

        if (file) {
            setPostFile(file);
            const reader: FileReader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImgVideoPrev(reader.result as string);
            };

        }
        setPostRoute(1)
    }

    const postFeedNextHandler = () => {
        setPostRoute(2)
    }

    const postFeedHandler = () => {
        dispatch(createFeedRequest())
        const formData = new FormData()
        if (postFile != null) {
            formData.append("file", postFile)
            formData.append("postTitle", title)
            formData.append("postDesc", desc)
        }

        createUserFeed(user?.id, formData).then((res) => {
            dispatch(createFeedSuccess(res.data.message))
            toast.success(res.data.message)
            getProfile(user?.id).then((res)=>{
                dispatch(getUserProfileSuccess(res?.data?.user))
            })
            getAllFeed().then((res)=>{
                dispatch(getAllFeedSuccess(res?.data))
            })
        }).catch((err) => {
            toast.error(err.errMessage)
            dispatch(createFeedFails(err))
        })

    }

    const cancelPostHandler = () => {
        if (postRoute === 1) {
            setImgVideoPrev("");
            setPostFile(null);
            setPostRoute(0);
        }
        if (postRoute === 2) {
            setTitle('')
            setDesc('')
            setPostRoute(1)
        }

    }

    return (
        <Modal

            open={createPostModal}
            onClose={createPostModalHandler}
        >
            <div className="create-post">
                <div>
                    {
                        postRoute === 0 && <span>Create new Post</span>
                    }
                    {postRoute === 1 &&
                        <div>
                            <button onClick={cancelPostHandler}>
                                <MdCancel size={20} color={'grey'} />
                            </button>

                            <span>Feed</span>

                            <button onClick={postFeedNextHandler}>Post</button>
                        </div>

                    }

                    {
                        postRoute === 2 &&
                        <div>
                            <button onClick={cancelPostHandler}>
                                <MdCancel size={20} color={'grey'} />
                            </button>

                            <span>Feed</span>

                            <button disabled={isLoading} onClick={postFeedHandler}>Post</button>
                        </div>
                    }

                </div>

                {
                    (postRoute === 1) && <div>
                        {(imgOrVideoPrev && isImage) && <img src={imgOrVideoPrev} alt="" />}
                        {(imgOrVideoPrev && !isImage) && <video autoPlay loop src={imgOrVideoPrev} />}
                    </div>
                }

                {
                    (postRoute === 0) && <div>
                        <IoImagesSharp size={100} color={'grey'} />
                        <span>Drag photos and videos here</span>
                        <label>
                            <input type="file" accept="image/*,video/*" onChange={postFileHandler} />
                            <span>Select From Computer</span>
                        </label>
                    </div>
                }

                {
                    (postRoute === 2) && <div>
                        {(imgOrVideoPrev && isImage) && <img style={{ width: '80%', height: '40%', objectFit: 'contain', borderRadius: '1rem' }} src={imgOrVideoPrev} alt="" />}
                        {(imgOrVideoPrev && !isImage) && <video style={{ width: '80%', height: '40%', objectFit: 'contain', borderRadius: '1rem' }} autoPlay loop src={imgOrVideoPrev} />}
                        <input type="text" placeholder="title of feed" onChange={(e) => setTitle(e.target.value)} />
                        <textarea placeholder="description of feed" onChange={(e) => setDesc(e.target.value)} />
                        {
                            isLoading && <Spinner color={'#000000'} />
                        }
                    </div>
                }





            </div>


        </Modal>
    )
}

export default CreatePost