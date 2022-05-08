import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth';
import { useFetch } from '../../hooks/useFetch';
import { DataUser } from '../DataUser/DataUser';
import { FeedComment } from '../FeedComment/FeedComment';
import Navbar from '../Nav/Navbar';
import './feed.css'



function Feed() {
            const {deletePost} = useContext(AuthContext);

    const {data} = useFetch(`/posts/all`);

    function handleDeletePost(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
            deletePost(id);
        } 
    }
    
    if(!data) {
        return (
            <>Carregando...</>
        )
    }



    return(
        <div className="feed">
            <Navbar />
        <div className="feed-posts">
            {data?.map((post) => {
               return (
                <div className="postIndividual" key={post.id}>
                <DataUser idAccount={post.idAccount} id={post.id}/>
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

export { Feed }