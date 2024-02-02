import { useSelector } from "react-redux"
import StoryHighlights from "../features/profile/StoryHighlights"
import ProfileSection1 from "../features/profile/ProfileSection1"
import ProfileSection2 from "../features/profile/ProfileSection2"
import {Outlet,useLocation} from 'react-router-dom'
import { userPropsType } from "../vite-env"

interface authProps{
  auth:{
    user:userPropsType
  }
}

const Profile = () => {

  const {user} = useSelector((state:authProps)=>state.auth)

  const location = useLocation();

  if(location.pathname===`/profile/update-user/${user?.id}`) {
    return <Outlet/>
  }

  if(location.pathname===`/profile/change-user-password/${user?.id}`) {
    return <Outlet/>
  }

  if(location.pathname===`/profile/user-archive/${user?.id}`){
    return <Outlet/>
  }

  return (
    <div className="profile-container">
        <ProfileSection1/>
        <StoryHighlights/>
        <ProfileSection2/>
    </div>
  )
}

export default Profile