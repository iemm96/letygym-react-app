import React, {useState,useEffect} from "react";
import {Button, Col, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useForm} from "react-hook-form";
import {updateRecord} from "../../actions/updateRecord";
import {store} from "react-notifications-component";
import {storeRecord} from "../../actions/storeRecord";

const ModalInstructor = props => {
    const { register,errors, handleSubmit } = useForm();
    const [record,setRecord] = useState(null);

    const onSubmit = async (data) => {

        if(record) {

            try {

                const response = await updateRecord(data,'productos/update');

                console.log(response);
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha actualizado la cuenta",
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
                    title: "Ocurrió un error al actualizar la cuenta",
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
                const response = await storeRecord(data,'productos/add');
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha creado un nuevo producto",
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
                    title: "Ocurrió un error al agregar el producto",
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

    const {
        className
    } = props;

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal(4)} className={className}>
        <ModalHeader toggle={() => props.toggleModal(4)}>Nuevo Producto</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* Nombre del producto </label>
                            <input class="form-control" type="text" name="producto" id="" ref={register({ required: true })}/>
                            {errors.nombre && <small>Ingresa un nombre para el producto</small>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* Cantidad </label>
                            <input class="form-control"  type="number" name="cantidad" ref={register({ required: true })}/>
                            {errors.cantidad && <small>Ingresa una cantidad del producto</small>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* Precio al público p/Unidad</label>
                            <input class="form-control" type="number" name="precio" id="" ref={register({ required: true })}/>
                            {errors.precio && <small>Ingresa el precio para el cliente del producto</small>}
                        </FormGroup>
                    </Col>
                </Row>

            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal(4)}>Cancelar</Button>
            <Button type="submit" form="form" color="primary">Agregar Producto</Button>{' '}
        </ModalFooter>
    </Modal>);

};

export default ModalInstructor;