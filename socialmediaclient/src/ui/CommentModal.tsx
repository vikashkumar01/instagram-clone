import { Modal } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteCommentFails, deleteCommentRequest, deleteCommentSuccess, getFeedByIdSuccess } from "../features/feed/feedSlice";
import { deleteCommentFromPost, getPostById } from "../services/feedService";
import { toast } from "react-toastify";

interface props {
    openCommentModel: boolean;
    openUserCommentModelHandler: () => void;
    commentId: string;
    postId: string;
}

const CommentModal: React.FC<props> = ({ openCommentModel, openUserCommentModelHandler, commentId,postId }) => {

    const dispatch = useDispatch();
    const deleteCommentHandler = () => {
        dispatch(deleteCommentRequest())
        deleteCommentFromPost(commentId).then((res) => {
            toast.success(res?.data?.message)
            dispatch(deleteCommentSuccess(res.data.message))
            getPostById(postId).then((res) => {
                dispatch(getFeedByIdSuccess(res?.data?.post))
            })
        }).catch((err) => {
            toast.error(err.errMessage)
            dispatch(deleteCommentFails(err.errMessage))
        })
    }

    return (
        <Modal
            open={openCommentModel}


        >
            <div className='user-comment-modal'>
                <button onClick={deleteCommentHandler}>delete</button>
                <button onClick={openUserCommentModelHandler}>Cancel</button>
            </div>
        </Modal>
    )
}

export default CommentModal