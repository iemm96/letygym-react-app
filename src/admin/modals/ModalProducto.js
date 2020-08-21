import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {useForm} from "react-hook-form";
import {fetchRecord} from "../../actions/fetchRecord";
import {updateRecord} from "../../actions/updateRecord";
import {store} from "react-notifications-component";
import {storeRecord} from "../../actions/storeRecord";

const ModalProducto = (props ) => {
    const { register,errors, handleSubmit } = useForm();
    const [record,setRecord] = useState(null);
    const [tipoProducto,setTipoProducto] = useState(1);

    useEffect(() => {

        if(props.selectedRecordId) {
            getRecord();
        }
    }, [props.idRecord]);

    async function getRecord() {
        try {
            const resultadoRecord = await fetchRecord(props.idRecord);

            setRecord(resultadoRecord);

        }catch (e) {
            console.log(e);
        }
    }

    const onSubmit = async (data) => {

        if(record) {

            try {

                const response = await updateRecord(data,'productos/update');

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
                const response = await storeRecord(data,'productos/addRecord');
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

    const seccionNuevoProducto = (
        <div className="animate fadeIn one">
            <p className="divider">
                <hr/>
            </p>
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>* ¿Cuánto te costó?</Label>
                        <input className="form-control" type="number" name="costo" id="" placeholder=""
                               ref={register({ required: true })}/>
                        {errors.costo && <small>Ingresa cuanto te costo el producto</small>}
                    </FormGroup>
                </Col>
            </Row>
        </div>
    );

    return(<Modal isOpen={props.modalRecord} toggle={() => props.toggleModal()}>
        <ModalHeader toggle={() => props.toggleModal()}>Nuevo Producto</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* Nombre del producto </label>
                            <input class="form-control"
                                   type="text"
                                   name="producto"
                                   defaultValue={record ? record.producto : ''}
                                   ref={register({ required: true })}
                            />
                            {errors.nombre && <small>Ingresa un nombre para el producto</small>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* Cantidad </label>
                            <input class="form-control"
                                   type="number"
                                   name="cantidad"
                                   ref={register({ required: true })}
                                   defaultValue={record ? record.cantidad : ''}
                            />
                            {errors.cantidad && <small>Ingresa una cantidad del producto</small>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* Precio al público p/Unidad</label>
                            <input class="form-control"
                                   type="number"
                                   name="precio"
                                   ref={register({ required: true })}
                                   defaultValue={record ? record.precio : ''}
                            />
                            {errors.precio && <small>Ingresa el precio para el cliente del producto</small>}
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <label>* Tipo de producto</label>
                    <div className="custom-control custom-radio custom-control-inline ml-3">
                        <input type="radio"
                               value="1"
                               className="custom-control-input"
                               id="existente"
                               name="tipoProducto"
                               ref={register}
                               defaultChecked={tipoProducto === 1}
                               onChange={() => setTipoProducto(1)}
                        />
                        <label className="custom-control-label" htmlFor="existente">Existente</label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <input type="radio"
                               value="2"
                               className="custom-control-input"
                               id="nuevo"
                               defaultChecked={tipoProducto === 2}
                               name="tipoProducto"
                               ref={register}
                               onChange={() => setTipoProducto(2)}
                        />
                        <label className="custom-control-label" htmlFor="nuevo">Nuevo</label>

                    </div>
                    {tipoProducto === 2 ? seccionNuevoProducto : ''}

                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal(4)}>Cancelar</Button>
            <Button type="submit" form="form" color="primary">Agregar Producto</Button>{' '}
        </ModalFooter>
    </Modal>);
};

export default ModalProducto;