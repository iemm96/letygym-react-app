import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

const NuevoVisitante = (props ) => {

    const {
        buttonLabel,
        className
    } = props;

    return(<Modal isOpen={props.modalVisitante} toggle={() => props.toggleModal(2)} className={className}>
        <ModalHeader toggle={() => props.toggleModal(2)}>Nuevo Visitante</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <label>* Nombre completo</label>
                    <Input type="text" name="nombre" id="" />
                </FormGroup>
                <FormGroup>
                    <label>Costo por visita:</label>
                    <Input type="text" name="costo" id="" value="$50.00" disabled/>

                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button color="primary" onClick={() => props.toggleModal()}>Agregar Visitante</Button>{' '}
        </ModalFooter>
    </Modal>);
};

export default NuevoVisitante;