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

const { SearchBar } = Search;

let socios = [{
    id: 1,
    socio: "María Cárdenas Jímenez",
    fechaHora: "Semanal",
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
        };
    }

    toggleModal = () => {
        this.state.modalSocio ? this.setState({modalSocio: false}) : this.setState({modalSocio: true});
    };

    prepareNewModal = () => {
        this.setState({edit: false});
        this.toggleModal();
    }

    prepareEditModal = () => {
        this.setState({edit: true});
        this.toggleModal();
    }

    toggleDeleteModal = () => {
        this.state.deleteModal ? this.setState({deleteModal: false}) : this.setState({deleteModal: true});
    }

    prepareDeleteModal = () => {

    }

     actionsFormatter = (cell, row) => (<div>
         <Button type="Button" onClick={this.toggleDeleteModal} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
     </div>);

     render() {
         const columns = [{
             dataField: 'socio',
             text: 'Socio',
             sort: true,
         },{
             dataField: 'fechaHora',
             text: 'Fecha y Hora',
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
                 <ModalSocio toggleModal={this.toggleModal} modalSocio={this.state.modalSocio} editMode={this.state.edit} getData={false}/>
                 <EliminarRegistroModal toggleDeleteModal={this.toggleDeleteModal} deleteModal={this.state.deleteModal}/>
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