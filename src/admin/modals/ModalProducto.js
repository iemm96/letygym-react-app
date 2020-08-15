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
    const [tipoProducto,setTipoProducto] = useState(0);
    const [disabledButton,setDisabledButton] = useState(false);

    useEffect(() => {

        //Obtiene los datos del registro
        async function getRecord() {
            try {
                const resultadoRecord = await fetchRecord(props.idRecord);

                setRecord(resultadoRecord);

            }catch (e) {
                console.log(e);
            }
        }

        if(props.idRecord) {
            //getRecord();
        }
    }, [props.idRecord]);

    const {
        buttonLabel,
        className
    } = props;

    const onSubmit = async (data) => {

        console.log(data);
        debugger;
        if(record) {

            try {

                const response = await updateRecord(data,'productos');

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
                const response = await storeRecord(data,'productos');
                if(response) {
                    store.addNotification({
                        title: "Correcto",
                        message: "Se ha creado una nueva cuenta",
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
                    title: "Ocurrió un error al agregar la cuenta",
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
                <Col sm={4}>
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

    return(<Modal isOpen={props.recordModal} toggle={() => props.toggleModal(4)} className={className}>
        <ModalHeader toggle={() => props.toggleModal(4)}>Nuevo Producto</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <label>* Nombre del producto </label>
                    <input type="text" name="nombre" id="" />
                    {errors.nombre && <small>Ingresa un nombre para el producto</small>}
                </FormGroup>
                <FormGroup>
                    <label>* Cantidad </label>
                    <input type="number" name="cantidad" id=""/>
                    {errors.cantidad && <small>Ingresa una cantidad del producto</small>}
                </FormGroup>
                <FormGroup>
                    <label>* Precio al público p/Unidad</label>
                    <Input type="number" name="precio" id="" ref={register({ required: true })}/>
                    {errors.precio && <small>Ingresa el precio para el cliente del producto</small>}
                </FormGroup>
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
                    {tipoProducto ? seccionNuevoProducto : ''}

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