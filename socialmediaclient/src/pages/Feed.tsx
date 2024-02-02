import { Outlet } from 'react-router-dom'
import Sidebar from '../ui/Sidebar'

const Feed = () => {
  return (
    <div className='feed-container'>
      <div>
        <Sidebar />
        <div className='right'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Feed