import './postPhotos.css'
import { useFetch } from '../../../hooks/useFetch';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/Auth';


function PostPhotos() {
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
    const {data} = useFetch(`/posts/qtd/post-photo?page=${currentPage}&limit=${perPage}`);
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
    intersectionObserver.observe(document.querySelector('#sentinelaPhoto'));
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
        <h4><b>Fotos</b></h4>
        <div className="informationPhoto">
            {followers?.map((photo) => {
               return (
                <div className="photos">
                <h4>{photo.username} - {photo.idAccount}</h4>
                <div className="image">
                <img src={photo.link} alt={`Post Foto ${photo.username}`} />
                </div>
                <button onClick={() => {handleDeletePost(photo.id)}}>Deletar</button>
            </div>
               )
            })}

                <div id="sentinelaPhoto">
                <div className="image">
                    <h4>Carregando...</h4>
                </div></div>
        </div>
    </div>
    )
}


function PostPhotosCounter() {
    const {data} = useFetch(`/posts/filter/post-photo`);

    
    if(!data) {
        return (
            <>Carregando...</>
        )
    }


    return (
        <>
           {data?.length}
        </>
    )
}

export { PostPhotos, PostPhotosCounter }