import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userProps } from "../../vite-env"
import { getAllSearchUserFails, getAllSearchUserRequest, getAllSearchUserSuccess } from "./searchSlice"
import { getAllSearchUser } from "../../services/profileService"
import Spinner from '../../ui/Spinner'
import profileImg from '../../assets/profile.png'

interface searchUserProps {
  search: {
    isLoading: boolean,
    searchUser: userProps[],
  }
}

interface authProps {
  auth: {
    user: userProps
  }
}

const SearchPeople = () => {

  const { user } = useSelector((state: authProps) => state.auth)
  const { isLoading, searchUser } = useSelector((state: searchUserProps) => state.search)
  const dispatch = useDispatch()
  const [searchKey, setSearchKey] = useState<string>('')

  useEffect(() => {

    if (searchKey) {
      dispatch(getAllSearchUserRequest())
      getAllSearchUser(searchKey).then((res) => {
        dispatch(getAllSearchUserSuccess(res?.data))
      }).catch((err) => {
        dispatch(getAllSearchUserFails(err))
      })
    } else {
      dispatch(getAllSearchUserSuccess([]))
    }


  }, [searchKey, dispatch])

  const openProfileUserHandler = (userId: string) => {
    (user?.id === userId) ?
      window.location.href = "/profile"
      : window.location.href = `/profile/${userId}`
  }

  return (
    <div className="search-people-container">
      <div>
        <span>Search</span>
        <input type="text" placeholder="Search" onChange={(e) => setSearchKey(e.target.value)} />
      </div>

      <div>
        {
          isLoading && <Spinner />
        }
        {
          (searchUser.length === 0 && searchKey) && <span>No User Found</span>
        }
        {
          searchUser.length > 0 && searchUser?.map((user, i) => (
            <div key={i} onClick={() => openProfileUserHandler(user?.id)}>
              <img src={user?.profileImgUrl !== null ? user?.profileImgUrl : profileImg} alt="" />
              <span>{user?.firstName} {user?.lastName}</span>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SearchPeople
