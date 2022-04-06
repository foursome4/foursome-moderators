import { useEffect, useState } from 'react'
import api from '../../services/api';
import { TopBar } from '../TopBar/TopBar';
import './feed.css'



function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function loadPosts() {
            await api.get("posts/all").then((res) => {
                console.log(res.data);
                setPosts(res.data);
            })
        }

        loadPosts()
    }, [])

    return(
        <div className="content">
            <TopBar />
        <div className="feed">
            {posts.map((post) => {
               return (
                <div className="postIndividual">
                {/* Top (Img, nickname, hora) */}
                <div className="media">
                    <div className="postText">
                        <h4>{post.text}</h4>
                    </div>
                    {post.type === "post-photo" ?
                    <div className="image">
                        {/* <img src={post.link} alt={post.link} />  */}
                    </div>
                    : post.type === "post-video" ?
                    <div className="movie">
                    {/* <video playsInline controls type="video/mp4">
                        <source playsInline src={post.link} type="video/mp4" />
                        <source playsInline src={post.link} type="video/ogg" />
                        <source playsInline src={post.link} type="video/webm" />
                    </video> */}
                    </div>
                     :   ""
                }
                </div>
            </div>
               )
            })}

        </div>
        </div>
    )
}

export { Feed }