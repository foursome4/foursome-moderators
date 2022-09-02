import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import api from "../../../services/api";
import "./paymentsNumbers.css"


function PaymentsNumbers() {
    const [accounts, setAccount] = useState();
    const [month, setMonth] = useState(new Date().getMonth() +1);




    useEffect(() => {
        async function loadAccounts() {
            const result = await api.get("/accounts");
            setAccount(result.data.length);
        }

        loadAccounts()
    }, [])

    const {data} = useFetch(`/payments/all`);

    const aprovedPayments = data?.filter((payments) => payments.status === "aproved" && (new Date(payments.created_at).getMonth() +1 === parseInt(month) ))

    const payments = aprovedPayments?.reduce(function (acumulador, objetoAtual){
        return acumulador + parseFloat(objetoAtual.value);
      }, 0);


      console.log("accounts");
      console.log(accounts);
      console.log("accounts divisor");
      const goal = (accounts / 3) * 29.90;
      const result = goal - payments


      function handleSelectMonth(e) {
        setMonth(e.target.value)
    }


    var atual = goal;
    //com R$
    var GoalBRL = atual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    // //sem R$
    // var f2 = atual.toLocaleString('pt-br', {minimumFractionDigits: 2});
    var atual = result;
    //com R$
    var ResultBRL = atual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    // //sem R$
    // var f2 = atual.toLocaleString('pt-br', {minimumFractionDigits: 2});

    

    return (
        <div className="PaymentsNumbers">
            <h4><b>Rendimentos </b></h4>
           
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
                <h3>Total de pagamentos</h3>
                <h3>R$ {payments}</h3>
            </div>
            <div className="text">
                <h3>Meta do mês</h3>
                <h3> {GoalBRL}</h3>
            </div>
            <div className={result < goal ? "text4" : "text3" }>
                <h3>Resultados</h3>
                <h3>{result < goal ? `- ${ResultBRL}` : `+ ${ResultBRL}` }</h3>
            </div>
            <h5>A meta é definida com 1/3 do total de contas, multiplicadas por de R$ 29,90</h5>
        </div>
    )
}

export {PaymentsNumbers}