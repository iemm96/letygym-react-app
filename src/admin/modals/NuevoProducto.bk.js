import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

const ModalProducto = (props ) => {

    const {
        buttonLabel,
        className
    } = props;

    return(<Modal isOpen={props.modalProducto} toggle={() => props.toggleModal(4)} className={className}>
        <ModalHeader toggle={() => props.toggleModal(4)}>Nuevo Producto</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <label>* Nombre </label>
                    <Input type="text" name="nombre" id="" />
                </FormGroup>
                <FormGroup>
                    <label>* Cantidad </label>
                    <Input type="text" name="cantidad" id=""/>
                </FormGroup>
                <FormGroup>
                    <label>* Precio p/Unidad</label>
                    <Input type="text" name="precio" id=""/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal(4)}>Cancelar</Button>
            <Button color="primary" onClick={() => props.toggleModal(4)}>Agregar Producto</Button>{' '}
        </ModalFooter>
    </Modal>);
};

export default ModalProducto;