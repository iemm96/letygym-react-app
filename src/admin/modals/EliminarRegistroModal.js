import React, { useState } from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';

export default class EliminarRegistroModal extends React.Component{

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
        return(<Modal isOpen={this.props.deleteModal} toggle={() => this.props.toggleDeleteModal()} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleDeleteModal()}>Eliminar el registro de ''</ModalHeader>
            <ModalBody>
                <p>¿Seguro que desea eliminar el registro de ''? Esta acción no se puede deshacer</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleDeleteModal()}>Cancelar</Button>
                <Button color="primary" onClick={() => this.props.toggleDeleteModal()}>Eliminar Registro</Button>{' '}
            </ModalFooter>
        </Modal>);
    }
    
};
