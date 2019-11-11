import React, {useState} from 'react';
import {NavItem, NavLink, TabContent, TabPane, UncontrolledDropdown} from "reactstrap";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import Dropdown from "reactstrap/es/Dropdown";

export default class AdminIndex extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            setActiveTab: 1,
            activeTab: 1,
            dropDownValue: 'Select action',
            dropdownOpen: false
        }
    }

    componentDidMount() {

        let self = this;
        var elements = document.querySelectorAll('[data-toggle="sticky-onscroll"]');
        // Find all data-toggle="sticky-onscroll" elements


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

    render() {


        return (
            <div className="mt-3">
                <header className="">
                    <nav className="header-dashboard navbar navbar-expand-lg navbar-light top-navbar  animate fadeInDown one" data-toggle="sticky-onscroll">
                        <div className="container">

                            <a className="navbar-brand" href="#">LetyGym</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon">i</span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">Socios y Visitantes</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Ventas</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Asistencia de Socios</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Catálogo de Productos</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Membresías</a>
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
                        <TabPane tabId="1">
                            <p>1</p>
                        </TabPane>
                        <TabPane tabId="2">
                            <p>2</p>
                        </TabPane>
                        <TabPane tabId="3">
                            <p>3</p>
                        </TabPane>
                        <TabPane tabId="4">
                            <p>4</p>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        );

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
