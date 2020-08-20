import React  from 'react';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';


const ModalMembresia = (props) => {

    return (
        <div>
            <Modal isOpen={props.modalMembresia}>
                <ModalHeader>Renovar Membresía</ModalHeader>
                <ModalBody>
                    <p>Espera mientras renovamos tu membresía.</p>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ModalMembresia;