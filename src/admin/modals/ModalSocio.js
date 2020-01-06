import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

export default class ModalSocio extends React.Component{

    constructor(props) {
        super(props);

        this.state = {nombre: ''}
    }

    componentDidMount() {
        if(this.props.getData) {
            this.setState({nombre: 'Karla'});
        }
    }

    render() {
        return(<Modal isOpen={this.props.modalSocio} toggle={() => this.props.toggleModal(1)} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleModal(1)}>Nuevo Socio</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <label>* Nombre completo</label>
                        <Input type="text" name="nombre" id="" value={this.state.nombre}/>
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
                <Button color="secondary" onClick={() => this.props.toggleModal(1)}>Cancelar</Button>
                <Button color="primary" onClick={() => this.props.toggleModal(1)}>Agregar Socio</Button>{' '}
            </ModalFooter>
        </Modal>);
    }
    
};
