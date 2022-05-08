import { useFetch } from "../../../hooks/useFetch";

function OnlineCounter() {
    const {data} = useFetch(`/online`);

    
    if(!data) {
        return (
            <>Carregando...</>
        )
    }


    return (
        <>
           {data?.length}
        </>
    )
}

export { OnlineCounter }