import { useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/Auth';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  li {
    padding: 18px 10px;
  }

  li a {
    text-decoration: none;
    color: var(--Background);
}

button {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 6px;
  background-color:crimson;
  color: aliceblue;
  padding: 5px 10px;
  margin: 10px 0;
}

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

    li {
      color: #fff;
    }

  }
`;


const RightNav = ({ open }) => {

  const {logout} = useContext(AuthContext)

function handleLogout(e) {
    e.preventDefault();

    logout()
}


  return (
    <Ul open={open}>
      <li>
      <a href="/dashboard" > Dashboard</a>          
      </li>
      <li>
      <a href="/feed" > Feed</a>
      </li>
      <li>
      <a href="/invites" > Convites</a>
      </li>
      <li>
      <a href="/accounts" > Contas</a>
      </li>
      <li>
      <a href="/recados" > Recados</a>
      </li>
      <li>
      <a href="/notifications" > Notificações</a>
      </li>
      <li>
      <a href="/events" > Eventos</a>
      </li>
      <li>
      <a href="/groups" > Grupos</a>
      </li>
      <li>
      <a href="/foruns" > Foruns</a>
      </li>
      <li>
      <a href="/plains" > Planos</a>
      </li>
      <li>
      <a href="/payments" > Pagamentos</a>
      </li>
      <button onClick={handleLogout}>Sair</button>
    </Ul>
  )
}

export default RightNav
