import "./feedPosts.css"
import Navbar from "../../components/Nav/Navbar";
import { Feed } from "../../components/Feed/Feed";

function FeedPosts() {
    return (
        <div className="content">
        <div className="feedPosts">
            <Navbar />
            <h1>Feed</h1>
            <Feed />

        </div>
        </div>
    )
}

export {FeedPosts}