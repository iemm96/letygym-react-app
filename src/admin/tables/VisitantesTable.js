import React, {useEffect, useState} from "react";
import {Button, Col, InputGroup, InputGroupAddon, InputGroupText, Input} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import { Row } from "reactstrap";
import ModalEliminarRegistro from "../modals/ModalEliminarRegistro";
import ModalVisitante from "../modals/ModalVisitante";
import {deleteRecord} from "../../actions/deleteRecord";
import {fetchRecords} from "../../actions/fetchRecords";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../constants/muiTableOptions";
import {updateRecord} from "../../actions/updateRecord";
import {store} from "react-notifications-component";

const VisitantesTable = props => {
    const [records,setRecords] = useState([]);
    const [modalControl,setModalControl] = useState(false);
    const [modalEliminar,setModalEliminar] = useState(false);
    const [selectedRecordId,setSelectedRecordId] = useState(null);
    const [tituloModal,setTituloModal] = useState('');
    const [costoVisita,setCostoVisita] = useState(null);
    const [isDisabled,setIsDisabled] = useState(true);

    useEffect(() => {
        getRecords();
    },[]);

    const eliminarRegistro = async () => {
        try {

            setModalEliminar(false);
            await deleteRecord(selectedRecordId,'socios');

            getRecords();

        }catch (e) {

        }
    };

    const getRecords = async () => {
        try {
            const result = await fetchRecords('visitantesVisitas');
            if(result) {
                setRecords(result);
            }
        }catch (e) {
            console.log(e);
        }
    };

    const changeInputVisita = (event) => {
        setIsDisabled(false);
        setCostoVisita(event.target.value);
    };

    const updateCostoVisita = async () => {
          try {
              const result = await updateRecord({costo_visita:costoVisita},'appStatus',1);
              if(result) {
                  store.addNotification({
                      title: "Correcto",
                      message: "Se actualizó el costo de la visita",
                      type: "success",
                      insert: "top",
                      container: "top-right",
                      animationIn: ["animated", "fadeIn"],
                      animationOut: ["animated", "fadeOut"],
                      dismiss: {
                          duration: 5000,
                          onScreen: true
                      }
                  });
              }
          }catch (e) {
              console.log(e);
          }
    };

    const columns = [{
        name: "nombreCompleto",
        label: "Nombre",
        options: {
            filter: false,
            sort: false,
        }
    },{
        name: "visitas",
        label: "Visitas",
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
                    </div>
                );
            }
        }
    }];

    return(
        <div>
            {modalControl ? <ModalVisitante
                costoVisita={props.costoVisita}
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

            <Row className="justify-content-between">
                <Col sm={2}>
                    <InputGroup className="mt-2">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Visita $</InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" defaultValue={props.costoVisita} onChange={event => changeInputVisita(event)} />
                        <InputGroupAddon addonType="append"><Button color="primary" disabled={isDisabled} onClick={() => updateCostoVisita()}>Actualizar</Button></InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col sm={2}>
                    <Button
                        className="actionButton"
                        onClick={() => setModalControl(!modalControl)}
                    >
                        Registrar Visita
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <MUIDataTable
                        title={"Visitantes"}
                        data={records}
                        columns={columns}
                        options={muiTableOptions}
                    />
                </Col>
            </Row>
        </div>

    )
};

export default VisitantesTable;