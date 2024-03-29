import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth';
import { useFetch } from '../../hooks/useFetch';
import { DataUser } from '../DataUser/DataUser';
import { FeedComment } from '../FeedComment/FeedComment';
import './feed.css'



function Feed() {
    const {deletePost} = useContext(AuthContext);

    const [followers, setFollowers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const perPage = 5;
    const {data} = useFetch(`/posts/all?page=${currentPage}&limit=${perPage}`);

    function handleDeletePost(id) {
        const deletar = window.confirm("Deseja deletar a postagem?");
        if(deletar === true) {
            deletePost(id);
        } 
    }
    
    useEffect(() => {
        if(data) {
            setFollowers(oldFollowers => [...oldFollowers, ...data])
        }
  }, [data]);


  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        console.log('Sentinela appears!', currentPage + 1)
        setCurrentPage((currentValue) => currentValue + 1);
      }
    })
    intersectionObserver.observe(document.querySelector('#sentinela'));
    return () => intersectionObserver.disconnect();
  }, []);


if(!followers) {
      return (
          <div className="load">
              <h3>Carregando...</h3>
          </div>
      )
  }


    return(
        <div className="feed">
        <div className="feed-posts">
            {followers?.map((post) => {
               return (
                <div className="postIndividual" key={post.id}>
                <DataUser idAccount={post.idAccount} id={post.id} date={post.created_at}/>
                <div className="media">
                    <div className="postText">
                        <h4>{post.text}</h4>
                    </div>
                    {post.type === "post-photo" ?
                    <div className="image">
                        <img src={post.link} alt={post.link} /> 
                    </div>
                    : post.type === "post-video" ?
                    <div className="movie">
                    <video playsInline controls type="video/mp4">
                        <source playsInline src={post.link} type="video/mp4" />
                        <source playsInline src={post.link} type="video/ogg" />
                        <source playsInline src={post.link} type="video/webm" />
                    </video>
                    </div>
                     :   ""
                }
                </div>

                <div className="buttons">
                    <button onClick={() => {handleDeletePost(post.id)}}>Deletar Postagem</button>
                </div>
                <div className="comment">
                        <FeedComment id={post.id} />
                    </div>
            </div>
               )
            })}

                                <div id="sentinela">
                                <div className="image">
                                 <h4>Carregando...</h4>
                                  </div></div>

        </div>
        </div>
    )
}

export { Feed }