import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'reactstrap';
import {url_base} from '../../constants/api_url';

const api_url = url_base;
export default class ModalSocio extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            nombre: undefined,
            apellidoP: undefined,
            apellidoM: undefined,
            membresias: [],
        }
    }

    componentDidMount() {
        fetch(`${api_url}membresias`, {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        },)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong ...');
                }

            }).then(response =>
            this.setState({membresias: response})
        );
    }

    render() {
        let membresias = this.state.membresias;

        let optionItems = membresias.map((membresia) =>
        {
            console.log(membresia.id);
            return <option key={membresia.id} value={membresia.id}>{membresia.membresia}</option>
        }

        );

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
                    <Row form>
                        <Col>
                            <FormGroup>
                                <label>Membresía</label>
                                <Input type="select" name="id_membresia" value={this.props.id_membresia} onChange={this.props.handleInputChange}>
                                    {optionItems}
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
