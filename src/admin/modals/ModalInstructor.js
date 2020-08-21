import React, {useState,useEffect} from "react";
import {Button, Col, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import {updateRecord} from "../../actions/updateRecord";
import {store} from "react-notifications-component";
import {storeRecord} from "../../actions/storeRecord";
import {fetchRecord} from "../../actions/fetchRecord";

const ModalInstructor = props => {
    const { register,errors, handleSubmit } = useForm();
    const [record,setRecord] = useState(null);

    useEffect(() => {
        async function getRecord() {
            try {
                const result = await fetchRecord(props.recordId,'instructores');
                if(result) {
                    setRecord(result);
                }
            }catch (e) {
                console.log(e);
            }
        }

        getRecord(props.recordId);

    },[props.recordId]);

    const onSubmit = async (data) => {

        if(record) {

            try {

                const response = await updateRecord(data,'instructores',props.recordId);

                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha actualizado el instructor",
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
                    title: "Ocurrió un error al actualizar el instructor",
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
                const response = await storeRecord(data,'instructores');
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha creado un nuevo instructor",
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
                    title: "Ocurrió un error al agregar el instructor",
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

    return(<Modal isOpen={props.modalControl} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>Nuevo Instructor</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <label>* Nombre del instructor</label>
                            <input className="form-control"
                                   type="text"
                                   name="nombre"
                                   defaultValue={record ? record.nombre : undefined}
                                   ref={register({ required: true })}/>
                            {errors.nombre && <small>Ingresa un nombre para el instructor</small>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* Apellido paterno </label>
                            <input className="form-control"
                                   type="text"
                                   name="apellidoPaterno"
                                   defaultValue={record ? record.apellidoPaterno : undefined}
                                   ref={register({ required: true })}/>
                            {errors.cantidad && <small>Ingresa un apellido paterno</small>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* Apellido materno </label>
                            <input className="form-control"
                                   type="text"
                                   name="apellidoMaterno"
                                   defaultValue={record ? record.apellidoMaterno : undefined}
                                   ref={register({ required: true })}/>
                            {errors.precio && <small>Ingresa un apellido materno</small>}
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <label> Teléfono </label>
                            <input className="form-control"
                                   type="text"
                                   name="telefono"
                                   defaultValue={record ? record.telefono : undefined}
                                   ref={register()}/>
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <label> Celular </label>
                            <input className="form-control"
                                   type="text"
                                   name="celular"
                                   defaultValue={record ? record.celular : undefined}
                                   ref={register()}/>
                        </FormGroup>
                    </Col>
                </Row>

            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button type="submit" form="form" color="primary">{record ? 'Actualizar' : 'Agregar'} Instructor</Button>{' '}
        </ModalFooter>
    </Modal>);

};

export default ModalInstructor;