import { useFetch } from "../../hooks/useFetch";

function AccountCreatedInvite({mail}) {

    const {data} = useFetch(`/accounts/find/${mail}`);

    if(!data) {
        return (
            <div className="load">
                <h5>Carregando...</h5>
            </div>
        )
    }



    return (
        <div className="account">
            <h5><b>{data[0] === undefined || data[0] === "" ? "Sem conta criada" : `Conta criada com o id: ${data[0].id}`}</b></h5>
        </div>
    )
}

export { AccountCreatedInvite }
