import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from "../Login";
import SociosVisitantes from "../admin/SociosVisitantes";
import AsistenciaSocios from "../admin/AsistenciaSocios";
import CatalogoProductos from "../admin/CatalogoProductos";
import Membresias from "../admin/Membresias";
import VentaProductos from "../admin/VentaProductos";
import Dashboard from "../admin/Dashboard";

const AppRoutes = () =>
    <BrowserRouter>
        <Switch>
            <Route path="/admin/index" component={Dashboard}/>
            <Route path="/admin/catalogoProductos" component={Dashboard}/>
            <Route path="/admin/sociosVisitantes" component={SociosVisitantes}/>
            <Route path="/admin/membresias" component={Dashboard}/>
            <Route path="/admin/ventaProductos" component={Dashboard}/>
            <Route path="/" component={Login}/>
        </Switch>
    </BrowserRouter>;

export default AppRoutes;