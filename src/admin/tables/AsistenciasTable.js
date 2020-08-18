import React, {useEffect, useState} from "react";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {PaginationListStandalone, PaginationProvider} from "react-bootstrap-table2-paginator";
import {Button, Col, TabPane} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBriefcase, faCheck, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { Row } from "reactstrap";
import EliminarRegistroModal from "../modals/EliminarRegistroModal";
import {url_base} from '../../constants/api_url';
import {fetchRecords} from "../../actions/fetchRecords";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../constants/muiTableOptions";
import ModalAsistencia from "../modals/ModalAsistencia";
import Switch from "react-switch";
import Select from "react-select";
import {Icon} from "@material-ui/core";
import ModalMembresia from "../../ModalMembresia";
import RenovarMembresia from "../modals/RenovarMembresia";
import {fetchRecord} from "../../actions/fetchRecord";
import {updateRecord} from "../../actions/updateRecord";
import moment from 'moment';
import {storeRecord} from "../../actions/storeRecord";

const { SearchBar } = Search;
const api_url = url_base;
const RESOURCE = 'asistencias';

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

const AsistenciasTable = props => {
    const [records,setRecords] = useState([]);
    const [recordsAsistenciaInstructores,setRecordsAsistenciaInstructores] = useState([]);
    const [switchAsistencia,setSwitchAsistencia] = useState(true);
    const [idSocia,setIdSocia] = useState(null);
    const [idInstructor,setIdInstructor] = useState(null);
    const [socias,setSocias] = useState([]);
    const [instructores,setInstructores] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [isDisabled,setIsDisabled] = useState(true);
    const [isCorrect,setIsCorrect] = useState(false);
    const [modalMembresia,setModalMembresia] = useState(false);
    const [buttonText,setButtonText] = useState('Registrar Asistencia');
    const [nombreSocia,setNombreSocia] = useState('');
    const [nombreCompletoSocia,setNombreCompletoSocia] = useState('');

    useEffect( () => {

          async function getAsistencias() {
              try {
                  const result = await fetchRecords('asistenciasSocios');
                  if(result){
                      setRecords(result);
                  }
              }catch (e) {
                  console.log(e);
              }
          }

          async function getSocias() {
              try {
                  const resultadoSocias = await fetchRecords('socios');

                  let opcionesSocias = [];
                  resultadoSocias.map((val) => {
                      opcionesSocias.push({value:val.id,label:`${val.nombre} ${val.apellidoPaterno} ${val.apellidoMaterno}`,name:'id_socia'});
                  });

                  setButtonText('Registrar asistencia de Socia');
                  setSocias(opcionesSocias);

              }catch (e) {
                  console.log(e);
              }
          }

          async function getAsistenciasInstructores() {
              try {
                  const result = await fetchRecords('asistenciasInstructores/getRecords');

                  if(result){
                      setRecordsAsistenciaInstructores(result);
                  }
              }catch (e) {
                  console.log(e);
              }
          }

          async function getInstructores() {
              try {
                  const resultadoInstructores = await fetchRecords('instructores');

                  let opcinesInstructores = [];
                  resultadoInstructores.map((val) => {
                      opcinesInstructores.push({value:val.id,label:`${val.nombre} ${val.apellidoPaterno} ${val.apellidoMaterno}`,name:'id_instructor'});
                  });

                  setInstructores(opcinesInstructores);

              }catch (e) {
                  console.log(e);
              }
          }

          getSocias();

          getInstructores();

          getAsistencias();

          getAsistenciasInstructores();

    },[]);

    const registrarAsistenciaInstructor = async () => {
        setIsLoading(true);
        setButtonText('');
        moment().locale('es');

        let turnoActual = 1;

        if(props.turnoActual === 3) {
            turnoActual = 2;
        }

        let datetime = moment(new Date());
        console.log(datetime.format('YYYY-MM-DD H:m:s'));

        try {
            const asistenciaResult = await storeRecord({
                id_instructor:idInstructor,
                fechaHora:datetime.format('YYYY-MM-DD H:m:s'),
                turno:turnoActual
            },'asistenciasInstructores');

            if(asistenciaResult) {
                updateRecords();
            }
        }catch (e) {

        }

    };
      
    const checarMembresia = async () => {

        setIsLoading(true);
        setButtonText('');
        const today = moment();

        try {
            const socioMembresia = await fetchRecord(idSocia,'socioMembresia/hasMembresiaActiva');

            moment().locale('es');

            let datetime = moment(new Date());
            console.log(datetime.format('YYYY-MM-DD H:m:s'));

            //Si la membresía es activa se registra la asistencia de lo contrario se abre modal de renovar membresía
            if(socioMembresia.bActiva) {
                setIsLoading(false);
                setIsCorrect(true);
                setIsDisabled(false);
                setButtonText('');

                let turnoActual = 1;

                if(props.turnoActual === 3) {
                    turnoActual = 2;
                }

                const asistenciaResult = await storeRecord({
                    id_socio:idSocia,
                    fechaHora:datetime.format('YYYY-MM-DD H:m:s'),
                    turno:turnoActual
                },'asistencias');

                if(asistenciaResult) {
                  await updateRecords();
                }
            }else{
                const socia = await fetchRecord(idSocia,'socios');
                setNombreCompletoSocia(`${socia.nombre} ${socia.apellidoPaterno} ${socia.apellidoMaterno}`);
                setNombreSocia(socia.nombre);
                setModalMembresia( true);

            }
        }catch (e) {
            console.log(e);
        }

    };

    const toggleModal = () => {
        setModalMembresia(!modalMembresia);
    };

    const updateRecords = async () => {
        setIsLoading(false);
        setIsCorrect(true);
        setIsDisabled(true);

        setModalMembresia(false);

        try {

            if(switchAsistencia) {

                setTimeout(() => {
                    setIsCorrect(false);
                    setButtonText('Registrar asistencia de Socia');
                },2000);

                const result = await fetchRecords('asistenciasSocios');
                if(result) {
                    setRecords(result);
                }

            }else{

                setTimeout(() => {
                    setIsCorrect(false);
                    setButtonText('Registrar asistencia de Instructor');
                },2000);

                const result = await fetchRecords('asistenciasInstructores/getRecords');
                if(result) {
                    setRecordsAsistenciaInstructores(result);
                }
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
        name: "fechaHora",
        label: "Fecha y Hora",
        options: {
            filter: false,
            sort: false,
        }
    }];

    const customStyles = {

        control: () => ({
            borderRadius: 40,
            height:50,
            border: '1px solid #979797 !important',
            position: 'relative',
            justifyContent: 'space-between',
            display: '-webkit-flex'
        }),
        dropdownIndicator: () => ({
            color: 'black',
            marginRight: 10
        }),
        indicatorSeparator: () => ({
            border: 'none',
        })
    };

    return (
      <div>
          {modalMembresia ? <RenovarMembresia toggleMembresiaModal={toggleModal}
                                              modalRecord={modalMembresia}
                                              nombreSocio={nombreSocia}
                                              nombreCompleto={nombreCompletoSocia}
                                              socioMembresiaId={idSocia}
                                              updateRecords={updateRecords}
                                              modalMembresia={modalMembresia}/> : ''}
          <Row className="justify-content-between">
              <Col sm={2}>
                  <label htmlFor="small-radius-switch" style={{
                      display:'flex',
                      alignItems: "center",
                      justifyContent: "end",
                      marginTop: 8
                  }}>
                      <span className="mr-3">Instructores</span>
                      <Switch
                          checked={switchAsistencia}
                          onChange={() => {

                              if(!switchAsistencia) {
                                  setButtonText('Registrar asistencia de Socia');
                              }else{
                                  setButtonText('Registrar asistencia de Instructor');
                              }

                              setSwitchAsistencia(!switchAsistencia);
                          }}
                          uncheckedIcon={
                              <div
                                  style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: "100%",
                                      fontSize: 15,
                                      color: "white",
                                      paddingRight: 15,
                                      width:"100%"
                                  }}
                              >
                              </div>
                          }
                          checkedIcon={
                              <div
                                  style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      height: "100%",
                                      fontSize: 15,
                                      color: "white",
                                      paddingRight: 2,
                                      marginLeft:10,
                                      width:"100%"
                                  }}
                              >
                              </div>
                          }
                          handleDiameter={28}
                          offColor="#5CC8FF"
                          onColor="#84DCCF"
                          offHandleColor="#FFF275"
                          onHandleColor="#FFF275"
                          height={40}
                          width={80}
                          className="react-switch"
                          id="small-radius-switch"
                      />
                      <span className="ml-3">Socias</span>

                  </label>
              </Col>
              <Col sm={8}>
                  {switchAsistencia ?
                      <Select styles={customStyles}
                              options={socias}
                              placeholder={'Buscar socias para registrar asistencia'}
                              value={socias.find(op => {
                                  return op.value === idSocia
                              })}
                              onChange={(event) => {
                                  setIdSocia(event.value);
                                  setIsDisabled(false);
                              }}
                      /> : <Select styles={customStyles}
                               options={instructores}
                               placeholder={'Buscar instructores para registrar asistencia'}
                               value={instructores.find(op => {
                                   return op.value === idInstructor
                               })}
                               onChange={(event) => {
                                   setIdInstructor(event.value);
                                   setIsDisabled(false);
                               }}
                      />
                  }

              </Col>
              <Col sm={2}>
                  <Button
                      style={{
                          height:50,
                          width:270
                      }}
                      className="actionButton"
                      onClick={() => {switchAsistencia ? checarMembresia() : registrarAsistenciaInstructor()}}
                      disabled={isDisabled}
                  >
                      <span className={`${isLoading ? 'spinner-border spinner-border-sm' : ''}`}></span>
                      {isCorrect ? <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> : ''}
                      {buttonText}
                  </Button>
              </Col>
          </Row>
          <Row className="mt-4 justify-content-center">
              <Col>
                  {switchAsistencia ? <MUIDataTable
                      title={"Asistencias de Socias"}
                      data={records}
                      columns={columns}
                      options={muiTableOptions}
                  /> : <MUIDataTable
                      title={"Asistencias de Instructores"}
                      data={recordsAsistenciaInstructores}
                      columns={columns}
                      options={muiTableOptions}
                  />}

              </Col>
          </Row>
      </div>
    );
};

