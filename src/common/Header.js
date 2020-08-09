import React from 'react';
import {NavLink} from "react-router-dom";

const Header = () =>
    <header className="">
        <nav className="header-dashboard navbar navbar-expand-lg navbar-light top-navbar  animate fadeInDown one" data-toggle="sticky-onscroll">
            <div className="container">

                <NavLink className="navbar-brand" to="#">LetyGym</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">i</span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/admin/sociosVisitantes">Socios y Visitantes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/admin/ventaProductos">Venta de Productos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/admin/asistenciaSocios">Asistencia de Socios</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/admin/catalogoProductos">Catálogo de Productos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/admin/membresias">Membresías</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                    </ul>
                </div>
            </div>
        </nav>
    </header>;

export default Header;