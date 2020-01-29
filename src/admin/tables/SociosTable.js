import React from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col, TabPane} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import ModalSocio from "../modals/ModalSocio";
import { Row } from "reactstrap";
import EliminarRegistroModal from "../modals/EliminarRegistroModal";
import {url_base} from '../../constants/api_url';

const { SearchBar } = Search;
const api_url = url_base;

let socios = [{

}];

const Buscador = (props) => {
    let input;
    const search = () => {
        props.onSearch(input.value);
    };
    return (
        <Row className="row mb-2 justify-content-between">
            <div className="col-3">
                <input
                    placeholder="Buscar Socios..."
                    className="form-control"
                    ref={ n => input = n }
                    type="text"
                    onChange={search}
                />
            </div>
            <div className="col-2">
                <Button className="actionButton" onClick={() => props.prepareNewModal()}>Nuevo Socio</Button>
            </div>
        </Row>
    );
};

class SociosTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            socios: socios,
            edit: false,
            idSocio: null,
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            id_membresia: ''
        };
    }

    componentDidMount() {

        fetch(`${api_url}sociosMembresias`, {
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

            }).then(response =>
                this.setState({socios: response})
        );
    }

    toggleModal = () => {
        this.state.modalSocio ? this.setState({modalSocio: false}) : this.setState({modalSocio: true});
    };

    prepareNewModal = () => {
        this.setState({edit: false});

        this.toggleModal();
    }

    prepareEditModal = id => {
        this.setState({edit: true, idSocio: id});

        fetch(`${api_url}socios/${id}`, {
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

            }).then(response =>
            this.setState({
                nombre: response.nombre,
                apellidoPaterno: response.apellidoPaterno,
                apellidoMaterno: response.apellidoMaterno,
                id_membresia: response.id_membresia
            })
        );

        this.toggleModal();
    }

    toggleDeleteModal = () => {
        this.state.deleteModal ? this.setState({deleteModal: false}) : this.setState({deleteModal: true});
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleNewSocio = event => {

        event.preventDefault();
        fetch(`${api_url}socios`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:JSON.stringify({
                nombre:this.state.nombre,
                apellidoPaterno:this.state.apellidoPaterno,
                apellidoMaterno:this.state.apellidoMaterno,
                id_membresia:this.state.id_membresia,
            })
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))

    }

    handleEditSocio = event => {

        event.preventDefault();
        fetch(`${api_url}socios/${this.state.idSocio}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:JSON.stringify({
                nombre:this.state.nombre,
                apellidoPaterno:this.state.apellidoPaterno,
                apellidoMaterno:this.state.apellidoMaterno,
                id_membresia:this.state.id_membresia,
            })
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
    }

    prepareDeleteModal = (id,nombre) => {
        this.setState({idSocio: id, nombre: nombre});

        this.toggleDeleteModal();
    }

    deleteRegister = () => {
        fetch(`${api_url}socios/${this.state.idSocio}`, {
            method: 'DELETE',
        }).then((res) => res)
            .then((data) =>  {
                if(data.ok) {
                    window.location.reload();
                }
            })
            .catch((err)=>console.log(err))
    }


    actionsFormatter = (cell, row) => (<div>
         <Button type="Button" onClick={() => this.prepareEditModal(row.id)} className="btn mr-2 btn-primary"><FontAwesomeIcon icon={faEdit}/></Button>
         <Button type="Button" onClick={() => this.prepareDeleteModal(row.id, row.nombre)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
     </div>);

     render() {

         const {error} = this.state;

         if(error) {
             alert(error.message);
             return;
         }

         const columns = [{
             dataField: 'nombreCompleto',
             text: 'Nombre',
             sort: true,
         },{
             dataField: 'membresia',
             text: 'Membresía',
             sort: true,
         },{
             dataField: 'fecha_fin',
             text: 'Membresía hasta',
             sort: true,
         },{
             dataField: 'bActiva',
             text: 'Status',
             sort: true,
         },{
             dataField: 'actions',
             text: 'Acciones',
             isDummyField: true,
             csvExport: false,
             formatter: this.actionsFormatter,
         },];

         const options = {
             custom: true,
             paginationSize: 4,
             pageStartIndex: 1,
             firstPageText: 'Inicio',
             prePageText: 'Atrás',
             nextPageText: 'Siguiente',
             lastPageText: 'Final',
             nextPageTitle: 'Primer página',
             prePageTitle: 'Página anterior',
             firstPageTitle: 'Página siguiente',
             lastPageTitle: 'Última página',
             showTotal: true,
             totalSize: socios.length
         };

         const contentTable = ({ paginationProps, paginationTableProps }) => (
             <div>
                 <ModalSocio
                     toggleModal={this.toggleModal}
                     handleNewSocio={this.handleNewSocio}
                     handleEditSocio={this.handleEditSocio}
                     handleInputChange={this.handleInputChange}
                     modalSocio={this.state.modalSocio}
                     editMode={this.state.edit}
                     idSocio={this.state.idSocio}
                     nombre={this.state.nombre}
                     apellidoPaterno={this.state.apellidoPaterno}
                     apellidoMaterno={this.state.apellidoMaterno}
                     id_membresia={this.state.id_membresia}
                 />
                 <EliminarRegistroModal
                     toggleDeleteModal={this.toggleDeleteModal}
                     titulo={this.state.nombre}
                     deleteRegister={this.deleteRegister}
                     deleteModal={this.state.deleteModal}/>
                 <ToolkitProvider
                     keyField="id"
                     columns={ columns }
                     data={ this.state.socios }
                     search>
                     {
                         toolkitprops => (
                             <div>
                                 <Buscador prepareNewModal={this.prepareNewModal} { ...toolkitprops.searchProps } />
                                 <BootstrapTable
                                     hover
                                     { ...toolkitprops.baseProps }
                                     { ...paginationTableProps }
                                 />
                             </div>
                         )
                     }
                 </ToolkitProvider>
                 <PaginationListStandalone { ...paginationProps } />
             </div>
         );

         return(
             <div>
                 <Col className="col-3">
                 </Col>
                 <PaginationProvider
                     pagination={paginationFactory(options)}>

                     {contentTable}

                 </PaginationProvider>
             </div>

         );
     }

}

export default SociosTable;