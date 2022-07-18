import {Route, Routes, Navigate} from 'react-router-dom';
import { Feed } from '../components/Feed/Feed';
import { Accounts } from '../pages/Accounts/Accounts';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Events } from '../pages/Events/Events';
import { Foruns } from '../pages/Foruns/Foruns';
import { Groups } from '../pages/Groups/Groups';
import { Invite } from '../pages/Invite/Invite';
import { Notifications } from '../pages/Notifications/Notifications';
import { Patron } from '../pages/Patron/Patron';
import { Payments } from '../pages/Payments/Payments';
import { Plains } from '../pages/Plains/Plains';

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
            <Route path="/patron/:id"
                    element={ <PrivateRoute> <Patron /> </PrivateRoute>} />
            <Route path="/plains"
                    element={ <PrivateRoute> <Plains /> </PrivateRoute>} />
            <Route path="/payments"
                    element={ <PrivateRoute> <Payments /> </PrivateRoute>} />
            <Route path="/notifications"
                    element={ <PrivateRoute> <Notifications /> </PrivateRoute>} />
            <Route path="/accounts"
                    element={ <PrivateRoute> <Accounts /> </PrivateRoute>} />
            <Route path="/groups"
                    element={ <PrivateRoute> <Groups /> </PrivateRoute>} />
            <Route path="/foruns"
                    element={ <PrivateRoute> <Foruns /> </PrivateRoute>} />
            <Route path="/events"
                    element={ <PrivateRoute> <Events /> </PrivateRoute>} />
           
            </Routes>
           
    )
}

export {Router}