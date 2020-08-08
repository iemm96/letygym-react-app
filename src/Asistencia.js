import React, {useEffect, useState} from "react";
import './styles/style.scss';
import ListaResultados from "./ListaResultados";
import ModalMembresia from "./ModalMembresia";
import {url_base} from './constants/api_url';
import {fetchRecords} from "./actions/fetchRecords";

const api_url = url_base;

const Asistencia = () => {
    let arrayResults2 = [];
    const [isHovering,setIsHovering] = useState(false);
    const [arrayResults,setArrayResults] = useState([]);
    const [arraySocias,setArraySocias] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [isDisabled,setIsDisabled] = useState(false);
    const [isCorrect,setIsCorrect] = useState(false);
    const [hoverEnable,setHoverEnable] = useState(false);
    const [modalMembresia,setModalMembresia] = useState(false);
    const [showList,setShowList] = useState(false);
    const [buttonText,setButtonText] = useState('Registrar Asistencia');

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
                    throw new Error('Something went wrong ...');
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

    const toggleModal = () => setModalMembresia(!modalMembresia);
    
    const handleInputChange = event => {
        setArrayResults([]);

        //Si el string del campo es mayor a 2 se comienza a buscar en el arreglo
        if(event.target.value.length > 1) {

            setShowList(true);
            
            //Se itera el arreglo de las socias para buscar el nombre
            arraySocias.map((socia) => {

                let nombreCompleto = socia.nombreCompleto;

                event.target.value.split(' ').map(word => {

                    //Se busca por nombre si se encuentra se regresa su id
                    if(nombreCompleto.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
                        console.log('encontrado: ' , socia );

                        arrayResults.push({nombre:socia.nombreCompleto,id:socia.id});

                    }
                });

            });

            console.log(arrayResults);

        }else{
            setShowList(false);
        }

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
                        <h3>Bienvenid@ a LetyGym</h3>
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
                                {showList ? <ListaResultados list={arrayResults}
                                                             checarAsistencia={checarAsistencia}
                                                             isLoading={isLoading}
                                                             isCorrect={isCorrect}
                                                             isDisabled={isDisabled}
                                                             buttonText={buttonText}
                                                             hoverEnable={hoverEnable}
                                                             showList={showList}
                                /> : '' }
                            </ul>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Asistencia;

