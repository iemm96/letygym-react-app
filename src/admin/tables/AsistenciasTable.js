import React, {useEffect, useState} from "react";
import {Button, Col } from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Row } from "reactstrap";
import {fetchRecords} from "../../actions/fetchRecords";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../constants/muiTableOptions";
import Switch from "react-switch";
import Select from "react-select";
import RenovarMembresia from "../modals/RenovarMembresia";
import {fetchRecord} from "../../actions/fetchRecord";
import moment from 'moment';
import {storeRecord} from "../../actions/storeRecord";

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
              {props.turnoActual === 2 || props.turnoActual === 0 ?
                  '' : <Col sm={8}>
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
                  </Col> }
              {props.turnoActual === 2 || props.turnoActual === 0 ?
                  '' : <Col sm={2}>
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
                  }
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
