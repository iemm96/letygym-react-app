import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "../Login";
import Dashboard from "../admin/Dashboard";
import Asistencia from "../Asistencia";

const AppRoutes = () =>
    <BrowserRouter>
        <Switch>
            <Route path="/admin/index" component={Dashboard}/>
            <Route path="/login" component={Login}/>

            <Route path="/" component={Asistencia}/>
        </Switch>
    </BrowserRouter>;

export default AppRoutes;