import React, {useState,useEffect} from "react";
import MUIDataTable from "mui-datatables";
import {fetchRecords} from "../../actions/fetchRecords";
import { Row, Col } from "reactstrap";
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {muiTableOptions} from "../../constants/muiTableOptions";
import ModalInstructor from "../modals/ModalInstructor";
import ModalEliminarRegistro from "../modals/ModalEliminarRegistro";
import {deleteRecord} from "../../actions/deleteRecord";

const InstructoresTable = () => {
    const [records,setRecords] = useState([]);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [modalControl,setModalControl] = useState(false);
    const [modalEliminar,setModalEliminar] = useState(false);
    const [tituloModal,setTituloModal] = useState('');

    useEffect(() => {


        getRecords();
    },[]);

    const prepareEditModal = id => {
        setSelectedRecordId(id);
        toggleModal();
    };

    async function getRecords() {
        try {
            const result = await fetchRecords('instructores');
            if(result) {

                result.map((value) => {
                    value.nombre = `${value.nombre} ${value.apellidoPaterno} ${value.apellidoMaterno}`;
                });

                setRecords(result);
            }
        }catch (e) {
            console.log(e);
        }
    }

    const prepareNewModal = () => {
        toggleModal();
    };

    const toggleModal = () => {
        setModalControl(!modalControl);
    };

    const eliminarRegistro = async () => {
        try {

            setModalEliminar(false);
            await deleteRecord(selectedRecordId,'instructores');

            getRecords();

        }catch (e) {

        }
    };

    const columns = [{
        name: "nombre",
        label: "Nombre",
        options: {
            filter: false,
            sort: true,
        }
    },{
        name: "telefono",
        label: "Teléfono",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "celular",
        label: "Celular",
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
            customBodyRender: (value,tableMeta) => {
                return (
                    <div>
                        <Button type="Button" onClick={() => {
                            setSelectedRecordId(value);
                            setModalEliminar(!modalEliminar);
                            setTituloModal(tableMeta.rowData[0]);
                        }} className="mr-2 btnAction"><FontAwesomeIcon icon={faTrash}/></Button>
                        <Button type="Button" onClick={() => prepareEditModal(value)} className="ml-2 btnAction"><FontAwesomeIcon icon={faEdit}/></Button>
                    </div>
                );
            }
        }
    },];
    return(
        <div>
            {modalControl ? <ModalInstructor
                modalControl={modalControl}
                toggleModal={toggleModal}
                recordId={selectedRecordId}
                updateRecords={getRecords}
            /> : ''}
            {modalEliminar ? <ModalEliminarRegistro
                toggleDeleteModal={() => setModalEliminar(!modalEliminar)}
                deleteModal={modalEliminar}
                titulo={tituloModal}
                deleteRegister={() => eliminarRegistro()}
            /> : '' }
            <Row className="mt-4 justify-content-end">
                <Col sm={2}>
                    <Button className="actionButton" onClick={() => prepareNewModal()}>Nuevo Instructor</Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MUIDataTable
                        columns={columns}
                        data={records}
                        options={muiTableOptions}
                    />
                </Col>
            </Row>

        </div>


    )
};

export default InstructoresTable;