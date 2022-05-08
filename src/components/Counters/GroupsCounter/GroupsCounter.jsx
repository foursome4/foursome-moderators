import { useFetch } from "../../../hooks/useFetch";

function GroupsCounter() {
    const {data} = useFetch(`/groups`);

    
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

export { GroupsCounter }