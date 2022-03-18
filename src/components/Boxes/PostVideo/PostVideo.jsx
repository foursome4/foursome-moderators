import './postVideo.css'
import { useEffect, useState } from "react"
import api from '../../../services/api';


function PostVideo() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function loadPostsVideos(){
            await api.get("/posts/filter/post-video").then((result) =>{
                setVideos(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }
        loadPostsVideos()
    })
    return (
        <div className="block">
        <h4><b>Vídeos</b></h4>
        <div className="informationVideo">
            {videos.map((video) => {
                return(
                    <div className="videos">
                         <h4>{video.username} - {video.idAccount}</h4>
                          <div className="video">
                        <video controls controlsList="nofullscreen nodownload" >
                             <source src={video.link} type="video/mp4"/>
                        </video>
                        </div>
                         <button>Deletar</button>
                    </div>
                )
            })}
        </div>
       
    </div>
    )
}


function PostVideoCounter() {
    const [videosCounter, setVideosCounter] = useState([]);

    useEffect(() => {
        async function loadPostsVideosCounter(){
            await api.get("/posts/filter/post-video").then((result) =>{
                setVideosCounter(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }
        loadPostsVideosCounter()
    })
    return (
        <>
            {videosCounter.length}   
     </>
    )
}

export { PostVideo, PostVideoCounter }