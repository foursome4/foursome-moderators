import { FiTrash2, FiEdit, FiMessageCircle, FiSend } from 'react-icons/fi'
import './FeedComments.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth';
import api from "../../services/api";
import { parseISO, format} from 'date-fns';
import { Link } from 'react-router-dom';

function FeedComments({idPost}) {
    const Local = localStorage.getItem("foursome");
    const userData = JSON.parse(Local);
    const LocalInformation = localStorage.getItem("informations-foursome");
    const userInformation = JSON.parse(LocalInformation);


    const [dataComments, setDataComments] = useState([]);
    const [comment, setComment] = useState(false);
    const [commentText, setCommentText] = useState("");

    const {user, newComment, deleteComment} = useContext(AuthContext);
    useEffect(() => {
          async function Comments() {
            const res = await api.get(`/comments/${idPost}`);
            const dataPosts = (res.data)
            setDataComments(dataPosts)

        }

        Comments()

    }, [user, idPost, dataComments])


    function handleHabiliteComment () {
        if(comment === false) {
            setComment(true)
        } else {
            setComment(false) 
        }
    }

    function handleComment(idPost) {
    newComment({text: commentText, idPost, idAccount: userData.id, avatar:userInformation.avatar, nickname: userInformation.nickname, username: userData.username})
    setCommentText("");
    setComment(false) 
    }

    function handleDeleteComment(id) {
        deleteComment(id)
        }

    return (
        <div className="feedComments">
            <h5>{dataComments.length} comentários</h5>

                    
                             {dataComments.map((comments) => {
                                const date = parseISO(comments.created_at);
                                const dateFormated = format(
                                    date, 
                                "dd'/'MM'/'yyyy'-'HH:mm'"
                                );
                                 return (
                                    <div className="feed-comment" key={comments.id}>
                                    <div className="comment-user" >
                                        <div className="avatar">
                                    <Link to={`/profile-friend/${comments.idAccount}`}><img src={comments.avatar} alt="" /></Link>
                                        </div>

                                        <div className="name-data">
                                        <Link to={`/profile-friend/${comments.idAccount}`}><h4 className="selected">{comments.nickname}</h4></Link>

                                        <div className="time-data">
                                            <h5>{dateFormated}</h5>
                                        </div>


                                        <div className="reactions-comments" >
                                        {/* <button onClick={handleHabiliteComment}>
                                            <FiMessageCircle />
                                            Comentar
                                        </button> */}
                                        {comments.idAccount === userData.id ?
                                        <>
                                        <button>
                                            <FiEdit />
                                            Editar
                                        </button>
                                        <button onClick={() => {handleDeleteComment(comments.id)}}>
                                            <FiTrash2 />
                                            Apagar
                                        </button>
                                            </>
                                            : ""}
                                    </div>

                                       
                                        </div>
                                    </div>


                                    <div className="comment-data" >
                                        <p><i>{comments.text}</i></p>
                                    </div>

                                   
                                    

                                    <div className={comment === true ? "comment" : "commentHidden"}>
                                        <input type="text" placeholder='Comentar' value={commentText} onChange={(e) => setCommentText(e.target.value)}/> <button onClick={() => {handleComment()}}><FiSend /> Comentar</button>
                                    </div>

                                  
                                </div>
                                 )
                             })}
                          
  
        </div>
         
         
                        
    )
}

export {FeedComments}