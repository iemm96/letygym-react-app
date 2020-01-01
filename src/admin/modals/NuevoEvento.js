import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

const NuevoEvento = ( props ) => {

    const {
        className
    } = props;

    return(<Modal isOpen={props.modalEvento} toggle={() => props.toggleModal(2)} className={className}>
        <ModalHeader toggle={() => props.toggleModal(2)}>Nuevo Evento</ModalHeader>
        <ModalBody>
            <Form>
                <FormGroup>
                    <Input type="text" name="titulo" id="" placeholder="Título" />
                </FormGroup>
                <FormGroup>
                    <Input type="textarea" name="descripcion" id="" placeholder="Descripción"/>
                </FormGroup>
                <FormGroup>
                    <Input type="select" name="id_visibilidad" id="">
                        <option value="1">Visible para todos</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input type="select" name="id_importancia" id="">
                        <option value="1">Importante</option>
                        <option value="2">General</option>
                    </Input>
                </FormGroup>
                <FormGroup row>
                    <Col sm={{ size: 10 }}>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkbox2" />{' '}
                                Notificar por correo
                            </Label>
                        </FormGroup>
                    </Col>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={() => props.toggleModal(2)}>Crear Anuncio</Button>{' '}
            <Button color="secondary" onClick={() => props.toggleModal(2)}>Cancelar</Button>
        </ModalFooter>
    </Modal>);
};

export default NuevoEvento;