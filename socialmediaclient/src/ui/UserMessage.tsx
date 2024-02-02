
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { userMessageProps, userProps } from "../vite-env";
import { useEffect } from "react";
import { getAllUserMessage } from "../services/messageService";
import {
    getAllUserMessageFails,
    getAllUserMessageRequest,
    getAllUserMessageSuccess
} from "../features/message/userMessageSlice";
import profileImg from "../../src/assets/profile.png"
import { MdDelete } from "react-icons/md";

interface userMessageProp {
    userMessage: {
        userMessageList: userMessageProps[]
    }
}

interface authProps {
    auth: {
        user: userProps
    }
}

const UserMessage = () => {

    const { userMessageList } = useSelector((state: userMessageProp) => state.userMessage)
    const { user } = useSelector((state: authProps) => state.auth)
    const dispatch = useDispatch()
    const { receiverId } = useParams();

    useEffect(() => {
        dispatch(getAllUserMessageRequest())
        getAllUserMessage(user?.id).then((res) => {
            dispatch(getAllUserMessageSuccess(res.data))
        }
        ).catch((err) => {
            dispatch(getAllUserMessageFails(err.errMessage))
        })
    }, [dispatch, user?.id])


    return (
        <div className="usermessage-container">
            <div className="usermessage-header">
                <span>Username</span>
                <button><CiSearch size={22} color={"black"} /></button>
            </div>
            <span>Message</span>
            <div className="usermessage-user">

                {
                    userMessageList.length >= 0 && userMessageList.map((u, i) => (
                        <Link to={`/user/${user.id}/message/${user.id === u.createdFor.id ? u.createdBy.id : u.createdFor.id}`}
                            key={i}
                            style={user.id === u.createdFor.id ? u?.createdBy.id === receiverId ? { backgroundColor: "#f2f2f2" } : undefined
                                : u?.createdFor.id === receiverId ? {backgroundColor: "#f2f2f2" } : undefined
                            }
                        >
                <img
                    src={user.id === u.createdFor.id ?
                        u?.createdBy?.profileImgUrl != null ? u.createdBy?.profileImgUrl
                            : profileImg
                        : u?.createdFor?.profileImgUrl != null ? u.createdFor?.profileImgUrl
                            : profileImg} alt="" />
                <div>
                    <span>{user.id === u.createdFor.id ? u.createdBy.firstName : u.createdFor.firstName}
                        {user.id === u.createdFor.id ? u.createdBy.lastName : u.createdFor.lastName}</span>
                </div>
                <button><MdDelete color={"crimson"} /></button>
            </Link>
            ))
                }
        </div>
        </div >
    )
}

export default UserMessage