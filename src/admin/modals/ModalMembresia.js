import React, {useEffect, useState} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, input, FormText, Col } from 'reactstrap';
import {fetchRecord} from "../../actions/fetchRecord";
import {useForm} from "react-hook-form";
import {storeRecord} from "../../actions/storeRecord";
import {store} from "react-notifications-component";
import {updateRecord} from "../../actions/updateRecord";

const ModalMembresia = props => {
    const { register,errors, handleSubmit } = useForm();
    const [record,setRecord] = useState([]);

    useEffect(() => {
        async function getRecord() {
            try {
                const result = await fetchRecord(props.selectedRecordId,'membresias');
                if(result) {
                    setRecord(result);
                }
            }catch (e) {
                console.log(e);
            }
        }

        getRecord();
    },[props.selectedRecordId]);

    const onSubmit = async (data) => {

        try {

            const response = await updateRecord(data,'membresias',props.selectedRecordId);

            if(response) {
                store.addNotification({
                    title: "Correcto",
                    message: "Se ha actualizado la membresía",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
                props.toggleModal();
                props.updateRecords();
            }

        }catch (e) {
            store.addNotification({
                title: "Ocurrió un error al actualizar la membresía",
                message: "Revisa tu conexión a internet",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        }
    };

    return(<Modal isOpen={props.modalRecord} toggle={() => props.toggleModal(1)} className={props.className}>
        <ModalHeader toggle={() => props.toggleModal(1)}>Editar precio de Membresía</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label>* Nombre</Label>
                    <input  name="membresia"
                            className="form-control"
                            defaultValue={record.membresia}
                            disabled
                            ref={register}/>
                </FormGroup>
                <FormGroup>
                    <Label>* Duración</Label>
                    <input name="duracion"
                           className="form-control"
                           defaultValue={record.duracion}
                           disabled
                    />
                </FormGroup>
                <FormGroup>
                    <Label>* Precio</Label>
                    <input name="precio"
                           className="form-control"
                           defaultValue={record.precio}
                           ref={register({required:true})}
                    />
                    {errors.membresia && <small>Ingresa el monto de la mebresía</small>}
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">Actualizar Membresía</Button>
        </ModalFooter>
    </Modal>);
};

export default ModalMembresia;


