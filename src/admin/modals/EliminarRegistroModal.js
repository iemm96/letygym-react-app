import React  from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export default class EliminarRegistroModal extends React.Component{

    constructor(props) {
        super(props);

        this.state = {nombre: ''}
    }

    render() {
        return(<Modal isOpen={this.props.deleteModal} toggle={() => this.props.toggleDeleteModal()} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleDeleteModal()}>Eliminar el registro de <b>'{this.props.titulo}'</b></ModalHeader>
            <ModalBody>
                <p>¿Seguro que desea eliminar el registro de <b>'{this.props.titulo}'</b>? Esta acción no se puede deshacer</p>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleDeleteModal()}>Cancelar</Button>
                <Button color="primary" onClick={() => this.props.deleteRegister()}>Eliminar Registro</Button>{' '}
            </ModalFooter>
        </Modal>);
    }
    
};
