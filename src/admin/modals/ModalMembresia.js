import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

export default class ModalProducto extends React.Component{

    render () {
        return(<Modal isOpen={this.props.modalRecord} toggle={() => this.props.toggleModal(1)} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleModal(1)}>{this.props.editMode ? 'Editar precio de' : 'Nueva'} Membresía</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.props.editMode ? this.props.handleEditRecord : this.props.handleNewRecord}>
                <FormGroup>
                        <Label>* Nombre</Label>
                        <Input  name="membresia"
                                value={this.props.editMode ? this.props.membresia : undefined}
                                onChange={event => this.props.handleInputChange(event)}
                                disabled
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>* Duración</Label>
                        <Input name="duracion"
                               value={this.props.editMode ? this.props.duracion : undefined}
                               onChange={event => this.props.handleInputChange(event)}
                               disabled
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>* Precio</Label>
                        <Input name="precio"
                               value={this.props.editMode ? this.props.precio : undefined}
                               onChange={event => this.props.handleInputChange(event)}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.editMode ? 'Editar' : 'Agregar '} Membresía</Button>
            </ModalFooter>
        </Modal>);
    }
};

