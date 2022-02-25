import {Route, Routes, Navigate} from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard/Dashboard';

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
           
            </Routes>
           
    )
}

export {Router}