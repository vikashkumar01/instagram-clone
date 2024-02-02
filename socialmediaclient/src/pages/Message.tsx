import MessageHeader from "../features/message/MessageHeader"
import UserChatsMessage from "../features/message/UserChatsMessage"

const Message = () => {
  return (
    <div className="user-message-container">
      <MessageHeader />
      <UserChatsMessage />
    </div>
  )
}

export default Message