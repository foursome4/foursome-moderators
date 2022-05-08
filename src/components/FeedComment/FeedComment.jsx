import { useContext } from "react"
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import { FeedReply } from "../FeedReply/FeedReply"
import "./feedComment.css"

function FeedComment({id}) {
    
const {deleteComment} = useContext(AuthContext);

const {data} = useFetch(`/comments/${id}/`);

function handleDeleteComment(id) {
    const deletar = window.confirm("Deseja deletar o comentário?");
    if(deletar === true) {
        deleteComment(id);
    } 
    
}

if(!data) {
    return (
        <>Carregando...</>
    )
}


    return (
        <div className="feedComment">
            {data?.map((comment) => {
                return (
                    <div className="bloco" key={comment.id}>

                    <div className="commentUnic">
                        <div className="user">
                            <div className="image">
                                <img src={comment.avatar} alt="Avatar" />
                            </div>
                            <h4>{comment.nickname}</h4>
                        </div>
                        <h5>{comment.text}</h5>
                    </div>

                    <div className="buttons">
                    <button onClick={() => {handleDeleteComment(comment.id)}}>Deletar Comentário</button>
                   </div>

                    <div className="reply">
                        <FeedReply id={comment.id} />
                    </div>

                    </div>
                )
            })}
        </div>
    )
}


export {FeedComment}