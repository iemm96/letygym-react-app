import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "../Login";
import AdminIndex from "../admin/AdminIndex";

const AppRoutes = () =>
    <BrowserRouter>
        <Switch>
            <Route path="/admin/index" component={AdminIndex}/>
            <Route path="/" component={Login}/>
        </Switch>
    </BrowserRouter>;

export default AppRoutes;