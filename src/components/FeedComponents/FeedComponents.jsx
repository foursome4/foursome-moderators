import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth';
import { useFetch } from '../../hooks/useFetch';
import { DataUser } from '../DataUser/DataUser';
import { FeedComment } from '../FeedComment/FeedComment';
import Navbar from '../Nav/Navbar';
import './feedComponents.css'



function FeedComponents({link}) {
    const {deletePost} = useContext(AuthContext);
    const {data} = useFetch(link);

    function handleDeletePost(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
            deletePost(id);
        } 
    }
    

    return(
        <div className="feedComponents">
        <div className="feedComponents-posts">
            {data?.map((post) => {
               return (
                <div className="postIndividual" key={post.id}>
                <DataUser idAccount={post.idAccount} id={post.id} date={post.created_at}/>
                <div className="media">
                    <div className="postText">
                        <h4>{post.text}</h4>
                    </div>
                    {post.type === "post-photo" ?
                    <div className="image">
                        <img src={post.link} alt={post.link} /> 
                    </div>
                    : post.type === "post-video" ?
                    <div className="movie">
                    <video playsInline controls type="video/mp4">
                        <source playsInline src={post.link} type="video/mp4" />
                        <source playsInline src={post.link} type="video/ogg" />
                        <source playsInline src={post.link} type="video/webm" />
                    </video>
                    </div>
                     :   ""
                }
                </div>

                <div className="buttons">
                    <button onClick={() => {handleDeletePost(post.id)}}>Deletar Postagem</button>
                </div>
                <div className="comment">
                        <FeedComment id={post.id} />
                    </div>
            </div>
               )
            })}

        </div>
        </div>
    )
}

export { FeedComponents }