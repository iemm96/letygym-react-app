import React, {useEffect, useState} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, input, Col, Row } from 'reactstrap';
import Select from "react-select";
import DatePicker, { registerLocale } from "react-datepicker/es";

import "react-datepicker/dist/react-datepicker.css";
import {useForm} from "react-hook-form";
import {fetchRecord} from "../../actions/fetchRecord";
import {updateRecord} from "../../actions/updateRecord";
import {store} from "react-notifications-component";
import {storeRecord} from "../../actions/storeRecord";
import {fetchRecords} from "../../actions/fetchRecords";


import moment from 'moment';
import es from "date-fns/locale/es";
registerLocale("es", es);

const ModalSocia = props => {
    const { register,errors, handleSubmit } = useForm();
    const [record,setRecord] = useState(null);
    const [opcionesMembresias,setOpcionesMembresias] = useState([]);
    const [idMembresia,setIdMembresia] = useState(null);
    const [fechaInicio,setFechaInicio] = useState(new Date());
    const [fechaFin,setFechaFin] = useState(new Date());
    const [minFechaFin,setMinFechaFin] = useState(new Date());
    const [membresiaActiva,setMembresiaActiva] = useState(0);

    useEffect(() => {

        async function getRecord() {
            try {
                const result = await fetchRecord(props.selectedRecordId,'socioMembresias');
                if(result) {

                    if(result.bActiva === 1) {
                        setMembresiaActiva(1);
                        setIdMembresia(result.id_membresia);

                        moment().locale('es');

                        let dateInicio = moment(result.fecha_inicio);
                        setFechaInicio(dateInicio.toDate());

                        let dateFin = moment(result.fecha_fin);
                        setFechaFin(dateFin.toDate());
                        setMinFechaFin(dateFin.toDate());
                    }

                    setRecord(result);
                }
            }catch (e) {
                console.log(e);
            }
        }

        if(props.selectedRecordId) {
            getRecord();
        }

    },[props.selectedRecordId]);

    useEffect(() => {
        getMembresias()
    },[]);

    useEffect(() => {
        if(idMembresia) {
            const date = updateFechaFin();
            setFechaFin(date);
            setMinFechaFin(date);
        }
    },[idMembresia,fechaInicio]);

    async function getMembresias() {
        try {
            const result = await fetchRecords('membresias');
            if(result) {

                let array = [];

                result.map((val) => {
                    array.push({value:val.id,label:val.membresia});
                });

                setOpcionesMembresias(array);
            }
        }catch (e) {
            console.log(e);
        }
    }

    const updateFechaFin = () => {


        moment().locale('es');

        let date = moment(fechaInicio);

        if(idMembresia) {
            switch (idMembresia) {
                case 1: {
                    date.add(1,'weeks');
                    break;
                }
                case 2: {
                    date.add(1,'months');
                    break;
                }
                case 3: {
                    date.add(2,'months');
                    break;
                }
                case 4: {
                    date.add(3,'months');
                    break;
                }

                default: {

                }
            }

            return date.toDate();
        }

    };

    const onSubmit = async (data) => {

        if(fechaFin) {
            data.fecha_fin = fechaFin;
        }

        if(fechaInicio) {
            data.fecha_inicio = fechaInicio;
        }

        if(idMembresia) {
            data.id_membresia = idMembresia;
        }

        if(membresiaActiva) {
            data.bActiva = 1;
        }else{
            data.bActiva = 0;
        }

        if(record) {

            try {

                data.id_mebresia = idMembresia;

                const response = await updateRecord(data,'socio',props.selectedRecordId);

                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se han actualizado los datos de la socia",
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
                    setRecord(null);

                    props.toggleModal();
                    props.updateRecords();
                }
            }catch (e) {
                console.log(e);
                store.addNotification({
                    title: "Ocurrió un error al actualizar los datos de la socia",
                    message: "Revisa tu conexión a internet",
                    type: "danger",
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

        }else{
            try {
                const response = await storeRecord(data,'socio');
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha creado una nueva socia",
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
                    props.toggleModal();
                    props.updateRecords();
                }

            }catch (e) {
                store.addNotification({
                    title: "Ocurrió un error al agregar una socia",
                    message: "Revisa tu conexión a internet",
                    type: "danger",
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
        }

    };

    const membresiaSection = <div>
        <FormGroup>
        <Label>* ¿Qué tipo de membresía tiene?</Label>
        <Select options={opcionesMembresias}
                placeholder="Seleccione una membresía"
                name="id_membresia"
                value={opcionesMembresias.find(op => {
                    return op.value === idMembresia
                })}
                onChange={event => {
                    setIdMembresia(event.value);
                    //setFechaFin(updateFechaFin());
                }}
        />
    </FormGroup>
        <FormGroup row>
            <Col md={6}>
                <Label>¿Cuándo inició?</Label>
                <DatePicker
                    locale="es"
                    className="form-control"
                    dateFormat="dd/MMMM/yyyy"
                    selected={fechaInicio}
                    onChange={value => setFechaInicio(value)}
                />
            </Col>
            <Col md={6}>
                <Label>* ¿Cuándo finalizará?</Label>
                <DatePicker
                    locale="es"
                    className="form-control"
                    dateFormat="dd/MMMM/yyyy"
                    minDate={minFechaFin}
                    selected={fechaFin}
                    onChange={value => setFechaFin(value)}
                />
            </Col>
        </FormGroup>
    </div>;
    
    return(<Modal isOpen={props.modalRecord} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>{record ? 'Editar' : 'Nueva'} Socia</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row form>
                    <Col>
                        <FormGroup>
                            <Label>* Nombre</Label>
                            <input type="text"
                                   name="nombre"
                                   className="form-control"
                                   defaultValue={record ? record.nombre : undefined}
                                   ref={register({ required: true })}
                            />
                            {errors.nombre && <small>Ingresa un nombre</small>}
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup row>
                    <Col md={6}>
                        <Label>* Apellido Paterno</Label>
                        <input type="text"
                               name="apellidoPaterno"
                               className="form-control"
                               defaultValue={record ? record.apellidoPaterno : undefined}
                               ref={register({ required: true })}
                        />
                        {errors.apellidoPaterno && <small>Ingresa un apellido paterno</small>}
                    </Col>
                    <Col md={6}>
                        <Label>* Apellido Materno</Label>
                        <input type="text"
                               name="apellidoMaterno"
                               className="form-control"
                               defaultValue={record ? record.apellidoMaterno : undefined}
                               ref={register({ required: true })}
                        />
                        {errors.apellidoMaterno && <small>Ingresa un apellido materno</small>}
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label>* ¿Tiene membresía activa?</Label>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio"
                               value="1"
                               className="custom-control-input"
                               id="radioSi"
                               name="bActiva"
                               ref={register}
                               defaultChecked={membresiaActiva === 1}
                               onChange={() => setMembresiaActiva(1)}
                        />
                        <label className="custom-control-label" htmlFor="radioSi">Si</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio"
                               value="0"
                               className="custom-control-input"
                               id="radioNo"
                               name="bActiva"
                               ref={register}
                               defaultChecked={membresiaActiva === 0}
                               onChange={() => setMembresiaActiva(0)}
                        />
                        <label className="custom-control-label" htmlFor="radioNo">No</label>
                    </div>
                </FormGroup>
                {membresiaActiva ? membresiaSection : ''}
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">{record ? 'Editar ' : 'Agregar '} Socia</Button>
        </ModalFooter>
    </Modal>);
};

export default ModalSocia;
