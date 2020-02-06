import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

export default class ModalProducto extends React.Component{

    render () {
        return(<Modal isOpen={this.props.modalRecord} toggle={() => this.props.toggleModal()} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleModal()}>{this.props.editMode ? 'Editar' : 'Nuevo'} Producto</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.props.editMode ? this.props.handleEditRecord : this.props.handleNewRecord}>
                <FormGroup>
                        <Label>* Producto</Label>
                        <Input  name="producto"
                                value={this.props.editMode ? this.props.producto : undefined}
                                onChange={event => this.props.handleInputChange(event)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>* Cantidad</Label>
                        <Input type="number" name="cantidad" min="1" step="1" max="100" id=""
                               value={this.props.editMode ? this.props.cantidad : undefined}
                               onChange={event => this.props.handleInputChange(event)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>* Precio por unidad</Label>
                        <Input ref={this.select}
                               name="precio"
                               value={this.props.editMode ? this.props.precio : undefined}
                               onChange={event => this.props.handleInputChange(event)}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.editMode ? 'Editar ' : 'Agregar '} Producto</Button>
            </ModalFooter>
        </Modal>);
    }
};

