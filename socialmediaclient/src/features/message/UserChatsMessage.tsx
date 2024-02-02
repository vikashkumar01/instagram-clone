
import { useDispatch, useSelector } from "react-redux"
import { userChatsProps, userProps } from "../../vite-env"
import { useParams } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { deleteUserMessageFails, deleteUserMessageRequest, deleteUserMessageSuccess, getUserMessageFails, getUserMessageRequest, getUserMessageSuccess, sendMessageFails, sendMessageRequest, sendMessageSuccess } from "./userMessageSlice"
import { deleteUserMessage, getUserMessage, sendUserMessage } from "../../services/messageService"
import { getProfile } from "../../services/profileService"
import profileImg from '../../assets/profile.png'
import { toast } from "react-toastify"
import { IoMdSend } from "react-icons/io";
import Spinner from "../../ui/Spinner";


interface userChatMessageProps {
    userMessage: {
        userChats: userChatsProps[],
        isLoading: boolean
    }
}


const UserChatsMessage = () => {

    const { userChats, isLoading } = useSelector((state: userChatMessageProps) => state.userMessage)
    const dispatch = useDispatch()
    const { senderId, receiverId } = useParams()
    const [user, setUser] = useState<userProps | null>(null)
    const [chat, setChat] = useState<string>("")
    const messageEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        dispatch(getUserMessageRequest())
        getUserMessage(senderId!, receiverId!).then((res) => {
            dispatch(getUserMessageSuccess(res.data.message))
            messageEndRef.current?.scrollIntoView()
        }).catch((err) => {
            dispatch(getUserMessageFails(err.errMessage))
        })

    }, [senderId, receiverId, dispatch])


    useEffect(() => {
        getProfile(receiverId!).then((res) => {
            setUser(res.data.user)
        })
    }, [receiverId])



    const deleteChatsHandler = (chatId: string) => {
        dispatch(deleteUserMessageRequest())
        deleteUserMessage(chatId).then((res) => {
            toast.success(res.data.message)
            dispatch(deleteUserMessageSuccess(res.data.message))
            getUserMessage(senderId!, receiverId!).then((res) => {
                dispatch(getUserMessageSuccess(res.data.message))
            })
        }).catch((err) => {
            toast.error(err.errMessage)
            dispatch(deleteUserMessageFails(err.errMessage))
        })
    }

    const sendMessageHandler = () => {
        dispatch(sendMessageRequest())
        sendUserMessage(senderId!, receiverId!, chat).then((res) => {
            dispatch(sendMessageSuccess(res.data.message))
            getUserMessage(senderId!, receiverId!).then((res) => {
                dispatch(getUserMessageSuccess(res.data.message))
                messageEndRef.current?.scrollIntoView()
            })
           
        }).catch((err) => {
            toast.error(err.errMessage)
            dispatch(sendMessageFails(err.errMessage))
        })
        setChat("")
      
    }
 
    useEffect(()=>{
        messageEndRef.current?.scrollIntoView()
    },[chat])

    return (
        <div className="user-chats-message" >
            <div>
                {userChats.length > 0 && userChats.map((uchat, i) => (
                    <div key={i} className={(senderId === uchat?.userId) ? 'user-chats-2' : 'user-chats-1'} >
                        {
                            (senderId !== uchat?.userId) &&
                            <img
                                src={user?.profileImgUrl != null ? user?.profileImgUrl : profileImg}
                                alt=""
                            />
                        }
                        <span>{uchat?.chatMessage}
                            {
                                (senderId === uchat?.userId) &&
                                < span onClick={() => deleteChatsHandler(uchat?.id)}>
                                    x
                                </span>

                            }

                        </span>

                    </div>
                ))
                }
                <div ref={messageEndRef}/>
            </div>
            <div className="message-footer">
                <div>
                    <input type="text" value={chat} placeholder="send message" onChange={(e) => setChat(e.target.value)} />
                    <button disabled={chat.length === 0 || isLoading} onClick={sendMessageHandler}>
                        {
                            isLoading ? <Spinner /> : <IoMdSend size={22} color={"#1D9AEE"} />
                        }
                    </button>
                </div>
            </div>

        </div >
    )
}

export default UserChatsMessage