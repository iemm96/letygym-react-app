import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import Select from 'react-select'
import InputNumber from "rc-input-number";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const RegistrarVenta = (props ) => {

    const {
        buttonLabel,
        className
    } = props;

    return(<Modal isOpen={props.modalVenta} toggle={() => props.toggleModal(3)} className={className}>
        <ModalHeader toggle={() => props.toggleModal(3)}>Registrar Venta</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <label>* Producto</label>
                    <Select options={options} placeholder="Seleccione un producto" />
                </FormGroup>
                <FormGroup>
                    <label>* Cantidad</label>
                    <Input type="number" name="cantidad" min="1" step="1" max="100" id=""/>
                </FormGroup>
                <FormGroup>
                    <label>Total</label>
                    <Input value="$50.00" disabled/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal(3)}>Cancelar</Button>
            <Button color="primary" onClick={() => props.toggleModal(3)}>Registrar Venta</Button>{' '}
        </ModalFooter>
    </Modal>);
};

export default RegistrarVenta;