import React, {useState} from 'react';
import {Row, Col, Button, NavLink, TabContent, TabPane, UncontrolledDropdown, Label, Collapse, NavbarToggler, Navbar} from "reactstrap";
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
import ModalProducto from "./modals/ModalProducto";
import Asistencia from "../Asistencia";
import SideBar from "./sidebar/SideBar";
import {url_base} from '../constants/api_url';
import { faCheck, faTrash, faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const api_url = url_base;

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
            isOpen: false,
            isOpenSidebar: false
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
        this.state.modalRecord ? this.setState({modalRecord: false}) : this.setState({modalRecord: true});
    };

    componentDidMount() {

        fetch(`${api_url}compruebaRenovaciones`, {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }

            }).then(response => {

                if(response.nombre){

                    this.setState({nombreSocio:response.nombre,nombreCompleto:response.nombreCompleto,socioMembresiaId:response.id});
                    this.toggleMembresiaModal();
                }
            }
        );

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


    toggleCollapse = () => (this.setState({isOpen:!this.state.isOpen}));
    toggleSidebar = () => (this.setState({isOpenSidebar:!this.state.isOpenSidebar}));

    render() {

        return (
            <div className="">
                <RenovarMembresia toggleMembresiaModal={this.toggleMembresiaModal}
                                  modalRecord={this.state.modalRecord}
                                  nombreSocio={this.state.nombreSocio}
                                  nombreCompleto={this.state.nombreCompleto}
                                  socioMembresiaId={this.state.socioMembresiaId}
                                  modalMembresia={this.state.modalMembresia}/>

                <header className="main-header ">
                    <Navbar className="header-dashboard navbar navbar-expand-xl animate fadeInDown one navbar-light top-navbar"
                         data-toggle="sticky-onscroll">
                        <div className="container">
                            <NavbarToggler onClick={this.toggleCollapse} />
                            <NavLink className="navbar-brand" to="#">LetyGym</NavLink>

                            <Collapse isOpen={this.state.isOpen} className="navbar-collapse justify-content-center" id="navbarSupportedContent" navbar>
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
                                <UncontrolledDropdown className="d-sm-none">
                                    <img src={require('../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                                    <DropdownToggle caret>
                                        Nombre del usuario
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>Mis datos de perfil</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Cerrar Sesión</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Collapse>
                            <UncontrolledDropdown className="d-none d-sm-block">
                                <img src={require('../assets/images.png')} width={35} height={35} className="rounded-circle"/>
                                <DropdownToggle caret>
                                    Nombre del usuario
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Mis datos de perfil</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Cerrar Sesión</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </Navbar>

                </header>
                <SideBar toggle={this.state.toggleSidebar} isOpen={this.state.isOpenSidebar}/>

                <div className="dashboard-content animate fadeInUp one">
                    <TabContent activeTab={this.state.activeTab} className="text-center">
                        <TabPane className={this.state.activeTab === 1 ? 'active' : ''} tabId="1">
                            <Row className="p-5 p-xl-4 justify-content-end">

                            </Row>
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 1 ?  <SociosTable toggleModal={() => this.toggleModal(1)}/> : ''}
                                    </div>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col className="pt-5 col-11">
                                    <div>
                                        {this.state.activeTab === 1 ? <VistantesTable/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 2 ? 'active' : ''} tabId="2">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 2 ? <VentasTable/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 3 ? 'active' : ''} tabId="3">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 3 ? <ProductosTable/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 4 ? 'active' : ''} tabId="4">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 4 ? <MembresiasTable/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 5 ? 'active' : ''} tabId="4">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 5 ? <AsistenciasTable/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 6 ? 'active' : ''} tabId="4">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 6 ? <PagosTable/> : ''}

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
