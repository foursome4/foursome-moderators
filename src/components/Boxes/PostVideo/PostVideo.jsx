import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/Auth';
import { useFetch } from '../../../hooks/useFetch';
import './postVideo.css'



function PostVideo() {
    const {deletePost} = useContext(AuthContext);
    const [followers, setFollowers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    function handleDeletePost(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
            deletePost(id);
        } 
    }

    const perPage = 5;
    const {data} = useFetch(`/posts/qtd/post-video?page=${currentPage}&limit=${perPage}`);
    console.log(data)
    
    useEffect(() => {
        if(data) {
            setFollowers(oldFollowers => [...oldFollowers, ...data])
        }
  }, [data]);


  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        console.log('Sentinela appears!', currentPage + 1)
        setCurrentPage((currentValue) => currentValue + 1);
      }
    })
    intersectionObserver.observe(document.querySelector('#sentinelaVideo'));
    return () => intersectionObserver.disconnect();
  }, []);


if(!followers) {
      return (
          <div className="load">
              <h3>Carregando...</h3>
          </div>
      )
  }



    return (
        <div className="block">
        <h4><b>Vídeos</b></h4>
        <div className="informationVideo">
            {followers?.map((video) => {
                return(
                    <div className="videos">
                         <h4>{video.username} - {video.idAccount}</h4>
                          <div className="video">
                        <video controls controlsList="nofullscreen nodownload" >
                             <source src={video.link} type="video/mp4"/>
                        </video>
                        </div>
                         <button onClick={() => {handleDeletePost(video.id)}}>Deletar</button>
                    </div>
                )
            })}
              <div id="sentinelaVideo">
                <div className="image">
                    <h4>Carregando...</h4>
                </div></div>
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