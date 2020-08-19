import React, {useState,useEffect} from "react";
import {Button, Col, Row} from "reactstrap";
import Switch from "react-switch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../constants/muiTableOptions";
import {fetchRecords} from "../../actions/fetchRecords";
import ModalTransaccion from "../modals/ModalTransaccion";

const IngresosEgresos = props => {
    const [switchTipoTransaccion,setSwitchTipoTransaccion] = useState(true);
    const [recordsIngresos,setRecordsIngresos] = useState([]);
    const [recordsEgresos,setRecordsEgresos] = useState([]);
    const [buttonText,setButtonText] = useState('Registrar Ingreso');
    const [titleText,setTitleText] = useState('Ingresos');
    const [isDisabled,setIsDisabled] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [isCorrect,setIsCorrect] = useState(false);
    const [modalControlEgreso,setModalControlEgreso] = useState(false);
    const [modalControlIngreso,setModalControlIngreso] = useState(false);
    const [modalControlTransaccion,setModalControlTransaccion] = useState(false);

    useEffect( () => {

        async function getIngresos() {

            let turnoActual = 1;
            if(props.turnoActual === 3) {
                turnoActual = 2;
            }

            try {
                const result = await fetchRecords(`transacciones/getRecords/${turnoActual}/null/1`);
                if(result){
                    setRecordsIngresos(result);
                }
            }catch (e) {
                console.log(e);
            }
        }

        async function getEgresos() {
            try {

                let turnoActual = 1;

                if(props.turnoActual === 3) {
                    turnoActual = 2;
                }

                const result = await fetchRecords(`transacciones/getRecords/${turnoActual}/null/2`);

                setRecordsEgresos(result);

            }catch (e) {
                console.log(e);
            }
        }

        getEgresos();

        getIngresos();

    },[]);

    const columns = [{
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
    }];

    const toggleModal = () => {
        setModalControlTransaccion(!modalControlTransaccion);
    };

    const updateRecords = async () => {

        let turnoActual = 1;
        if(props.turnoActual === 3) {
            turnoActual = 2;
        }

        try {
            const result = await fetchRecords(`transacciones/getRecords/${turnoActual}/null/${switchTipoTransaccion ? '1' : '2'}`);
            if(result){

                switchTipoTransaccion ? setRecordsIngresos(result) : setRecordsEgresos(result);
            }
        }catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            {modalControlTransaccion ?
                <ModalTransaccion
                    tipoTransaccion={switchTipoTransaccion}
                    turnoActual={props.turnoActual}
                    modalControl={modalControlTransaccion}
                    toggleModal={toggleModal}
                    updateRecords={updateRecords}
                />
                : ''}
            <Row className="justify-content-between">
                <Col sm={2}>
                    <label htmlFor="small-radius-switch" style={{
                        display:'flex',
                        alignItems: "center",
                        justifyContent: "end",
                        marginTop: 8
                    }}>
                        <span className="mr-3">Egresos</span>
                        <Switch
                            checked={switchTipoTransaccion}
                            onChange={() => {

                                if(!switchTipoTransaccion) {
                                    setButtonText('Registrar Ingreso');
                                    setTitleText('Ingresos');
                                }else{
                                    setButtonText('Registrar Egreso');
                                    setTitleText('Egresos');
                                }

                                setSwitchTipoTransaccion(!switchTipoTransaccion);
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
                            offColor="#FF9B54"
                            onColor="#82D173"
                            offHandleColor="#FFF275"
                            onHandleColor="#FFF275"
                            height={40}
                            width={80}
                            className="react-switch"
                            id="small-radius-switch"
                        />
                        <span className="ml-3">Ingresos</span>

                    </label>
                </Col>
                <Col sm={2}>
                    <Button
                        style={{
                            height:50,
                            width:270
                        }}
                        className="actionButton"
                        onClick={() => toggleModal()}
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
                    {switchTipoTransaccion ? <MUIDataTable
                        title={`${titleText} del turno ${props.turnoActual === 1 ? 'Matutino' : (props.turnoActual === 3 ? 'Vespertino' : '')}`}
                        data={recordsIngresos}
                        columns={columns}
                        options={muiTableOptions}
                    /> : <MUIDataTable
                        title={`${titleText} del turno ${props.turnoActual === 1 ? 'Matutino' : (props.turnoActual === 3 ? 'Vespertino' : '')}`}
                        data={recordsEgresos}
                        columns={columns}
                        options={muiTableOptions}
                    />}

                </Col>
            </Row>
        </div>
    );
};

export default IngresosEgresos;