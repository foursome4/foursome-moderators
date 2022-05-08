import { useFetch } from '../../../hooks/useFetch';
import './postVideo.css'



function PostVideo() {
    const {data} = useFetch(`/posts/filter/post-video`);

    
    if(!data) {
        return (
            <h4>Carregando...</h4>
        )
    }



    return (
        <div className="block">
        <h4><b>Vídeos</b></h4>
        <div className="informationVideo">
            {data?.map((video) => {
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
    const {data} = useFetch(`/posts/filter/post-video`);

    
    if(!data) {
        return (
            <h1>Carregando convites</h1>
        )
    }

    return (
        <>
            {data?.length}   
     </>
    )
}

export { PostVideo, PostVideoCounter }