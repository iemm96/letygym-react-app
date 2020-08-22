import React, {useEffect, useState} from "react";
import './styles/style.scss';
import ModalMembresia from "./ModalMembresia";
import {url_base} from './constants/api_url';
import {fetchRecords} from "./actions/fetchRecords";
import {Button, Col, Row} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const api_url = url_base;
const useForceUpdate = () => useState()[1];
const Asistencia = () => {
    const [isHovering,setIsHovering] = useState(false);
    const [arrayResults,setArrayResults] = useState([]);
    const [arraySocias,setArraySocias] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [isDisabled,setIsDisabled] = useState(false);
    const [isCorrect,setIsCorrect] = useState(false);
    const [hoverEnable,setHoverEnable] = useState(true);
    const [modalMembresia,setModalMembresia] = useState(false);
    const [showList,setShowList] = useState(false);
    const [buttonText,setButtonText] = useState('Registrar Asistencia');
    const [actualHovering,setActualHovering] = useState(false);

    useEffect(() => {
        async function getSocias() {
            try{
                const result = await fetchRecords('sociosyvisitantes');
                setArraySocias(result);
            }catch (e) {
                console.log(e);
            }

        }

        getSocias();
    },[]);

    useEffect(() => {
        forceUpdate();

    },[arrayResults]);

    const checarAsistencia = value => {

        setHoverEnable(false);
        setIsLoading(true);
        setButtonText('Registrando...');

        fetch(`${api_url}socioMembresia/${value}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('error')
                }

            }).then(response => {

                if(response.bActiva) {

                    setIsLoading(false);
                    setIsCorrect(true);
                    setIsDisabled(false);
                    
                    setButtonText('¡Correcto!');

                    setTimeout(function () {
                        window.location.reload();
                    },5000);
                }else{
                    setModalMembresia( true);
                }
            }
        );
    };

    const forceUpdate = useForceUpdate();

    const toggleModal = () => setModalMembresia(!modalMembresia);
    
    const handleInputChange = event => {
        setArrayResults([]);

        let arrResultsTemp = [];
        //Si el string del campo es mayor a 2 se comienza a buscar en el arreglo
        if(event.target.value.length > 1) {

            setShowList(true);
            
            //Se itera el arreglo de las socias para buscar el nombre
            arraySocias.map((socia) => {

                let nombreCompleto = socia.nombreCompleto;

                event.target.value.split(' ').map(word => {

                    //Se busca por nombre si se encuentra se regresa su id
                    if(nombreCompleto.toLowerCase().indexOf(word.toLowerCase()) !== -1) {

                        arrResultsTemp.push({nombre:socia.nombreCompleto,id:socia.id});

                        setArrayResults(arrResultsTemp);

                    }
                });

            });


        }else{
            setShowList(false);
        }
    };

    const handleMouseHover = index => {

        if(hoverEnable) {
            setActualHovering(index);
        }

        setIsHovering(!isHovering);

        return isHovering;

    };

    return (
        <div className="row justify-content-center h-100">
            <ModalMembresia
                toggleModal={toggleModal}
                modalMembresia={modalMembresia}
            />
            <div id="cardLogin" className="login card card-nav-tabs animate fadeInUp one">
                <div className="card-body">
                    <form id="formLogin" className="center">
                        <h3>Bienvenid@ a Lety Fitness Club</h3>
                        <div className="form-group">
                            <input onInput={handleInputChange}
                                   id="inputNombre" type="text"
                                   className="input-form" name="username"
                                   aria-describedby=""
                                   placeholder="Ingresa tu nombre para registrar tu asistencia"
                                   />
                        </div>
                        <div className="">
                            <ul id="result-list" className="list-group result">
                                {arrayResults.map((result,index) => (
                                    <li id={index}
                                        onMouseEnter={() => handleMouseHover(index)}
                                        onMouseLeave={() => handleMouseHover(index)}
                                        className="list-group-item"
                                    >
                                    <Row className="">
                                        <Col className="">
                                            <span className="">{result.nombre}</span>
                                        </Col>
                                        <Col className="align-self-end">
                                            {actualHovering === index &&
                                            <Button
                                                className={`actionButton`}
                                                onClick={() => checarAsistencia(result.id)}
                                                disabled={isDisabled}>
                                                <span className={`${isLoading ? 'spinner-border spinner-border-sm' : ''}`}></span>
                                                {isCorrect === true ? <FontAwesomeIcon icon={faCheck}/> : ''}{buttonText}
                                            </Button>}
                                        </Col>
                                    </Row>
                                </li>))}
                            </ul>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Asistencia;

