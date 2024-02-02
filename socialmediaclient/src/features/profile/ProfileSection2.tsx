import { useState } from "react"
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import PostSection from "./PostSection";
import ReelsSection from "./ReelsSection";
import SavedPostSection from "./SavedPostSection";
import { BsCameraReels } from "react-icons/bs";
import { CiSaveUp2 } from "react-icons/ci";
import { useSelector } from "react-redux";
import { userProps } from "../../vite-env";

const profileSection2Array = [
    {
        "name": "Posts",
        "icon": <HiOutlineSquares2X2 size={20} />
    },
    {
        "name": "Reels",
        "icon": <BsCameraReels size={20} />
    },
    {
        "name": "Saved",
        "icon": <CiSaveUp2 size={20} />
    },

]

interface authProps {
    auth: {
        user: userProps
    }
}

interface profileProps {
    profile: {
        userProfile: userProps
    }
}


const ProfileSection2 = () => {

    const { user } = useSelector((state: authProps) => state.auth)
    const { userProfile } = useSelector((state: profileProps) => state.profile)
    const [activeSection, setActiveSection] = useState<number>(0)

    return (
        <div className="profile-section-2">
            <div>
                {profileSection2Array.map((item, i) => (
                    <div key={i}>
                        {

                            ((userProfile?.id !== user?.id) && (i === 2)) ? null :
                                <button
                                    
                                    className={activeSection === i ? 'profile-btn-active' : undefined}
                                    onClick={() => setActiveSection(i)}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </button>
                        }

                    </div>
                ))}
            </div>
            <div>
                {
                    activeSection === 0 ?
                        <PostSection/> :
                        activeSection === 1 ?
                            <ReelsSection key={activeSection}/> :
                            ((activeSection === 2) && (user?.id === userProfile?.id)) ?
                                <SavedPostSection key={activeSection}/>
                                : null
                }
            </div>
        </div >
    )
}

export default ProfileSection2