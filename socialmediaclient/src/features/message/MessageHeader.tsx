import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProfile } from "../../services/profileService"
import { userProps } from "../../vite-env"
import profileImg  from "../../assets/profile.png"



const MessageHeader = () => {

  const {receiverId} = useParams()
  const [user,setUser] = useState<userProps|null>(null)
 

  useEffect(()=>{
    getProfile(receiverId!).then((res)=>{
      setUser(res.data.user)
    })
  },[receiverId])


  return (
    <div className='message-header'>
        <img src={user?.profileImgUrl!=null?user?.profileImgUrl:profileImg} alt="" />
        <span>{user?.firstName} {user?.lastName}</span>
    </div>
  )
}

export default MessageHeader