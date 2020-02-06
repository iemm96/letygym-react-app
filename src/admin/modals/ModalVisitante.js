import React, { useState } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    Row
} from 'reactstrap';

export default class ModalVisitante extends React.Component{

    render () {
        return(<Modal isOpen={this.props.modalRecord} toggle={() => this.props.toggleModal(1)} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleModal(1)}>{this.props.editMode ? 'Editar' : 'Nueva'} Visitante</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.props.editMode ? this.props.handleEditRecord : this.props.handleNewRecord}>
                    <FormGroup>
                        <Row form>
                            <Col>
                                <FormGroup>
                                    <label>* Nombre</label>
                                    <Input type="text" name="nombre" id="" value={this.props.editMode ? this.props.nombre : undefined}
                                           onChange={event => this.props.handleInputChange(event)} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <label>* Apellido Paterno</label>
                                <Input type="text" name="apellidoPaterno" id=""
                                       value={this.props.editMode ? this.props.apellidoPaterno : undefined}
                                       onChange={event => this.props.handleInputChange(event)} />
                            </Col>
                            <Col md={6}>
                                <label>* Apellido Materno</label>
                                <Input type="text" name="apellidoMaterno" id=""
                                       value={this.props.editMode ? this.props.apellidoMaterno : undefined}
                                       onChange={event => this.props.handleInputChange(event)} />
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal()}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.editMode ? 'Editar ' : 'Agregar '} Visitante</Button>
            </ModalFooter>
        </Modal>);
    }
};

