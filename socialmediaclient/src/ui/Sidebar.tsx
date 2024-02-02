import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdOutlineExplore } from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import CreatePost from '../features/feed/CreatePost';
import SearchPeople from '../features/search/SearchPeople';
import Notification from '../features/notification/Notification';
import UserMessage from './UserMessage';


const Sidebar = () => {

    const [createPostModal, setCreatePostModal] = useState<boolean>(false)
    const [sidebarActive, setSidebarActive] = useState<boolean>(false)
    const [activeRoute, setActiveRoute] = useState<number>(1)

    const { pathname } = useLocation();


    const createPostModalHandler = () => {
        setCreatePostModal((prev) => !prev)

    }

    const sidebarActiveHandler = (routeNumber: number) => {

        switch (routeNumber) {
            case 0:
                setSidebarActive(false)
                setActiveRoute(0)
                break;

            case 1:
                setSidebarActive(false)
                setActiveRoute(1)
                break;

            case 2:
                setSidebarActive(true)
                setActiveRoute(2)
                break;

            case 3:
                setSidebarActive(false)
                setActiveRoute(3)
                break;


            case 4:
                setSidebarActive(false)
                setActiveRoute(4)
                break;


            case 5:
                setSidebarActive(true)
                setActiveRoute(5)
                break;


            case 6:
                setSidebarActive(true)
                setActiveRoute(6)
                break;

            case 7:
                createPostModalHandler()
                setSidebarActive(false)
                setActiveRoute(7)
                break;


            case 8:
                setSidebarActive(false)
                setActiveRoute(8)
                break;

        }

    }


    return (
        <div className='sidebar-main-container'>

            <div className={sidebarActive ? 'active-sidebar-container' : 'sidebar-container'}>
                {
                    sidebarActive ? <Link to={'/'}><FaInstagram size={24} color={"black"} onClick={() => sidebarActiveHandler(0)} /></Link> : <span>Instgram</span>
                }
                <Link to={'/'} className={(pathname === "/" && activeRoute === 1) ? "active-nav" : undefined} onClick={() => sidebarActiveHandler(1)}>
                    <IoMdHome size={24} color={"black"} />
                    <span>Home</span>
                </Link>

                <button className={activeRoute === 2 ? "active-nav" : undefined} onClick={() => sidebarActiveHandler(2)}>
                    <CiSearch size={24} color={"black"} />
                    <span>Search</span>
                </button>

                <Link className={(pathname === "/explore" && activeRoute === 3) ? "active-nav" : undefined} to={'/explore'} onClick={() => sidebarActiveHandler(3)}>
                    <MdOutlineExplore size={24} color={"black"} />
                    <span>Explore</span>
                </Link>

                <Link className={(pathname === "/reels" && activeRoute === 4) ? "active-nav" : undefined} to={'/reels'} onClick={() => sidebarActiveHandler(4)}>
                    <BsCameraReels size={24} color={"black"} />
                    <span>Reels</span>
                </Link>

                <button className={(activeRoute === 5) ? "active-nav" : undefined} onClick={() => sidebarActiveHandler(5)}>
                    <AiOutlineMessage size={24} color={"black"} />
                    <span>Message</span>
                </button>

                <button className={activeRoute === 6 ? "active-nav" : undefined} onClick={() => sidebarActiveHandler(6)}>
                    <IoNotificationsOutline size={24} color={"black"} />
                    <span>Notification</span>
                </button>

                <button className={activeRoute === 7 ? "active-nav" : undefined} onClick={() => sidebarActiveHandler(7)} >
                    <IoIosAddCircleOutline size={24} color={"black"} />
                    <span>Create</span>
                </button>

                <Link className={(pathname === "/profile" && activeRoute === 8) ? "active-nav" : undefined} to={'/profile'} onClick={() => sidebarActiveHandler(8)}>
                    <CgProfile size={24} color={"black"} />
                    <span>Profile</span>
                </Link>

                {createPostModal &&
                    <CreatePost createPostModal={createPostModal}
                        createPostModalHandler={createPostModalHandler}
                    />}

            </div>

            {
                (sidebarActive && activeRoute == 2) && <SearchPeople />

            }

            {
                (sidebarActive && activeRoute == 5) && <UserMessage />
            }

            {
                (sidebarActive && activeRoute == 6) && <Notification />
            }

        </div>
    )
}

export default Sidebar