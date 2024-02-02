
import AllFeeds from "./AllFeeds"
import Rightbar from "./Rightbar"
import Story from "./Story"

const FeedSection = () => {

  return (
    <div className="feed-section-container">

      <div className="feed-section">
        <div className="feed-left-section">
          <Story />
          <AllFeeds/>
        </div>
        <div className="feed-right-section">
          <Rightbar />
        </div>
      </div>

    </div>
  )
}

export default FeedSection