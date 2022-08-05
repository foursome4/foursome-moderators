import { useFetch } from "../../hooks/useFetch";
import "./replyNews.css"

function ReplyNews({id}) {
    const local = localStorage.getItem("foursome");
    const user = JSON.parse(local);
    const {data} = useFetch(`/newsreply/${id}`)

    if(data) {
        console.log(data)
    }
    return (
        <div className="ReplyNews">
                {data?.map((reply) => {
                    return (
                        <div className="ReplyNewsList" key={reply.id}>
                            <h4>{reply.nickname}</h4>
                            <h5>{reply.text}</h5>
                            {
                                reply.link === "" ? "" :
                            <img src={reply.link} alt={reply.text} />
                            }
                        </div>
                    )
                })}

        <div className="reply">
                <textarea name="" id="" cols="30" rows="5" placeholder="Digite sua resposta">

                </textarea>
                <button>Responder</button>
            </div>
        </div>
    )
}

export {ReplyNews}