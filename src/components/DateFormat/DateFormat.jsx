import { parseISO, format} from 'date-fns';

function DateFormat({date}) {
    const Newdate = parseISO(date);
    const datePost = format(
        Newdate, 
    "dd'/'MM'/'yyyy'"
    );

    return (
        <>
        <p>{datePost}</p>
        </>)
    
}

export {DateFormat}