import React from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col, TabPane} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import RegistrarVenta from "../modals/RegistrarVenta";
import { Row } from "reactstrap";
import EliminarRegistroModal from "../modals/EliminarRegistroModal";
import {url_base} from '../../constants/api_url';

const { SearchBar } = Search;
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
                    placeholder="Buscar Ventas..."
                    className="form-control"
                    ref={ n => input = n }
                    type="text"
                    onChange={search}
                />
            </div>
            <div className="col-2">
                <Button className="actionButton" onClick={() => props.prepareNewModal()}>Registrar Venta</Button>
            </div>
        </Row>
    );
};

class SociosTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            records: records,
            edit: false,
            idRecord: null,
            id_producto: '',
            cantidad: '',
            total: '',
        };
    }

    componentDidMount() {

        fetch(`${api_url}ventas`, {
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
            this.setState({records: response})
        );
    }

    toggleModal = () => {
        this.state.modalRecord ? this.setState({modalRecord: false}) : this.setState({modalRecord: true});
    };

    prepareNewModal = () => {
        this.setState({edit: false});

        this.toggleModal();
    }

    prepareEditModal = id => {
        this.setState({edit: true, recordData:{idRecord: id}});

        fetch(`${api_url}ventas/${id}`, {
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

            }).then(response => (this.setRecordData(response))
        );

        this.toggleModal();
    }

    setRecordData = data => (
        this.setState({
            ...data
        })
    );

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

    handleSelectChange = object => {
        this.setState({
            id_producto: object.value
        });
    }

    getCurrentDateTime = () => {
        var tempDate = new Date();
        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        this.setState({fechaHora:date});

    }

    handleNewRecord = event => {

        event.preventDefault();

        this.getCurrentDateTime();

        fetch(`${api_url}ventas`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:this.stringifyData()
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))

    }

    stringifyData = () => {
            return JSON.stringify({
            id_producto:this.state.id_producto,
            cantidad:this.state.cantidad,
            total:this.state.total,
            fechaHora:this.state.fechaHora
    })};

    handleEditRecord = event => {

        event.preventDefault();
        fetch(`${api_url}ventas/${this.state.idRecord}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:this.stringifyData
        }).then((res) => res.json())
            .then((data) =>  console.log(data))
            .catch((err)=>console.log(err))
    }

    prepareDeleteModal = (id,fechaHora) => {
        this.setState({recordData:{idRecord: id}, title: fechaHora});

        this.toggleDeleteModal();
    }

    deleteRegister = () => {
        fetch(`${api_url}ventas/${this.state.idRecord}`, {
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
        <Button type="Button" onClick={() => this.prepareEditModal(row.id)} className="btn mr-2 btn-primary"><FontAwesomeIcon icon={faEdit}/></Button>
        <Button type="Button" onClick={() => this.prepareDeleteModal(row.id, row.fechaHora)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
    </div>);

    render() {

        const {error} = this.state;

        if(error) {
            alert(error.message);
            return;
        }

        const columns = [
            {
                dataField: 'producto',
                text: 'Producto',
                sort: true,
            },
            {
                dataField: 'cantidad',
                text: 'Cantidad',
                sort: true,
            }, {
                dataField: 'total',
                text: 'Total',
                sort: true,
            },{
                dataField: 'fechaHora',
                text: 'Fecha',
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
                <RegistrarVenta
                    toggleModal={this.toggleModal}
                    handleNewRecord={this.handleNewRecord}
                    handleEditRecord={this.handleEditRecord}
                    handleInputChange={this.handleInputChange}
                    handleSelectChange={this.handleSelectChange}
                    modalRecord={this.state.modalRecord}
                    editMode={this.state.edit}
                    recordData={this.state}
                    updateTotal={this.updateTotal}
                />
                <EliminarRegistroModal
                    toggleDeleteModal={this.toggleDeleteModal}
                    titulo={this.state.fechaHora}
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