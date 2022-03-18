import './postPhotos.css'
import { useEffect, useState } from "react"
import api from '../../../services/api';


function PostPhotos() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        async function loadPostsPhotos(){
            await api.get("/posts/filter/post-photo").then((result) =>{
                setPhotos(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }
        loadPostsPhotos()
    })
    return (
        <div className="block">
        <h4><b>Fotos</b></h4>
        <div className="informationPhoto">
            {photos.map((photo) => {
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
    const [photosCounter, setPhotosCounter] = useState([]);

    useEffect(() => {
        async function loadPostsPhotosCounter(){
            await api.get("/posts/filter/post-photo").then((result) =>{
                setPhotosCounter(result.data);
                console.log(result.data)
                console.log(result.data.length)
            })
        }
        loadPostsPhotosCounter()
    })
    return (
        <>
           {photosCounter.length}
        </>
    )
}

export { PostPhotos, PostPhotosCounter }