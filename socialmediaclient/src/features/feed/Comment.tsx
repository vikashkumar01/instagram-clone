
interface props{
  setIsCommentModelOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Comment:React.FC<props> = ({ setIsCommentModelOpen }) => {

  return (
    <div className="comment-container">
      <button onClick={() => setIsCommentModelOpen(false)}>X</button>
      Comment
    </div>
  )
}

export default Comment