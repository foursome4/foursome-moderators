import './postPhotos.css'
import { useFetch } from '../../../hooks/useFetch';


function PostPhotos() {
    const {data} = useFetch(`/posts/filter/post-photo`);

    
    if(!data) {
        return (
            <h4>Carregando...</h4>
        )
    }


    return (
        <div className="block">
        <h4><b>Fotos</b></h4>
        <div className="informationPhoto">
            {data?.map((photo) => {
               return (
                <div className="photos">
                <h4>{photo.username} - {photo.idAccount}</h4>
                <div className="image">
                <img src={photo.link} alt={`Post Foto ${photo.username}`} />
                </div>
                <button>Deletar</button>
            </div>
               )
            })}
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