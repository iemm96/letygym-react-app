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
    const [costoVisita,setCostoVisita] = useState(props.costoVisita);
    const [isDisabled,setIsDisabled] = useState(true);

    useEffect(() => {
        getRecords();
    },[]);

    const eliminarRegistro = async () => {
        try {

            setModalEliminar(false);
            await deleteRecord(selectedRecordId,'visitantesVisitas');

            getRecords();

        }catch (e) {
            console.log(e);
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
                costoVisita={costoVisita}
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

            <Row className="mt-5 mt-lg-0 justify-content-between">
                <Col sm={3} >
                    <InputGroup className="mt-2">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Visita $</InputGroupText>
                        </InputGroupAddon>
                        <Input type="number" defaultValue={costoVisita} onChange={event => changeInputVisita(event)} />
                        <InputGroupAddon addonType="append"><Button color="primary" disabled={isDisabled} onClick={() => updateCostoVisita()}>Actualizar</Button></InputGroupAddon>
                    </InputGroup>
                </Col>
                <Col className="mt-3 mt-sm-0" sm={3} >
                    {props.turnoActual === 1 || props.turnoActual === 3  ? <Button
                        className="actionButton"
                        onClick={() => setModalControl(!modalControl)}
                    >
                        Registrar Visita
                    </Button> : '' }

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