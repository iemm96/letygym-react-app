import React, {useState} from 'react';
import {Row, Col, Button, NavLink, TabContent, TabPane, UncontrolledDropdown} from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";
import ModalSocio from "./modals/ModalSocio";
import ActionsFormatter from "./actions/ActionsFormatter";
import SociosTable from "./tables/SociosTable";
import VistantesTable from "./tables/VisitantesTable";
import VentasTable from "./tables/VentasTable";
import ProductosTable from "./tables/ProductosTable";
import AsistenciasTable from "./tables/AsistenciasTable";
import PagosTable from "./tables/PagosTable";
import RenovarMembresia from "./modals/RenovarMembresia";
import MembresiasTable from "./tables/MembresiasTable";
import NuevoVisitante from "./modals/NuevoVisitante";
import RegistrarVenta from "./modals/RegistrarVenta";
import NuevoProducto from "./modals/NuevoProducto";
import Asistencia from "../Asistencia";

const { SearchBar } = Search;

export default class Dashboard extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            setActiveTab: 1,
            activeTab: 1,
            dropDownValue: 'Select action',
            dropdownOpen: false,
            modalMembresia: false,
        }
    }

    toggleModal = ( modal ) => {

        switch (modal) {
            case 1: {
                this.state.modalSocio ? this.setState({modalSocio: false}) : this.setState({modalSocio: true});

                break;
            }
            case 2:{
                this.state.modalVisitante ? this.setState({modalVisitante: false}) : this.setState({modalVisitante: true});
                break;
            }
            case 3: {
                this.state.modalVenta ? this.setState({modalVenta: false}) : this.setState({modalVenta: true});
                break;
            }
            case 4: {
                this.state.modalProducto ? this.setState({modalProducto: false}) : this.setState({modalProducto: true});
                break;
            }

            default: {

            }
        }
    };

    toggleMembresiaModal = () => {
        this.state.modalMembresia ? this.setState({modalMembresia: false}) : this.setState({modalMembresia: true});
    };

    componentDidMount() {

        //var searchInput = document.getElementById('search-bar-0');

        //searchInput.placeholder = 'Buscar';

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

    changeValue(e) {
        this.setState({dropDownValue: e.currentTarget.textContent})
    }

    toggle(tab) {
        if(this.state.activeTab !== tab) {
            this.setState({activeTab:tab})
        }
    }


    render() {

        return (
            <div className="mt-3">
                <RenovarMembresia toggleMembresiaModal={this.toggleMembresiaModal} nombreSocio="Paula"
                                  nombreCompleto="Paula Gutierréz"
                                  modalMembresia={this.state.modalMembresia}/>

                <header className="">
                    <nav className="header-dashboard navbar navbar-expand-lg navbar-light top-navbar  animate fadeInDown one"
                         data-toggle="sticky-onscroll">
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
                                        <NavLink className="nav-link" href="#"
                                                 onClick={() => {this.toggle(1)}}
                                                 className={this.state.activeTab === 1 ? 'active' : ''}>Socios y Visitantes
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#"
                                                 onClick={() => {this.toggle(2)}}
                                                 className={this.state.activeTab === 2 ? 'active' : ''}>Venta de Productos
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#"
                                                 onClick={() => {this.toggle(3)}}
                                                 className={this.state.activeTab === 3 ? 'active' : ''}>Catálogo de Productos
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#"
                                                 onClick={() => {this.toggle(4)}}
                                                 className={this.state.activeTab === 4 ? 'active' : ''}>Membresías
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#"
                                                 onClick={() => {this.toggle(5)}}
                                                 className={this.state.activeTab === 5 ? 'active' : ''}>Asistencias
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" href="#"
                                                 onClick={() => {this.toggle(6)}}
                                                 className={this.state.activeTab === 6 ? 'active' : ''}>Pagos
                                        </NavLink>
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
                            <Row className="p-5 justify-content-end">

                            </Row>
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        <SociosTable toggleModal={() => this.toggleModal(1)}/>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="p-5 justify-content-end">
                                <Col className="col-3">
                                    <Button className="actionButton" onClick={() => this.toggleModal(2)}>Nuevo Visitante</Button>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        <VistantesTable/>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 2 ? 'active' : ''} tabId="2">
                            <RegistrarVenta toggleModal={this.toggleModal} modalVenta={this.state.modalVenta}/>
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        <VentasTable/>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 3 ? 'active' : ''} tabId="3">
                            <NuevoProducto toggleModal={this.toggleModal} modalProducto={this.state.modalProducto}/>
                            <Row className="p-5 justify-content-end">
                                <Col className="col-3">
                                    <Button className="actionButton" onClick={() => this.toggleModal(4)}>Nuevo Producto</Button>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        <ProductosTable/>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 4 ? 'active' : ''} tabId="4">
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        <MembresiasTable/>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 5 ? 'active' : ''} tabId="4">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        <AsistenciasTable/>
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 6 ? 'active' : ''} tabId="4">
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        <PagosTable/>
                                    </div>
                                </Col>
                            </Row>
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
