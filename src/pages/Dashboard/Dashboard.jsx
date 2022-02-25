import { Post } from "../../components/Post/Post"
import { FeedPost } from "../../components/FeedPost/FeedPost"
import { ToolbarLeftSlim } from "../../components/ToolBarLeftSlim/ToolbarLeftSlim"
import { ChatSlim } from "../../components/ChatSlim/ChatSlim"
import { TopBar } from "../../components/TopBar/TopBar"
import './dashboard.css';

function Dashboard() {


return (
        <div className="container">
            <div className="content">
                <div className="main">
                    <TopBar />
                    <div className="aside">
                        <div className="Dashboard">
                        <Post />
                        <FeedPost /> 
                        </div>
                    <ChatSlim />
                    </div>
                     <ToolbarLeftSlim />
                </div>
            </div>
        </div>
    )
}

export { Dashboard }