import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faPaperPlane, faQuestion, faImage, faCopy } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

const SideBar = props => (
    <div className={classNames('sidebar', {'is-open': props.isOpen})}>
      <div className="sidebar-header">
        <span color="info" onClick={props.toggle} style={{color: '#fff'}}>&times;</span>
        <h3>Lety Fitness Club</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem>
            <NavLink href="#"
                     onClick={() => {props.toggleTab(1)}}
                     className={(props.activeTab === 1 ? 'active' : '') + ' nav-link'}
            >
              Asistencias
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"
                     onClick={() => {props.toggleTab(2)}}
                     className={(props.activeTab === 2 ? 'active' : '') + ' nav-link'}
            >
              Visitas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"
                     onClick={() => {props.toggleTab(3)}}
                     className={(props.activeTab === 3 ? 'active' : '') + ' nav-link'}
            >
              Ingresos y Egresos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"
                     onClick={() => {props.toggleTab(4)}}
                     className={(props.activeTab === 4 ? 'active' : '') + ' nav-link'}
            >
              Venta de Productos
            </NavLink>
          </NavItem>
          <p className="divider" style={{borderTop:'1 px solid white',margin:0}}>
            <hr/>
          </p>
          <NavItem>
            <NavLink href="#"
                     onClick={() => {props.toggleTab(5)}}
                     className={(props.activeTab === 5 ? 'active' : '') + ' nav-link'}
            >
              Productos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"
                     onClick={() => {props.toggleTab(6)}}
                     className={(props.activeTab === 6 ? 'active' : '') + ' nav-link'}
            >
              Instructores
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"
                     onClick={() => {props.toggleTab(7)}}
                     className={(props.activeTab === 7 ? 'active' : '') + ' nav-link'}
            >
              Membresías
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#"
                     onClick={() => {props.toggleTab(8)}}
                     className={(props.activeTab === 8 ? 'active' : '') + ' nav-link'}
            >
              Socias
            </NavLink>
          </NavItem>


        </Nav>        
      </div>
    </div>
  );

  const submenus = [
    [
      {
        title: "Home 1",
        target: "Home-1"
      },
      {
        title: "Home 2",
        target: "Home-2",        
      },
      {
        itle: "Home 3",
        target: "Home-3",      
      }
    ],
    [
      {
        title: "Page 1",
        target: "Page-1",          
      },
      {
        title: "Page 2",
        target: "Page-2",        
      }
    ]
  ]
  

export default SideBar;
