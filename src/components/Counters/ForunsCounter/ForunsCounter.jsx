import { useFetch } from "../../../hooks/useFetch";

function ForunsCounter() {
    const {data} = useFetch(`/foruns`);

    
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

export { ForunsCounter }