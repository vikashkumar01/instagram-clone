import { useState } from 'react'
import { IoMdAddCircle } from "react-icons/io";
import CreateHighlight from './CreateHighlight';
import { useSelector } from 'react-redux';
import { userHighlightProps, userPropsType } from '../../vite-env';
import Spinner from '../../ui/Spinner';
import profileImg from "../../assets/profile.png"
import HighlightModal from './HighlightModal';



interface Iprofile {
  profile: {
    userProfile: userPropsType,
    ishighlightLoading: boolean,
  }
}

const StoryHighlights = () => {

  const { userProfile, ishighlightLoading } = useSelector((state: Iprofile) => state.profile)
  const [createHighlightModal, setCreateHighlightModal] = useState<boolean>(false)
  const [highlightModal, setHighlightModal] = useState<boolean>(false)
  const [highlightModalIndex, setHighlightModalIndex] = useState<number | null>(null)
  const [activeRoute, setActiveRoute] = useState<number | null>(null)
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null)
  const userProfileHighlight = userProfile?.userHighlight

  const createHighlightModalHandler = () => {
    setCreateHighlightModal((prev) => !prev)
  }

  const highlightModalHandler = () => {
    setHighlightModal((prev) => !prev)
    setActiveRoute(null)
  }

  const addHighlightOpenHandler = () => {
    createHighlightModalHandler()
    setActiveRoute(1)
  }

  return (
    <div className="create-highlights">
      <button onClick={createHighlightModalHandler}>
        < IoMdAddCircle size={150} color={'lightgrey'} />
        <span>New</span>
      </button>
      {
        createHighlightModal &&
        <CreateHighlight
          createHighlightModal={createHighlightModal}
          createHighlightModalHandler={createHighlightModalHandler}
          activeRoute={activeRoute}
          activeHighlightId={activeHighlightId}
        />
      }

      <div>
        {
          ishighlightLoading && <Spinner />
        }
        {
          userProfileHighlight?.map((highlight: userHighlightProps, i) => (
            <div key={i}>
              <button onClick={() => {
                highlightModalHandler();
                setHighlightModalIndex(i);
                setActiveHighlightId(highlight?.id)
              }}>
                <img src={highlight?.storyHighlight?.length > 0 ?
                  highlight?.storyHighlight?.[0].imgUrl : profileImg} alt="" />
              </button>
              <span>{highlight?.highlightName}</span>
              {
                (highlightModal && highlightModalIndex === i) &&
                <HighlightModal
                  highlightModal={highlightModal}
                  highlightModalHandler={highlightModalHandler}
                  addHighlightOpenHandler={addHighlightOpenHandler}
                  highlightId={highlight?.id}
                />
              }
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default StoryHighlights