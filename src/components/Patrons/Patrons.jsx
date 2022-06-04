import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { useFetch } from "../../hooks/useFetch";
import api from "../../services/api";
import { AccountCreatedInvite } from "../AccountCreatedInvite/AccountCreatedInvite"
import "./patrons.css"

function Patrons() {
    const {id} = useParams()


    const {data} = useFetch(`accounts/find/patron/${id}`);
 



    


    return (

        <div className="patronsList">
                <h3>{data?.length} Apadrinhados</h3>
<div className="patronsListAll">
                {data?.map((patrton) => {
                   return (
                    <div className="patronsUnic">
                    <div className="codes">
                    <h5> {patrton.username}</h5>
                    <h5>-</h5>
                    <h5><b>ID:</b>  {patrton.id}</h5>
                    </div>
                    <h5><b>E-mail:</b>  {patrton.email}</h5>
                    <h5><b>Tipo de conta:</b>  {patrton.type}</h5>
                    <AccountCreatedInvite mail={patrton.email} />
                </div>
                   )
                })}
</div>

        </div>
    )

}


export {Patrons}