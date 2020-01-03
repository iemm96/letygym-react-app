import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

const NuevoSocio = (props ) => {

    const {
        buttonLabel,
        className
    } = props;

    return(<Modal isOpen={props.modalSocio} toggle={() => props.toggleModal(1)} className={className}>
        <ModalHeader toggle={() => props.toggleModal(1)}>Nuevo Socio</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <label>* Nombre completo</label>
                    <Input type="text" name="nombre" id="" />
                </FormGroup>
                <FormGroup>
                    <label>Membresía</label>
                    <Input type="select" name="id_membresia" id="">
                        <option value="">Sin membresía</option>
                        <option value="">1 Semana</option>
                        <option value="">3 Semanas</option>
                        <option value="">1 Mes</option>
                        <option value="">1 Año</option>
                    </Input>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal(1)}>Cancelar</Button>
            <Button color="primary" onClick={() => props.toggleModal(1)}>Agregar Socio</Button>{' '}
        </ModalFooter>
    </Modal>);
};

export default NuevoSocio;