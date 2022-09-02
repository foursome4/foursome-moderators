import { parseISO, format} from 'date-fns';

function DateFormatPosts({date}) {
    const Newdate = parseISO(date);
    const datePost = format(
        Newdate, 
        "dd'/'MM'/'yyyy' às 'HH:mm'h'"
    );

    return (
        <>
        <p style={{color: '#828FA9'}}><b>{datePost}</b></p>
        </>)
    
}

export {DateFormatPosts}