import React, {useEffect, useState} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    input,
    Col,
    Row
} from 'reactstrap';
import {useForm} from "react-hook-form";
import {fetchRecord} from "../../actions/fetchRecord";
import {updateRecord} from "../../actions/updateRecord";
import {store} from "react-notifications-component";
import {storeRecord} from "../../actions/storeRecord";

const ModalVisita = props => {
    const { register,errors, handleSubmit } = useForm();
    const [record,setRecord] = useState(null);

    useEffect(() => {
        async function getRecord() {
            try {
                const result = await fetchRecord(props.selectedRecordId,'visitantesVisitas');
                if(result) {
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

    const onSubmit = async (data) => {

        if(record) {

            try {

                const response = await updateRecord(data,'visitantesVisitas',props.recordId);

                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha registrado una nueva visita",
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
                    title: "Ocurrió un error al registrar una visita",
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
                const response = await storeRecord(data,'visitantesVisitas');
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha registrado una nueva visita",
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
                    title: "Ocurrió un error al registrar la visita",
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

    return(<Modal isOpen={props.modalRecord} toggle={() => props.toggleModal(1)} className={props.className}>
        <ModalHeader toggle={() => props.toggleModal(1)}>{record ? 'Editar' : 'Registrar'} Visita</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>* Nombre</label>
                                <input type="text"
                                       name="nombre"
                                       className="form-control"
                                       defaultValue={record ? record.nombre : undefined}
                                       ref={register({required:true})}
                                />
                                {errors.nombre && <small>Ingresa un nombre</small>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={6}>
                            <label>Apellido Paterno</label>
                            <input type="text"
                                   name="apellidoPaterno"
                                   className="form-control"
                                   defaultValue={record ? record.apellidoPaterno : undefined}
                                   ref={register}
                            />
                            {errors.apellidoPaterno && <small>Ingresa un apellido paterno</small>}
                        </Col>
                        <Col md={6}>
                            <label>Apellido Materno</label>
                            <input type="text"
                                   name="apellidoMaterno"
                                   className="form-control"
                                   defaultValue={record ? record.apellidoMaterno : undefined}
                                   ref={register}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <b>Cobrar: ${props.costoVisita}</b>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">{record ? 'Editar ' : 'Registrar '} Visita</Button>
        </ModalFooter>
    </Modal>);

};

export default ModalVisita;