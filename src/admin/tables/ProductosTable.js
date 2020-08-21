import React, {useEffect, useState} from "react";
import {Button, Col } from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Row } from "reactstrap";
import ModalEliminarRegistro from "../modals/ModalEliminarRegistro";
import {fetchRecords} from "../../actions/fetchRecords";
import {deleteRecord} from "../../actions/deleteRecord";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../constants/muiTableOptions";
import ModalProducto from "../modals/ModalProducto";

const ProductosTable = props => {
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
            await deleteRecord(selectedRecordId,'productos');

            getRecords();

        }catch (e) {

        }
    };

    const getRecords = async () => {
        try {
            const result = await fetchRecords('productos');
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
        name: "cantidad",
        label: "Cantidad",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "precio",
        label: "Precio por Unidad",
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
                        }} className="mr-2 btnAction"><FontAwesomeIcon icon={faTrash}/>
                        </Button>
                        <Button type="Button" onClick={() => {
                            setSelectedRecordId(value);
                            setModalControl(!modalControl);
                            setTituloModal(tableMeta.rowData[1]);
                        }} className="ml-2 btnAction">
                            <FontAwesomeIcon icon={faEdit}/>
                        </Button>
                    </div>
                );
            }
        }
    }];

    return(
        <div>
            {modalControl ? <ModalProducto
                toggleModal={() => {setModalControl(!modalControl)}}
                modalRecord={modalControl}
                selectedRecordId={selectedRecordId}
                updateRecords={() => getRecords()}
                turnoActual={props.turnoActual}
            /> : ''}
            {modalEliminar ? <ModalEliminarRegistro
                toggleDeleteModal={() => setModalEliminar(!modalEliminar)}
                deleteModal={modalEliminar}
                titulo={tituloModal}
                deleteRegister={() => eliminarRegistro()}
            /> : '' }

            <Row className="mt-5 mt-lg-0 justify-content-end">
                <Col sm={3} xl={3}>
                    <Button
                        className="actionButton"
                        onClick={() => setModalControl(!modalControl)}
                    >
                        Nuevo Producto
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MUIDataTable
                        title={"Productos"}
                        data={records}
                        columns={columns}
                        options={muiTableOptions}
                    />
                </Col>
            </Row>
        </div>

    )
};

export default ProductosTable;