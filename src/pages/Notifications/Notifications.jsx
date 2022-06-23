import "./notifications.css"
import Navbar from "../../components/Nav/Navbar";
import { useFetch } from "../../hooks/useFetch"
import { useEffect, useState } from "react";

function Notifications() {

    
    const [notifications, setNotifications] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const perPage = 20;

    const {data} = useFetch(`/notifications/all?page=${currentPage}&limit=${perPage}`);

    useEffect(() => {
        if(data) {
            setNotifications(oldNotifications => [...oldNotifications, ...data])
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


if(!notifications) {
      return (
          <div className="load">
              <h3>Carregando...</h3>
          </div>
      )
  }

    return (
        <div className="content">
        <div className="notifications">
            <Navbar />
            <h1>Notificações</h1>

            <div className="notifications-list">
                {notifications?.map((notification) => {
                     return (
                        <div className="unic" key={notification.id}>
                            <h5>Notificação: {notification.text} - {notification.idAccount}</h5>
                        </div>
                    )
                })}

<div id="sentinela">
                                <div className="image">
                                 <h4>Carregando...</h4>
                                  </div></div>
            </div>
        </div>
        </div>
    )
}

export {Notifications}