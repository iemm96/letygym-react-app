import React, {useState,useEffect} from "react";
import {Button, Col, Row, ListGroup, ListGroupItem} from "reactstrap";
import Switch from "react-switch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import MUIDataTable from "mui-datatables";
import {muiTableOptions} from "../../constants/muiTableOptions";
import {fetchRecords} from "../../actions/fetchRecords";
import ModalTransaccion from "../modals/ModalTransaccion";
import moment from "moment";

const IngresosEgresos = props => {
    const [switchTipoTransaccion,setSwitchTipoTransaccion] = useState(true);
    const [recordsIngresos,setRecordsIngresos] = useState([]);
    const [recordsEgresos,setRecordsEgresos] = useState([]);
    const [buttonText,setButtonText] = useState('Registrar Ingreso');
    const [titleText,setTitleText] = useState('Ingresos');
    const [isDisabled,setIsDisabled] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [isCorrect,setIsCorrect] = useState(false);
    const [totalIngresos,setTotalIngresos] = useState(0);
    const [totalEgresos,setTotalEgresos] = useState(0);
    const [recordsIngresosMatutino,setRecordsIngresosMatutino] = useState([]);
    const [recordsEgresosMatutino,setRecordsEgresosMatutino] = useState([]);
    const [recordsIngresosVespertino,setRecordsIngresosVespertino] = useState([]);
    const [recordsEgresosVespertino,setRecordsEgresosVespertino] = useState([]);
    const [modalControlTransaccion,setModalControlTransaccion] = useState(false);
    const [gananciasMatutino,setGananciasMatutino] = useState(0);
    const [gananciasVespertino,setGananciaVespertino] = useState(0);


    useEffect( () => {

        async function getTransacciones() {

            moment().locale('es');

            let datetime = moment(new Date());

            let date = datetime.format('YYYY-MM-DD');

            try {
                const result = await fetchRecords(`transacciones/getRecords/null/${date}`);

                if(result){

                    let arrIngresosMatutino = [];
                    let arrIngresosVespertino = [];
                    let arrEgresosMatutino = [];
                    let arrEgresosVespertino = [];

                    let ingresosMatutino = 0;
                    let ingresosVespertino = 0;

                    let egresosMatutino = 0;
                    let egresosVespertino = 0;

                    result.map(value => {
                        if(value.turno === 'Matutino'){
                            if(value.tipo === 'Ingreso') {

                                ingresosMatutino += value.cantidad;
                                arrIngresosMatutino.push(value);
                            }else{
                                egresosMatutino += value.cantidad;
                                arrEgresosMatutino.push(value);
                            }
                        }else{
                            if(value.tipo === 'Ingreso') {
                                ingresosVespertino += value.cantidad;
                                arrIngresosVespertino.push(value);
                            }else{
                                egresosVespertino += value.cantidad;
                                arrEgresosVespertino.push(value);
                            }
                        }
                    });

                    setRecordsIngresosMatutino(arrIngresosMatutino);
                    setRecordsEgresosMatutino(arrEgresosMatutino);
                    setRecordsIngresosVespertino(arrIngresosVespertino);
                    setRecordsEgresosVespertino(arrEgresosVespertino);

                    setGananciasMatutino(ingresosMatutino-egresosMatutino);
                    setGananciaVespertino(ingresosVespertino-egresosVespertino);
                }
            }catch (e) {
                console.log(e);
            }
        }

        async function getIngresos() {

            let turnoActual = 1;

            moment().locale('es');

            let datetime = moment(new Date());

            let date = datetime.format('YYYY-MM-DD');

            if(props.turnoActual === 3) {
                turnoActual = 2;
            }

            if(props.turnoActual === 0) {
                turnoActual = 2;
            }

            if(props.turnoActual === 2) {
                turnoActual = 1;
            }

            try {
                const result = await fetchRecords(`transacciones/getRecords/${turnoActual}/${date}/1`);
                if(result){
                    setRecordsIngresos(result);
                }
            }catch (e) {
                console.log(e);
            }
        }

        async function getEgresos() {

            moment().locale('es');

            let datetime = moment(new Date());

            let date = datetime.format('YYYY-MM-DD');

            let turnoActual = 1;

            if(props.turnoActual === 3) {
                turnoActual = 2;
            }

            if(props.turnoActual === 0) {
                turnoActual = 2;
            }

            if(props.turnoActual === 2) {
                turnoActual = 1;
            }

            try {

                const result = await fetchRecords(`transacciones/getRecords/${turnoActual}/${date}/2`);

                setRecordsEgresos(result);

            }catch (e) {
                console.log(e);
            }
        }

        async function getIngresosTurno(turno) {

            moment().locale('es');

            let datetime = moment(new Date());

            let date = datetime.format('YYYY-MM-DD');

            try {

                const result = await fetchRecords(`transacciones/getRecords/${turno}/${date}/1`);

                if(turno === 1) {
                    setRecordsIngresosMatutino(result);
                }else{
                    setRecordsIngresosVespertino(result);
                }

            }catch (e) {
                console.log(e);
            }
        }

        async function getEgresosTurno(turno) {

            moment().locale('es');

            let datetime = moment(new Date());

            let date = datetime.format('YYYY-MM-DD');

            try {

                const result = await fetchRecords(`transacciones/getRecords/${turno}/${date}/2`);

                if(turno === 1) {
                    setRecordsEgresosMatutino(result);
                }else{
                    setRecordsEgresosVespertino(result);
                }

            }catch (e) {
                console.log(e);
            }
        }

        getTransacciones();
        /*

        getEgresos();

        getIngresos();

        if(props.turnoActual === 0) {
            getIngresosTurno(1);
            getEgresosTurno(1);
        }

        if(props.turnoActual === 2) {
            getIngresosTurno(2);
            getEgresosTurno(2);
        }*/

    },[props.turnoActual]);

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

    const seccionResumenTurnoMatutino = (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h2>Resumen del Turno Matutino</h2>
                    </Col>
                </Row>
                <Row sm={6} className="mt-3 justify-content-center">
                    <Col className="text-left">
                        {recordsIngresosMatutino.map((value) => {

                            return (
                                <p>{value.concepto}</p>
                            )
                        })}
                    </Col>
                    <Col className="text-right">
                        {recordsIngresosMatutino.map((value) => {


                            return (
                                <p>${value.cantidad}</p>
                            )
                        })}
                    </Col>
                </Row>
                <Row sm={6} className="justify-content-center">
                    <Col className="text-left">
                        {recordsEgresosMatutino.map((value) => {

                            return (
                                <p>{value.concepto}</p>
                            )
                        })}
                    </Col>
                    <Col className="text-right">
                        {recordsEgresosMatutino.map((value) => {


                            return (
                                <p>-${value.cantidad}</p>
                            )
                        })}
                    </Col>
                </Row>
                <hr style={{borderColor:'white',width:600}}/>
                <Row sm={6} className="justify-content-center">
                    <Col className="text-left">
                        <b>Ganancias del turno</b>
                    </Col>
                    <Col className="text-right">
                        <b>${gananciasMatutino}</b>
                    </Col>
                </Row>

            </Col>
        </Row>
    );

    const seccionResumenDia = (
        <Row>
            <Col>
                <Row>
                    <Col>
                        <h2>Resumen del Día</h2>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <b>Turno Matutino</b>
                    </Col>
                </Row>
                <Row sm={6} className="mt-3 justify-content-center">
                    <Col className="text-left">
                        {recordsIngresosMatutino.map((value) => {

                            return (
                                <p>{value.concepto}</p>
                            )
                        })}
                    </Col>
                    <Col className="text-right">
                        {recordsIngresosMatutino.map((value) => {

                            return (
                                <p>${value.cantidad}</p>
                            )
                        })}
                    </Col>
                </Row>
                <Row sm={6} className="justify-content-center">
                    <Col className="text-left">
                        {recordsEgresosMatutino.map((value) => {

                            return (
                                <p>{value.concepto}</p>
                            )
                        })}
                    </Col>
                    <Col className="text-right">
                        {recordsEgresosMatutino.map((value) => {


                            return (
                                <p>-${value.cantidad}</p>
                            )
                        })}
                    </Col>
                </Row>
                <hr style={{borderColor:'white',width:600}}/>
                <Row sm={6} className="justify-content-center">
                    <Col className="text-left">
                        <b>Ganancias del turno</b>
                    </Col>
                    <Col className="text-right">
                        <b>${gananciasMatutino}</b>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <b>Turno Vespertino</b>
                    </Col>
                </Row>
                <Row sm={6} className="mt-3 justify-content-center">
                    <Col className="text-left">
                        {recordsIngresosVespertino.map((value) => {

                            return (
                                <p>{value.concepto}</p>
                            )
                        })}
                    </Col>
                    <Col className="text-right">
                        {recordsIngresosVespertino.map((value) => {

                            return (
                                <p>${value.cantidad}</p>
                            )
                        })}
                    </Col>
                </Row>
                <Row sm={6} className="justify-content-center">
                    <Col className="text-left">
                        {recordsEgresosVespertino.map((value) => {

                            return (
                                <p>{value.concepto}</p>
                            )
                        })}
                    </Col>
                    <Col className="text-right">
                        {recordsEgresosVespertino.map((value) => {

                            return (
                                <p>-${value.cantidad}</p>
                            )
                        })}
                    </Col>
                </Row>
                <hr style={{borderColor:'white',width:600}}/>
                <Row sm={6} className="justify-content-center">
                    <Col className="text-left">
                        <b>Ganancias del turno</b>
                    </Col>
                    <Col className="text-right">
                        <b>${gananciasVespertino}</b>
                    </Col>
                </Row>
                <Row sm={6} className="mt-4 justify-content-center">
                    <Col className="text-left">
                        <h2>Ganancias del día</h2>
                    </Col>
                    <Col className="text-right">
                        <h2>${gananciasMatutino + gananciasVespertino}</h2>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

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

            {props.turnoActual === 0 ? seccionResumenDia : ''}
            {props.turnoActual === 2 ? seccionResumenTurnoMatutino : ''}
            {props.turnoActual === 1 || props.turnoActual === 3 ?
                <div>
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
                                data={props.turnoActual === 1 ? recordsIngresosMatutino : (props.turnoActual === 3 ? recordsIngresosVespertino : '')}
                                columns={columns}
                                options={muiTableOptions}
                            /> : <MUIDataTable
                                title={`${titleText} del turno ${props.turnoActual === 1 ? 'Matutino' : (props.turnoActual === 3 ? 'Vespertino' : '')}`}
                                data={props.turnoActual === 1 ? recordsEgresosMatutino : (props.turnoActual === 3 ? recordsEgresosVespertino : '')}
                                columns={columns}
                                options={muiTableOptions}
                            />}

                        </Col>
                    </Row>
                </div>
                : ''}

        </div>
    );
};

export default IngresosEgresos;