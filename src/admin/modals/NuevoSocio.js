import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

const NuevoSocio = (props ) => {

    const {
        buttonLabel,
        className
    } = props;

    return(<Modal isOpen={props.modalAnuncio} toggle={() => props.toggleModal(1)} className={className}>
        <ModalHeader toggle={() => props.toggleModal(1)}>Nuevo Socio</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Input type="text" name="nombre" id="" placeholder="* Nombre" />
                </FormGroup>
                <FormGroup>
                    <Input type="select" name="id_membresia" id="">
                        <option value="">Membresía</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="select" name="id_status" id="">
                        <option value="">Status</option>
                        <option value="1">Activo</option>
                        <option value="2">Inactivo</option>
                    </Input>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => props.toggleModal(1)}>Agregar Socio</Button>{' '}
            <Button color="secondary" onClick={() => props.toggleModal(1)}>Cancelar</Button>
        </ModalFooter>
    </Modal>);
};

export default NuevoSocio;