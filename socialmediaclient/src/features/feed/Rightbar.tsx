import { useSelector } from 'react-redux'
import { userPropsType } from "../../vite-env"
import profileImg from '../../assets/profile.png'
import { useState } from "react"
import UserSwitchModal from "./UserSwitchModal"


interface authProfileProps {
    auth: {
        user: userPropsType
    }
}



const Rightbar = () => {

    const { user } = useSelector((state: authProfileProps) => state.auth)
    const [userSwitchModal, setUserSwitchModal] = useState<boolean>(false)

    const userSwitchModalHandler = () => {
        setUserSwitchModal((prev) => !prev)
    }

    const goToProfileHandler = () =>{
         window.location.href = '/profile'
    }

    return (
        <div className='right-container'>
            <div>
                <img onClick={goToProfileHandler} src={user?.profileImgUrl !== null ? user?.profileImgUrl : profileImg} alt="" />
                <div>
                    <span>{user?.firstName} {user?.lastName}</span>
                    <span>{user?.firstName} {user?.lastName}</span>
                </div>

                <div>
                    <button onClick={userSwitchModalHandler}>Switch</button>
                    {
                        userSwitchModal &&
                        <UserSwitchModal
                            userSwitchModal={userSwitchModal}
                            userSwitchModalHandler={userSwitchModalHandler}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Rightbar