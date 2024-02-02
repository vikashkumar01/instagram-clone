import { useState } from 'react'
import { Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { deleteUserRequest, deleteUserSuccess, logoutUserSuccess } from "./profileSlice";
import { toast } from "react-toastify";
import { signOutFails, signOutRequest, signOutSuccess } from "../authentication/authSlice";
import { deleteUser } from "../../services/profileService";
import ManageStoryModal from './ManageStoryModal';

interface profileSettingProps {
    profileSettingModal: boolean;
    profileSettingModalHandler: () => void;
    userId: string;
}

const ProfileSettingModal: React.FC<profileSettingProps> = ({
    profileSettingModal, profileSettingModalHandler, userId }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [manageStory, setManageStory] = useState<boolean>(false)

    const deleteUserHandler = () => {
        dispatch(deleteUserRequest())
        deleteUser(userId).then((res) => {
            toast.success(res.data.message)
            localStorage.removeItem("authToken")
            dispatch(signOutSuccess(res.data.message))
            dispatch(deleteUserSuccess(res.data.message))
            navigate("/")

        }).catch((err) => {
            toast.error(err)
        })
    }

    const logoutUserHandler = () => {
        try {
            dispatch(signOutRequest())
            localStorage.removeItem("authToken")
            dispatch(signOutSuccess("user logged out"))
            toast.success("user logged out")
            dispatch(logoutUserSuccess())
            navigate("/")

        } catch (err) {
            toast.error("fail to logout user")
            dispatch(signOutFails("user fails to log out"))
        }

    }

    const manageStoryHandler = () => {
        setManageStory((prev) => !prev)
    }

    return (
        <Modal
            open={profileSettingModal}
        >
            <div className="profile-setting-modal-container">
                <Link to={`/profile/update-user/${userId}`}>Edit Account</Link>
                <button onClick={manageStoryHandler}>View Story</button>
                <button onClick={deleteUserHandler}>Delete Account</button>
                <Link to={`/profile/change-user-password/${userId}`}>Chanage Password</Link>
                <button onClick={logoutUserHandler}>Logout Account</button>
                <button onClick={profileSettingModalHandler}>close</button>
                {
                    manageStory && <ManageStoryModal
                        manageStory={manageStory}
                        manageStoryHandler={manageStoryHandler}
                    />
                }
            </div>

        </Modal>
    )
}

export default ProfileSettingModal