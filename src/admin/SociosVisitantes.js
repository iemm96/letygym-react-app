import React, {useState} from 'react';
import {NavItem, NavLink, TabContent, TabPane, UncontrolledDropdown} from "reactstrap";
import Header from "../common/Header";
import {useParams} from 'react-router-dom';
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
export default class SociosVisitantes extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            setActiveTab: 1,
            activeTab: 0,
            dropDownValue: 'Select action',
            dropdownOpen: false
        }
    }

    componentDidMount() {

        let self = this;
        var elements = document.querySelectorAll('[data-toggle="sticky-onscroll"]');
        // Find all data-toggle="sticky-onscroll" elements

        const url = this.props.match.path;


        [].forEach.call(elements, function(element) {

            let div = document.createElement('div');
            div.classList.add('sticky-wrapper');

            var sticky = element;
            var stickyWrapper = div;
            sticky.before(stickyWrapper);
            sticky.classList.add('sticky');

            // Scroll & resize events
            window.addEventListener('scroll', function () {
                self.stickyToggle(sticky, stickyWrapper, window);
            });

            // On page load
            self.stickyToggle(sticky, stickyWrapper, window);
        });

    }

    changeValue(e)
    {
        this.setState({dropDownValue: e.currentTarget.textContent})
    }

    toggle(tab) {
        console.log(tab);
        if(this.state.activeTab !== tab) {
            this.setState({activeTab:tab})
        }
    }

    render() {

        return (

            <div className="mt-3">
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
                                        <NavLink className="nav-link" onClick={() => {this.toggle(1)}}>Socios y Visitantes</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" onClick={() => {this.toggle(2)}} >Venta de Productos</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" onClick={() => {this.toggle(3)}}>Asistencia de Socios</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link"  onClick={() => {this.toggle(4)}}>Catálogo de Productos</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link"   onClick={() => {this.toggle(5)}}>Membresías</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="justify-content-end" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <img src={require('../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                                    <UncontrolledDropdown>
                                        <DropdownToggle caret>
                                            Nombre del usuario
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>Mis datos de perfil</DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem>Cerrar Sesión</DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
                <div className="dashboard-content animate fadeInUp one">
                    <TabContent activeTab={this.state.activeTab} className="text-center">
                        <TabPane className={this.state.activeTab === 1 ? 'active' : ''} tabId="1">
                            <p>1</p>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 2 ? 'active' : ''} tabId="2">
                            <p>2</p>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 3 ? 'active' : ''} tabId="3">
                            <p>3</p>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 4 ? 'active' : ''} tabId="4">
                            <p>4</p>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        );

    }

    setActiveTab(url)
    {
        switch (url) {
            case '/admin/asistenciaSocios':{
                this.setState(this.activeTab(1));
                break;
            }
            case '/admin/catalogoProductos':{
                this.setState(this.activeTab(2));

                break;
            }
            case '/admin/sociosVisitantes':{
                this.setState({activeTab: 1});

                break;
            }
            case '/admin/membresias':{
                this.setState(this.setActiveTab(4));

                break;
            }
            case '/admin/ventaProductos':{
                this.setState(this.setActiveTab(5));

                break;
            }
            default:{

            }
        }

    }

    stickyToggle(sticky, stickyWrapper, scrollElement) {

        var stickyHeight = sticky.offsetHeight;
        var stickyTop = stickyWrapper.offsetTop;

        if (scrollElement.pageYOffset >= stickyTop) {
            sticky.classList.add("is-sticky");

            stickyWrapper.style.height = stickyHeight + 'px';
        } else {
            sticky.classList.remove("is-sticky");
            stickyWrapper.style.height = 'auto';
        }
    };

    clearInput(e)
    {
        e.target.classList.remove('bounce');
    }

};
