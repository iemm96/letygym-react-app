import React from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col, TabPane} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Row } from "reactstrap";
import EliminarRegistroModal from "../modals/EliminarRegistroModal";
import {url_base} from '../../constants/api_url';

const { SearchBar } = Search;
const api_url = url_base;

let asistencias = [{

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
                    placeholder="Buscar asistencias..."
                    className="form-control"
                    ref={ n => input = n }
                    type="text"
                    onChange={search}
                />
            </div>
        </Row>
    );
};

class AsistenciasTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            asistencias: asistencias,
            edit: false,
            idRecord: null,
            id_socio: '',
            fechaHora: '',
        };
    }

    componentDidMount() {

        fetch(`${api_url}asistenciasSocios`, {
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
            this.setState({asistencias: response})
        );
    }

    toggleModal = () => {
        this.state.modalRecord ? this.setState({modalRecord: false}) : this.setState({modalRecord: true});
    };

    toggleDeleteModal = () => {
        this.state.deleteModal ? this.setState({deleteModal: false}) : this.setState({deleteModal: true});
    }

    prepareDeleteModal = (id,nombre) => {
        this.setState({idRecord: id, nombre: nombre});

        this.toggleDeleteModal();
    }

    deleteRegister = () => {
        fetch(`${api_url}asistencias/${this.state.idRecord}`, {
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
            text: 'Socia',
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
            totalSize: this.state.asistencias.length
        };

        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <EliminarRegistroModal
                    toggleDeleteModal={this.toggleDeleteModal}
                    titulo={this.state.nombre}
                    deleteRegister={this.deleteRegister}
                    deleteModal={this.state.deleteModal}/>
                <ToolkitProvider
                    keyField="id"
                    columns={ columns }
                    data={ this.state.asistencias }
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

export default AsistenciasTable;