
import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import api from "../../../services/api";
import "./accountsPayments.css"

function AccountsPayments() {

    const [accounts, setAccount] = useState();
    const [month, setMonth] = useState(new Date().getMonth() +1);

    useEffect(() => {
        async function loadAccounts() {
            const result = await api.get("/accounts");
            setAccount(result.data);
        }

        loadAccounts()
    }, [])

    function handleSelectMonth(e) {
        setMonth(e.target.value)
    }


    const {data} = useFetch(`/payments/all`);

    const totalPayments = data?.filter((payments) => new Date(payments.created_at).getMonth() +1 === parseInt(month) )
    const peddingPayments = data?.filter((payments) => payments.status === "pending" && (new Date(payments.created_at).getMonth() +1 === parseInt(month) ))
    const aprovedPayments = data?.filter((payments) => payments.status === "aproved" && (new Date(payments.created_at).getMonth() +1 === parseInt(month) ))
    const recudesPayments = data?.filter((payments) => payments.status === "recused" && (new Date(payments.created_at).getMonth() +1 === parseInt(month) ))

    const premiumAccounts = accounts?.filter((accounts) => accounts.status === "premium")
    const essencialAccounts = accounts?.filter((accounts) => accounts.status === "essencial")
    const suspensesAccounts = accounts?.filter((accounts) => accounts.status === "suspense")
    return (
        <div className="AccountsPayments">
             <h4><b>Clientes pagantes </b></h4>

             <select value={month} onChange={handleSelectMonth}>
                                <option>Escolha o mês</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                                <option value="3">Março</option>
                                <option value="4">Abril</option>
                                <option value="5">Maio</option>
                                <option value="6">Junho</option>
                                <option value="7">Julho</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </select>

             <div className="text3">
                <h3>Total</h3>
                <h3>{totalPayments?.length}</h3>
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
               <h6>Premium: </h6>
                <h6>{premiumAccounts?.length}</h6> 
               </div>
               <div className="accountsText">
               <h6>Suspensas: </h6>
                <h6>{suspensesAccounts?.length}</h6> 
               </div>
            </div>

        </div>
    )
}

export {AccountsPayments}