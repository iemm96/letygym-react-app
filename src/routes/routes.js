import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "../Login";
import Dashboard from "../admin/Dashboard";
import ReactNotification from 'react-notifications-component'

const AppRoutes = () =>
    <div>
        <ReactNotification/>
        <BrowserRouter>
            <Switch>
                <Route path="/admin/index" component={Dashboard}/>
                <Route path="/login" component={Login}/>
                <Route path="/admin" component={Dashboard}/>
            </Switch>
        </BrowserRouter>
    </div>
    ;

export default AppRoutes;