export default AsistenciasTable;

/*
class AsistenciasTable extends React.Component {

    constructor(props) {
        super(props);

        state = {
            asistencias: asistencias,
            edit: false,
            idRecord: null,
            id_socio: '',
            fechaHora: '',
        };
    }



    toggleModal = () => {
        modalRecord ? setState({modalRecord: false}) : setState({modalRecord: true});
    };

    toggleDeleteModal = () => {
        deleteModal ? setState({deleteModal: false}) : setState({deleteModal: true});
    }

    prepareDeleteModal = (id,nombre) => {
        setState({idRecord: id, nombre: nombre});

        toggleDeleteModal();
    }

    deleteRegister = () => {
        fetch(`${api_url}asistencias/${idRecord}`, {
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
        <Button type="Button" onClick={() => prepareDeleteModal(row.id, row.nombre)} className="btn btn-danger"><FontAwesomeIcon icon={faTrash} /></Button>
    </div>);

    render() {

        const {error} = state;

        if(error) {
            alert(error.message);
            return;
        }



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
            totalSize: asistencias.length
        };

        const contentTable = ({ paginationProps, paginationTableProps }) => (
            <div>
                <EliminarRegistroModal
                    toggleDeleteModal={toggleDeleteModal}
                    titulo={nombre}
                    deleteRegister={deleteRegister}
                    deleteModal={deleteModal}/>
                <ToolkitProvider
                    keyField="id"
                    columns={ columns }
                    data={ asistencias }
                    search>
                    {
                        toolkitprops => (
                            <div>
                                <Buscador prepareNewModal={prepareNewModal} { ...toolkitprops.searchProps } />
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

export default AsistenciasTable;*/