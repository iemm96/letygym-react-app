import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ModalMembresia = (props) => {
    const {
        className
    } = props;

    return (
        <div>
            <Modal isOpen={props.modalMembresia} toggle={() => props.toggleModal()} className={className}>
                <ModalHeader toggle={() => props.toggleModal()}>Renovar Membresía</ModalHeader>
                <ModalBody>
                    <p>Espera mientras renovamos tu membresía.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => props.toggleModal()}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={() => props.toggleModal()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalMembresia;