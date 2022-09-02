import { DateFormat } from "../DateFormat/DateFormat";
import { FeedComponents } from "../FeedComponents/FeedComponents";
import "./event.css";
function Event({avatar, cover, name, description, idAccount, username, theme, avatarUser, link, adrress, date}){
    return (
        <div className="Event">
           {avatar === undefined || avatar === "" ?
           <>
           <br />
           <br />
           <h2>Selecione um evento</h2>
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
            <br />
            <p>Endereço:</p>
            <h5><b>{adrress}</b></h5>
            <p>Data:</p>
            <h5><b><DateFormat  date={date}/></b></h5>

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

export {Event}