import { useEffect, useState } from "react"
import api from "../../services/api"
import "./feedReply.css"

function FeedReply({id}) {
    const [Replys, setReplys] = useState([])
useEffect(() => {
    async function loadReplys() {
        await api.get(`/reply/${id}/`).then((res) => {
            setReplys(res.data)
        })
    }

    loadReplys()
})


    return (
        <div className="feedReply">
            {Replys.map((Reply) => {
                return (
                    <div className="bloco" key={Reply.id}>

                    <div className="ReplyUnic">
                        <div className="user">
                            <div className="image">
                                <img src={Reply.avatar} alt="" />
                            </div>
                            <h4>{Reply.nickname}</h4>
                        </div>
                        <h5>{Reply.text}</h5>
                    </div>
                    </div>
                )
            })}
        </div>
    )
}


export {FeedReply}