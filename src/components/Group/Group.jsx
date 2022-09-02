import { FeedComponents } from "../FeedComponents/FeedComponents";
import "./group.css";
function Group({avatar, cover, name, description, idAccount, username, theme, avatarUser, link}){
    return (
        <div className="Group">
           {avatar === undefined || avatar === "" ?
           <>
           <br />
           <br />
           <h2>Selecione um grupo</h2>
           </>
           :<>
            <div className="cover">
                <img src={cover} alt="" />
            </div>
            <div className="avatar">
                <img src={avatar} alt="" />
            </div>
            <h2>{name}</h2>
            <h4>{description}</h4>
            <h5>{theme}</h5>

            <div className="user">
            <div className="image">
                <img src={avatarUser} alt="" />
            </div>
            <h4>{idAccount} - {username}</h4>
            </div>

            <FeedComponents link={link}/>
            </>}
        </div>
    )
}

export {Group}