import React from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col } from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Row } from "reactstrap";
import EliminarRegistroModal from "../modals/EliminarRegistroModal";
import {url_base} from '../../constants/api_url';
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../constants/muiTableOptions";

const api_url = url_base;

let records = [{

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
                    placeholder="Buscar Pagos..."
                    className="form-control"
                    ref={ n => input = n }
                    type="text"
                    onChange={search}
                />
            </div>
            <div className="col-2">
            </div>
        </Row>
    );
};

class EgresosTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            records: records,
            edit: false,
            idRecord: null,
            egresosTurnoMatutino: [],
            egresosTurnoVespertino: [],
            precio: '',
            totalIngresos:0,
            totalEgresos:0
        };
    }

    componentDidMount() {

        fetch(`${api_url}egresos/getRecords/1`, {
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
            this.setState({egresosTurnoMatutino: response})
        );

        fetch(`${api_url}egresos/getRecords/2`, {
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
            this.setState({egresosTurnoVespertino: response})
        );
    }

    toggleModal = () => {
        this.state.modalRecord ? this.setState({modalRecord: false}) : this.setState({modalRecord: true});
    };

    prepareNewModal = () => {
        this.setState({edit: false});

        this.toggleModal();
    };

    toggleDeleteModal = () => {
        this.state.deleteModal ? this.setState({deleteModal: false}) : this.setState({deleteModal: true});
    };

    handleInputChange = event => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    getCurrentDateTime = () => {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        this.setState({fechaHora:date});

    };

    stringifyData = () => {

        var json = JSON.stringify({
            producto:this.state.producto,
            cantidad:this.state.cantidad,
            precio:this.state.precio,
        });

        return json;
    };

    handleEditRecord = event => {

        event.preventDefault();
        fetch(`${api_url}pagos/${this.state.idRecord}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:this.stringifyData()
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
    }

    prepareDeleteModal = (id,title) => {
        this.setState({idRecord: id, title: title});

        this.toggleDeleteModal();
    }

    deleteRegister = () => {
        fetch(`${api_url}pagos/${this.state.idRecord}`, {
            method: 'DELETE',
        }).then((res) => res)
            .then((data) =>  {
                if(data.ok) {
                    window.location.reload();
                }
            })
            .catch((err)=>console.log(err))
    }

    updateTotal = total => {
        this.setState({total:total})
    }

    actionsFormatter = (cell, row) => (<div>
        <Button type="Button" onClick={() => this.prepareDeleteModal(row.id, row.producto)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
    </div>);

    render() {

        const {error} = this.state;

        if(error) {
            alert(error.message);
            return;
        }

        const columns = [{
            dataField: 'nombreCompleto',
            text: 'Socio',
            sort: true,
        },{
            dataField: 'concepto',
            text: 'Concepto',
            sort: true,
        },{
            dataField: 'monto',
            text: 'Monto',
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
            totalSize: records.length
        };

        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <EliminarRegistroModal
                    toggleDeleteModal={this.toggleDeleteModal}
                    titulo={this.state.title}
                    deleteRegister={this.deleteRegister}
                    deleteModal={this.state.deleteModal}/>
                <ToolkitProvider
                    keyField="id"
                    columns={ columns }
                    data={ this.state.records }
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

        const columnsTurnos = [{
            name: "concepto",
            label: "Concepto",
            options: {
                filter: false,
                sort: false,
            }
        },{
            name: "cantidad",
            label: "Cantidad",
            options: {
                filter: false,
                sort: false,
            }
        },{
            name: "fechaHora",
            label: "Fecha y Hora",
            options: {
                filter: false,
                sort: false,
            }
        },{
            name: "Acciones",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <div>
                            <Button type="Button" onClick={() => this.prepareEditModal(value.id)} className="mr-2 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
                        </div>
                    );
                }
            }
        },];

        return(
            <div>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <h2>Egresos del día ${new Intl.NumberFormat().format(this.state.totalEgresos)}</h2>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col>
                        <MUIDataTable
                            title={"Turno matutino"}
                            data={this.state.egresosTurnoMatutino}
                            columns={columnsTurnos}
                            options={muiTableOptions}
                        />
                    </Col>

                </Row>
                <Row className="mt-4">
                    <Col>
                        <MUIDataTable
                            title={"Turno vespertino"}
                            data={this.state.egresosTurnoVespertino}
                            columns={columnsTurnos}
                            options={muiTableOptions}
                        />
                    </Col>

                </Row>

            </div>

        );
    }

}

export default EgresosTable;