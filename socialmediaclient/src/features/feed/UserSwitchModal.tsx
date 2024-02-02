import { Modal } from '@mui/material'
import { signOutFails, signOutRequest, signOutSuccess } from '../authentication/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logoutUserSuccess } from '../profile/profileSlice'




const UserSwitchModal = ({ userSwitchModal, userSwitchModalHandler }:
    { userSwitchModal: boolean, userSwitchModalHandler: () => void }) => {
        
        const dispatch = useDispatch()
        const navigate = useNavigate()

        const logoutUserHandler = () => {
            try{
                dispatch(signOutRequest())
                localStorage.removeItem("authToken")
                dispatch(signOutSuccess("user logged out"))
                toast.success("user logged out")
                dispatch(logoutUserSuccess())
                navigate("/")
                
            }catch(err){
                toast.error("fail to logout user")
                dispatch(signOutFails("user fails to log out"))
            }
           
        }

    return (
        <Modal
            open={userSwitchModal}
            onClose={userSwitchModalHandler}
        >
            <div className="user-switch-modal-container">
                <button onClick={logoutUserHandler}>Logout</button>
            </div>
        </Modal>
    )
}

export default UserSwitchModal