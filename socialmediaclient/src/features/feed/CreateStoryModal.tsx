import { useState } from "react";

import { Modal } from "@mui/material"
import { toast } from 'react-toastify';
import { createStoryFails, createStoryRequest, createStorySuccess } from "./feedSlice";

import { useDispatch, useSelector } from "react-redux";
import { userProps } from "../../vite-env";
import { createUserStory } from "../../services/feedService";
import { getProfile } from "../../services/profileService";
import { getUserProfileSuccess } from "../profile/profileSlice";
import Spinner from "../../ui/Spinner";

interface authProps {
    auth: {
        user: userProps
    }
}

interface IFeed{
    feed:{
        isLoading:boolean
    }
}

const CreateStoryModal = ({ open, onCloseModalHandler }: { open: boolean, onCloseModalHandler: () => void }) => {

    const { user } = useSelector((state: authProps) => state.auth)
    const {isLoading} = useSelector((state: IFeed)=>state.feed)
    const dispatch = useDispatch()

    const [storyFile, setStoryFile] = useState<File | null>(null)
    const [isImage, setIsImage] = useState<boolean>(false)

    const selectStoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files && e.target.files[0];

        if ((file?.type.startsWith('image/'))) {
            setIsImage(true)
        } else if (file?.type.startsWith('video/')) {
            setIsImage(false)
        } else {
            toast.error("unsupported file type")
        }
        if (file) {
            setStoryFile(file);
        }

    }

    const shareStoryHandler = () => {
       
        if (storyFile) {
            dispatch(createStoryRequest())
            const formData = new FormData();
            formData.append("file", storyFile)
            createUserStory(user?.id, formData).then((res) => {
                toast.success(res.data.message);
                dispatch(createStorySuccess(res.data.message))
                setStoryFile(null)
                getProfile(user?.id).then((res) => {
                    dispatch(getUserProfileSuccess(res.data.user))
                })
                onCloseModalHandler()
            }).catch((err) => {
                toast.error(err.errMessage);
                dispatch(createStoryFails(err.errMessage))
                setStoryFile(null)
            })
        } else {
            toast.error("please provide story")
        }
    }


    return (
        <Modal
            open={open}
            onClose={onCloseModalHandler}
        >
            <div className="create-story">
                {
                    storyFile !== null ? <>
                        {
                            isImage ? <img src={URL.createObjectURL(storyFile)} alt="" /> :
                                <video src={URL.createObjectURL(storyFile)} autoPlay />
                        }
                        <button onClick={shareStoryHandler}>{isLoading ? <Spinner color={"fffff"} /> : "Share Story"}</button>
                    </> :
                        <label>
                            <input type="file" onChange={selectStoryHandler} title="Select Story" />
                            <span>Select Story</span>
                        </label>
                }

            </div>
        </Modal>
    )
}

export default CreateStoryModal