
import './styles/App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const ForgotPassword = lazy(() => import('./features/authentication/ForgotPassword'));
const ForgoPasswordChange = lazy(() => import('./features/authentication/ForgoPasswordChange'))
const Feed = lazy(() => import('./pages/Feed'));
const FeedSection = lazy(() => import('./features/feed/FeedSection'))
const Profile = lazy(() => import('./pages/Profile'))
const Reels = lazy(() => import("./pages/Reels"))
const Message = lazy(() => import('./pages/Message'))
const Explore = lazy(() => import("./pages/Explore"))
const NotFound = lazy(() => import("./ui/NotFound"))
const Spinner = lazy(() => import("./ui/Spinner"))
const ChangeUserPassword = lazy(() => import("./features/profile/ChangeUserPassword"))
const UpdateUser = lazy(() => import("./features/profile/UpdateUser"))
const ViewArchive = lazy(() => import("./features/profile/ViewArchive"))

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authClearState, getUserFails, getUserRequest, getUserSuccess } from './features/authentication/authSlice'
import { getLoggedUser } from './services/authService'
import { toast } from 'react-toastify'
import UpdateFeed from './features/feed/UpdateFeed'
import Story from './pages/Story'



interface authProps {
  auth: {
    errMessage: string,
    isAuthenticated: boolean,
    isLoading: boolean
  }
}

function App() {

  const { isAuthenticated, isLoading, errMessage } = useSelector((state: authProps) => state.auth)
  const dispatch = useDispatch()


  useEffect(() => {
    if (window.localStorage.getItem('authToken')) {
      dispatch(getUserRequest())
      getLoggedUser(localStorage.getItem('authToken')!).then((res) => {
        dispatch(getUserSuccess(res.data.user))
      }).catch((err) => {
        window.localStorage.removeItem('authToken')
        dispatch(getUserFails(err))
      })
    }
  }, [dispatch])

  useEffect(() => {
    if (errMessage) {
      toast.error(errMessage)
      dispatch(authClearState())
    }
  }, [dispatch, errMessage])



  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            {
              isAuthenticated &&
              <Route element={<Feed />}>
                <Route path='/' element={<FeedSection />} />
                <Route path='/feed/update/:feedId' element={<UpdateFeed />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/reels' element={<Reels />} />
                <Route path={`/user/:senderId/message/:receiverId`} element={<Message />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/profile/change-user-password/:userId" element={<ChangeUserPassword />} />
                <Route path="/profile/update-user/:userId" element={<UpdateUser />} />
                <Route path="/profile/user-archive/:userId" element={<ViewArchive />} />
              </Route>

            }

            {
              !isAuthenticated && <>
                <Route path='/' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/forgot-password-change' element={<ForgoPasswordChange />} />
              </>
            }
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
