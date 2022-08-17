
import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import api from "../../../services/api";
import "./accountsPayments.css"

function AccountsPayments() {

    const [accounts, setAccount] = useState();

    useEffect(() => {
        async function loadAccounts() {
            const result = await api.get("/accounts");
            setAccount(result.data);
        }

        loadAccounts()
    }, [])


    const {data} = useFetch(`/payments/all`);

    const peddingPayments = data?.filter((payments) => payments.status === "pending")
    const aprovedPayments = data?.filter((payments) => payments.status === "aproved")
    const recudesPayments = data?.filter((payments) => payments.status === "recused")

    const premiumPayments = accounts?.filter((payments) => payments.status === "premium")
    const essencialPayments = accounts?.filter((payments) => payments.status === "essencial")
    const suspensesPayments = accounts?.filter((payments) => payments.status === "suspense")
    return (
        <div className="AccountsPayments">
             <h4><b>Clientes pagantes </b></h4>

             <div className="text3">
                <h3>Total</h3>
                <h3>{data?.length}</h3>
            </div>
            <div className="text">
                <h3>Aprovados</h3>
                <h3>{aprovedPayments?.length}</h3>
            </div>
            <div className="text2">
                <h3>Pendente</h3>
                <h3>{peddingPayments?.length}</h3>
            </div>
            <div className="text4">
                <h3>Recusados</h3>
                <h3>{recudesPayments?.length}</h3>
            </div>
            <div className="text5">
               <div className="accountsText">
               <h6>Premium</h6>
                <h6>{premiumPayments?.length}</h6> 
               </div>
               <div className="accountsText">
               <h6>Essencial</h6>
                <h6>{essencialPayments?.length}</h6> 
               </div>
               <div className="accountsText">
               <h6>Suspensas</h6>
                <h6>{suspensesPayments?.length}</h6> 
               </div>
            </div>

        </div>
    )
}

export {AccountsPayments}