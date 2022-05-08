import { useFetch } from "../../../hooks/useFetch";

function EventsCounter() {
    const {data} = useFetch(`/events`);

    
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

export { EventsCounter }