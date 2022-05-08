import { useContext } from "react"
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import "./feedReply.css"

function FeedReply({id}) {
    
    
    const {deleteReply} = useContext(AuthContext);

const {data} = useFetch(`/reply/${id}/`);

function handleDeleteReply(id) {
    const deletar = window.confirm("Deseja deletar a Resposta?");
    if(deletar === true) {
        toast.error(id)
        deleteReply(id);
    } 
   
}

if(!data) {
    return (
        <>Carregando...</>
    )
}



    return (
        <div className="feedReply">
            {data?.map((Reply) => {
                return (
                    <div className="bloco" key={Reply.id}>

                    <div className="ReplyUnic">
                        <div className="user">
                            <div className="image">
                                <img src={Reply.avatar} alt="Avatar" />
                            </div>
                            <h4>{Reply.nickname}</h4>
                        </div>
                        <h5>{Reply.text}</h5>
                    </div>
                    <div className="buttons">
                    <button onClick={() => {handleDeleteReply(Reply.id)}}>Deletar Resposta</button>
                   </div>
                    </div>
                )
            })}
        </div>
    )
}


export {FeedReply}