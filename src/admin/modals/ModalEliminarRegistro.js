import React  from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const ModalEliminarRegistro = props => (<Modal isOpen={props.deleteModal} toggle={() => props.toggleDeleteModal()} className={props.className}>
        <ModalHeader toggle={() => props.toggleDeleteModal()}>Eliminar el registro de <b>'{props.titulo}'</b></ModalHeader>
        <ModalBody>
            <p>¿Seguro que desea eliminar el registro de <b>'{props.titulo}'</b>? Esta acción no se puede deshacer</p>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleDeleteModal()}>Cancelar</Button>
            <Button color="primary" onClick={() => props.deleteRegister()}>Eliminar Registro</Button>{' '}
        </ModalFooter>
    </Modal>);

export default ModalEliminarRegistro;

