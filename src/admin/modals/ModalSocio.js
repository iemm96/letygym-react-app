import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';

export default class ModalSocio extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            nombre: undefined,
            apellidoP: undefined,
            apellidoM: undefined,
        }
    }

    componentDidMount() {

    }

    render() {
        return(<Modal isOpen={this.props.modalSocio} toggle={() => this.props.toggleModal(1)} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleModal(1)}>{this.props.editMode ? 'Editar' : 'Nuevo'} Socio</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.props.editMode ? this.props.handleEditSocio : this.props.handleNewSocio}>
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
                                   value={`this.props.editMode` ? this.props.apellidoPaterno : undefined}
                                   onChange={event => this.props.handleInputChange(event)} />
                        </Col>
                        <Col md={6}>
                            <label>* Apellido Materno</label>
                            <Input type="text" name="apellidoMaterno" id=""
                                   value={this.props.editMode ? this.props.apellidoMaterno : undefined}
                                   onChange={event => this.props.handleInputChange(event)} />
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Membresía</label>
                                <Input type="select" name="id_membresia" id="" onChange={this.props.handleInputChange}>
                                    <option value="">Sin membresía</option>
                                    <option value="1">1 Semana</option>
                                    <option value="2">3 Semanas</option>
                                    <option value="3">1 Mes</option>
                                    <option value="4">1 Año</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal(1)}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.editMode ? 'Editar ' : 'Agregar '} Socio</Button>
            </ModalFooter>
        </Modal>);
    }
    
};
