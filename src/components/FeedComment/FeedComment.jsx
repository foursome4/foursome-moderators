import { useEffect, useState } from "react"
import api from "../../services/api"
import { FeedReply } from "../FeedReply/FeedReply"
import "./feedComment.css"

function FeedComment({id}) {
    const [comments, setComments] = useState([])
useEffect(() => {
    async function loadComments() {
        await api.get(`/comments/${id}/`).then((res) => {
            setComments(res.data)
        })
    }

    loadComments()
})


    return (
        <div className="feedComment">
            {comments.map((comment) => {
                return (
                    <div className="bloco" key={comment.id}>

                    <div className="commentUnic">
                        <div className="user">
                            <div className="image">
                                <img src={comment.avatar} alt="" />
                            </div>
                            <h4>{comment.nickname}</h4>
                        </div>
                        <h5>{comment.text}</h5>
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