import React from 'react';
import {Row, Col,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem, Button, NavLink, TabContent, TabPane, Collapse, Navbar} from "reactstrap";

import SociasTable from "./tables/SociasTable";
import VistantesTable from "./tables/VisitantesTable";
import VentasTable from "./tables/VentasTable";
import ProductosTable from "./tables/ProductosTable";
import AsistenciasTable from "./tables/AsistenciasTable";
import RenovarMembresia from "./modals/RenovarMembresia";
import MembresiasTable from "./tables/MembresiasTable";
import SideBar from "./sidebar/SideBar";
import {url_base} from '../constants/api_url';
import { faBars} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import IngresosEgresos from "./sections/IngresosEgresos";
import InstructoresTable from "./tables/InstructoresTable";
import Background from './../assets/img/img-background-afternoon.svg';
import BackgroundDay from './../assets/img/img-background-day.svg';

const api_url = url_base;

const customStyles = {backgroundImage:`url(${Background})`,backgroundaAttachment:'fixed',backgroundSize: '100%', color: 'white'};
const customStylesDay = {backgroundImage:`url(${BackgroundDay})`,backgroundaAttachment:'fixed',backgroundSize: '100%'};

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
            isOpenSidebar: false,
            turnoActual:0,
            costoVisita:0,
            checked:true
        }
    }

    toggleModal = ( modal ) => {

        switch (modal) {
            case 1: {
                this.state.ModalSocia ? this.setState({ModalSocia: false}) : this.setState({ModalSocia: true});

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

        fetch(`${api_url}appStatus/1`, {
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

                if(response.turnoActual){
                    this.setState({turnoActual:response.turnoActual,costoVisita:response.costo_visita});
                }
            }
        );

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

    toggle(tab) {
        if(this.state.activeTab !== tab) {
            this.setState({activeTab:tab})
        }
    }

    handleChangeTurno = async turno => {

        try {
            const response = await axios({
                url:`${api_url}updateTurnoActual/${turno}`,
                method: 'PUT',
                headers: {"Content-Type": "application/json",}
            });
            if(response) {
                this.setState({turnoActual:turno});
                console.log(response);
            }
        }catch (e) {
            console.log(e);
        }
    };

    toggleSidebar = () => (this.setState({isOpenSidebar:!this.state.isOpenSidebar}));

    renderSwitch(param) {
        switch(param) {
            case 0:
                return <Button onClick={() => this.handleChangeTurno(1)}>
                    Iniciar turno Matutino
                </Button>;
            case 1:
                return <Button onClick={() => this.handleChangeTurno(2)}>
                    Finalizar turno Matutino
                </Button>;
            case 2:
                return <Button onClick={() => this.handleChangeTurno(3)}>
                    Iniciar turno Vespertino
                </Button>;
            case 3:
                return <Button onClick={() => this.handleChangeTurno(0)}>
                    Finalizar turno Vespertino
                </Button>;
            default:
                return <p>Cargando...</p>;
        }
    }

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
                            <Button color="info" className="d-xl-none" onClick={this.toggleSidebar}>
                                <FontAwesomeIcon icon={faBars}/>
                            </Button>
                            <NavLink className="navbar-brand" to="#">Lety Fitness Club</NavLink>

                            <Collapse isOpen={this.state.isOpen} className="navbar-collapse justify-content-center" id="navbarSupportedContent" navbar>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink href="#"
                                                 onClick={() => {this.toggle(1)}}
                                                 className={(this.state.activeTab === 1 ? 'active' : '') + ' nav-link'}>Asistencias
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink href="#"
                                                 onClick={() => {this.toggle(2)}}
                                                 className={(this.state.activeTab === 2 ? 'active' : '') + ' nav-link'}>Visitas
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink href="#"
                                                 onClick={() => {this.toggle(3)}}
                                                 className={(this.state.activeTab === 3 ? 'active' : '') + ' nav-link'}>Ingresos y Egresos
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink href="#"
                                                 onClick={() => {this.toggle(4)}}
                                                 className={(this.state.activeTab === 4 ? 'active' : '') + ' nav-link'}>Venta de Productos
                                        </NavLink>
                                    </li>
                                </ul>
                                <span style={{color:'white'}}>|</span>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        Administrar
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem
                                            onClick={() => {this.setState({activeTab:5})}}
                                            className={this.state.activeTab === 5 ? 'active' : ''}>Productos
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {this.setState({activeTab:6})}}
                                            className={this.state.activeTab === 6 ? 'active' : ''}>Instructores
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {this.setState({activeTab:7})}}
                                            className={this.state.activeTab === 7 ? 'active' : ''}>Membresías
                                        </DropdownItem>
                                        <DropdownItem
                                            onClick={() => {this.setState({activeTab:8})}}
                                            className={this.state.activeTab === 8 ? 'active' : ''}>Socias
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Collapse>
                            {this.renderSwitch(this.state.turnoActual)}
                        </div>
                    </Navbar>
                </header>

                <SideBar toggle={this.state.toggleSidebar} isOpen={this.state.isOpenSidebar}/>

                <div className="mb-5 dashboard-content animate fadeInUp one" style={this.state.turnoActual === 0 && this.state.activeTab === 3 ? customStyles :
                    (this.state.turnoActual === 2 && this.state.activeTab === 3 ? customStylesDay : {})
                }>
                    <TabContent activeTab={this.state.activeTab} className="text-center">
                        <TabPane className={this.state.activeTab === 1 ? 'active' : ''} tabId="2">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 1 ? <AsistenciasTable turnoActual={this.state.turnoActual}/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 2 ? 'active' : ''} tabId="2">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 2 ? <VistantesTable costoVisita={this.state.costoVisita} turnoActual={this.state.turnoActual}/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 3 ? 'active' : ''} tabId="1">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 3 ? <IngresosEgresos turnoActual={this.state.turnoActual}/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 4 ? 'active' : ''} tabId="2">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 4 ? <VentasTable turnoActual={this.state.turnoActual}/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 5 ? 'active' : ''} tabId="3">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 5 ? <ProductosTable/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 6 ? 'active' : ''} tabId="3">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    {this.state.activeTab === 6 ? <InstructoresTable/> : ''}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 7 ? 'active' : ''} tabId="4">
                            <Row className="pt-5 justify-content-center">
                                <Col className="col-11">
                                    <div>
                                        {this.state.activeTab === 7 ? <MembresiasTable/> : ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane className={this.state.activeTab === 8 ? 'active' : ''} tabId="1">
                            <Row className="justify-content-center">
                                <Col className="col-11">
                                        {this.state.activeTab === 8 ? <SociasTable/> : ''}
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
                <div className="sticky-footer">
                    <div className="container text-center">
                        <small>Desarrollado por <a href="http://nucleodev.com">NucleoDev</a> - Todos los Derechos Reservados</small>
                    </div>
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

};
