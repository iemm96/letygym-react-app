import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

const RenovarMembresia = (props ) => {

    const {
        buttonLabel,
        className
    } = props;

    return(<Modal isOpen={props.modalMembresia} className={className}>
        <ModalHeader>Renovar Membresía de {props.nombreSocio}</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <label>Nombre Completo:</label>
                    <Input type="text" name="nombre" id="" value={props.nombreCompleto} disabled/>
                </FormGroup>
                <FormGroup>
                    <label>Pago por:</label>
                    <Input type="select" name="id_membresia" id="">
                        <option value="1">1 Semana</option>
                        <option value="1">3 Semanas</option>
                        <option value="2">1 Mes</option>
                        <option value="3">1 Año</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <label>Cantidad a cobrar:</label>
                    <Input type="text" name="nombre" id="" value="$50.00" disabled/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleMembresiaModal()}>Cancelar</Button>
            <Button color="primary" onClick={() => props.toggleMembresiaModal()}>Renovar</Button>{' '}
        </ModalFooter>
    </Modal>);
};

export default RenovarMembresia;