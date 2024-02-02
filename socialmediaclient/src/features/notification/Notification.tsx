
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userNotification, userProps } from '../../vite-env'
import Spinner from '../../ui/Spinner'
import {
    deleteUserNotificationRequest,
    deleteUserNotificationSuccess,
    getUserNotificationFails,
    getUserNotificationRequest,
    getUserNotificationSuccess
} from './notificationSlice'
import { deleteNotifications, getAllUserNotifications } from '../../services/notificationService'
import { timeAgo } from '../../utils/timeConverter'
import { toast } from 'react-toastify'


interface notificationProps {
    notifications: {
        isLoading: boolean,
        notification: userNotification[]
    }
}

interface userAuthProps {
    auth: {
        user: userProps
    }
}

const Notification = () => {

    const { user } = useSelector((state: userAuthProps) => state.auth)
    const { isLoading, notification } = useSelector((state: notificationProps) => state.notifications)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserNotificationRequest())
        getAllUserNotifications(user?.id).then((res) => {
            dispatch(getUserNotificationSuccess(res.data.notificationList))
        }).catch((err) => {
            dispatch(getUserNotificationFails(err))
        })
    }, [dispatch, user])

    const deleteNotificationHandler = (notificationId: string) => {
        console.log(notificationId)
        dispatch(deleteUserNotificationRequest())
        deleteNotifications(notificationId).then((res) => {
            toast.success(res?.data?.message)
            dispatch(deleteUserNotificationSuccess(res.data.message))
            getAllUserNotifications(user?.id).then((res) => {
                dispatch(getUserNotificationSuccess(res.data.notificationList))
            })
        }).catch((err) => {
            toast.error(err)
            dispatch(err)
        })

    }

    return (
        <div className="notification-container">
            <div>
                <span>Notifications</span>
            </div>
            {notification.length === 0 && <span>No Notification</span>}
            <div>

                {
                    notification.length > 0 && notification.map((noti, i) => (
                        <div key={i}>
                            <div>
                                <span>
                                    <Link to={`/profile/${noti?.follower}`} >
                                        {noti?.firstName} {noti?.lastName}
                                    </Link>

                                    <span>{noti.message}</span></span>
                                <span>{timeAgo(noti?.createdAt)}</span>
                            </div>


                            <button disabled={isLoading} onClick={() => deleteNotificationHandler(noti?.id)}>
                                {
                                    isLoading ? <Spinner /> : "X"
                                }
                            </button>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Notification