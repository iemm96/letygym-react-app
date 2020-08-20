import React from "react";
import {Button, Col, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {store} from "react-notifications-component";
import {storeRecord} from "../../actions/storeRecord";
import {useForm} from "react-hook-form";
import moment from "moment";

const ModalTransaccion = props => {
    const { register,errors, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        try {

            if(props.tipoTransaccion) {
                data.tipo = 1;
            }else{
                data.tipo = 2;
            }

            let turno = 1;

            if(props.turnoActual === 3) {
                turno = 2;
            }

            data.turno = turno;
            data.metodo = 1;

            moment().locale('es');

            let datetime = moment(new Date());

            data.fechaHora = datetime.format('YYYY-MM-DD H:m:s');

            const response = await storeRecord(data,'transacciones');

            if(response) {
                store.addNotification({
                    title: "Correcto",
                    message: "Se ha creado un nuevo " + (props.tipoTransaccion ? 'Ingreso' : 'Egreso'),
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
                title: "Ocurrió un error al agregar la transacción",
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

    const {
        className
    } = props;

    return(<Modal isOpen={props.modalControl} toggle={() => props.toggleModal()} className={className}>
        <ModalHeader toggle={() => props.toggleModal()}>Nuevo {props.tipoTransaccion ? 'Ingreso' : 'Egreso'}</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col sm={12}>
                        <FormGroup>
                            <label>* Concepto</label>
                            <input className="form-control"
                                   type="text"
                                   name="concepto"
                                   ref={register({ required: true })}/>
                            {errors.nombre && <small>Ingresa un concepto</small>}
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <FormGroup>
                            <label>* Cantidad </label>
                            <input className="form-control"
                                   type="number"
                                   name="cantidad"
                                   ref={register({ required: true })}/>
                            {errors.cantidad && <small>Ingresa una cantidad</small>}
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button type="submit" form="form" color="primary">Agregar {props.tipoTransaccion ? 'Ingreso' : 'Egreso'}</Button>{' '}
        </ModalFooter>
    </Modal>);

};

export default ModalTransaccion;