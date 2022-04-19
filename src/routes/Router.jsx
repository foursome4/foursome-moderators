import {Route, Routes, Navigate} from 'react-router-dom';
import { Feed } from '../components/Feed/Feed';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Invite } from '../pages/Invite/Invite';

import {SignIn} from "../pages/SignIn/SignIn"


function Router () {
const Local = localStorage.getItem("foursome");
const userLocal = JSON.parse(Local)

function PrivateRoute({children} ) {
    return userLocal !== null ? children : <Navigate to="/"/>
}

    return (

            <Routes>
            <Route path="/" element={<SignIn />}/>
            
            <Route path="/dashboard"
                    element={ <PrivateRoute> <Dashboard/> </PrivateRoute>} />
            <Route path="/feed"
                    element={ <PrivateRoute> <Feed/> </PrivateRoute>} />
            <Route path="/invites"
                    element={ <PrivateRoute> <Invite /> </PrivateRoute>} />
           
            </Routes>
           
    )
}

export {Router}