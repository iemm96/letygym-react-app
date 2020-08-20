import React, { useState, useEffect } from "react";
import {Button, Col } from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalVenta from "../modals/ModalVenta";
import { Row } from "reactstrap";
import ModalEliminarRegistro from "../modals/ModalEliminarRegistro";
import {fetchRecords} from "../../actions/fetchRecords";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../constants/muiTableOptions";
import {deleteRecord} from "../../actions/deleteRecord";

const VentasTable = props => {
    const [records,setRecords] = useState([]);
    const [modalControl,setModalControl] = useState(false);
    const [modalEliminar,setModalEliminar] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [tituloModal,setTituloModal] = useState('');

    useEffect(() => {
        getRecords();
    },[]);

    const eliminarRegistro = async () => {
        try {

            setModalEliminar(false);
            await deleteRecord(selectedRecordId,'ventasProductos');

            getRecords();

        }catch (e) {

        }
    };

    const getRecords = async () => {
        try {
            const result = await fetchRecords('ventasProductos');
            if(result) {
                setRecords(result);
            }
        }catch (e) {
            console.log(e);
        }
    };

    const columns = [{
        name: "producto",
        label: "Producto",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "total",
        label: "Total",
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
        name: "id",
        label: "Acciones",
        options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta) => {
                return (
                    <div>
                        <Button type="Button" onClick={() => {
                            setSelectedRecordId(value);
                            setModalEliminar(!modalEliminar);
                            setTituloModal(tableMeta.rowData[1]);
                        }} className="mr-2 btnAction"><FontAwesomeIcon icon={faTrash}/></Button>
                    </div>
                );
            }
        }
    }];

    return(
        <div>
            {modalControl ? <ModalVenta
                toggleModal={() => {setModalControl(!modalControl)}}
                modalRecord={modalControl}
                updateRecords={() => getRecords()}
                turnoActual={props.turnoActual}
            /> : ''}
            {modalEliminar ? <ModalEliminarRegistro
                toggleDeleteModal={() => setModalEliminar(!modalEliminar)}
                deleteModal={modalEliminar}
                titulo={tituloModal}
                deleteRegister={() => eliminarRegistro()}
            /> : '' }

            <Row className="justify-content-end">
                <Col sm={2}>
                    <Button
                        className="actionButton"
                        onClick={() => setModalControl(!modalControl)}
                    >
                        Registrar Venta
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MUIDataTable
                        title={"Ventas de Productos"}
                        data={records}
                        columns={columns}
                        options={muiTableOptions}
                    />
                </Col>
            </Row>
        </div>

    )
};

export default VentasTable;


