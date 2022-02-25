import { FiImage, FiVideo, FiUsers, FiList, FiMenu, FiTrash2, FiEdit, FiMessageCircle, FiSend } from 'react-icons/fi'
import './feedPost.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { FeedComments } from '../FeedComments/FeedComments';
import { ListReactions } from '../ListReactions/ListReactions';
import { NewComment } from '../NewComment/NewComment';
import { Link } from 'react-router-dom';

function FeedPost() {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);
    const [post, setPost] = useState("");
    const [data, setData] = useState([]);
    const [comment, setComment] = useState(false);
    const {user, deletePost} = useContext(AuthContext);
    
    useEffect(() => {
          async function findPosts() {
          if(post === "") {
            const res = await api.get(`/posts/all`);
            const dataPosts = (res.data)
            setData(dataPosts)
          } else {
            const res = await api.get(`/posts/filter/${post}`);
            const dataPosts = (res.data)
            setData(dataPosts)
          }
        }
        findPosts()

    }, [post, data])

    function postAll() {
        setPost("")
    }

    function postText() {
        setPost("post-text")
    }

    function postPhoto(){
        setPost("post-photo")
    }

    function postVideo(){
        setPost("post-video")
    }

    function postGroup(){
        setPost("post-group")
    }

    function postForum(){
        setPost("post-forum")
    }

    function handleHabiliteComment () {
        if(comment === false) {
            setComment(true)
        } else {
            setComment(false) 
        }
    }

 

    function handleDeletePost(id) {
    deletePost(id)
    }




    return (
        <div className="feedPost">
            <div className="posts-feed">
            <div className="buttons">
            <button className={post === "" ? 'selected' : ""} onClick={postAll}> <FiMenu /> Todos </button>
            <button className={post === "post-text" ? 'selected' : ""} onClick={postText}> <FiMenu /> Texto </button>
            <button className={post === "post-photo" ? 'selected' : ""} onClick={postPhoto}> <FiImage /> Foto </button>
            <button className={post === "post-video" ? 'selected' : ""} onClick={postVideo}> <FiVideo /> Vídeo </button>
            <button className={post === "post-group" ? 'selected' : ""} onClick={postGroup}> <FiUsers /> Grupo </button>
            <button className={post === "post-forum" ? 'selected' : ""} onClick={postForum}> <FiList /> Fórum </button>
            </div>
                                {data.map((postsData => {

                                const date = parseISO(postsData.created_at);
                                const dateFormated = format(
                                    date, 
                                "dd'/'MM'/'yyyy', às 'HH:mm'h'"
                                );
                                    return (   
                                        <>                      
                                <div className="feed-post" key={postsData.id}>
                                    <div className="post-user" >
                                        <div className="avatar">              
                                    <Link to={postsData.idAccount === userData.id ? `/profile` : `/profile-friend/${postsData.idAccount}`}>  <img src={postsData.avatar} alt="" /> </Link>
                                        </div>
                                        <div className="info-data">
                                        <div className="name-data">
                                    <Link to={postsData.idAccount === userData.id ? `/profile` : `/profile-friend/${postsData.idAccount}`}> <h4 className="selected">{postsData.nickname}</h4> </Link>
                                        
                                        </div>
                                        <div className="time-data">
                                            <h5>{dateFormated}</h5>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="post-data" >
                                        <p>{postsData.text}</p>
                                    </div>

                                    {postsData.type === "post-photo" ?
                                        <div className="post-data-media" >
                                       
                                         <div className='image'>
                                         <div className="mark">
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                         </div>
                                            <img src={postsData.link} alt={"Post Image"} width={500}/>
                                         </div>
                                        </div> :
                                    postsData.type === "post-video" ?
                                    <div className="post-data-media" >
                                         <div className='image-video'>
                                         <div className="mark">
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                             <h5 className='white'>{userData.id}</h5>
                                             <h5 className='black'>{userData.id}</h5>
                                         </div>
                                         <video controls controlsList="nofullscreen nodownload" >
                                            <source src={postsData.link} type="video/mp4"/>
                                            </video>
                                            </div>
                                        </div> :
                                    ""
                                      }

                                    <div className="reactions" >
                                     <ListReactions idPost={postsData.id} />
                                        <button onClick={handleHabiliteComment}>
                                            <FiMessageCircle />
                                            Comentar
                                        </button>
                                        {postsData.idAccount === user.id ?
                                        <>
                                            <button> <FiEdit /> Editar </button>
                                            <button onClick={() => {handleDeletePost(postsData.id)}}> <FiTrash2 /> Apagar </button>
                                            </>
                                        : ""}
                                    </div>

                                    <div className={comment === true ? "comment" : "commentHidden"}>
                                         <NewComment postData={postsData.id}/>
                                    </div>

                                <FeedComments idPost={postsData.id} />
                                </div>
                                </>
                                )
                            }))}
                           </div>
        </div>     
                        
    )
}

export {FeedPost}