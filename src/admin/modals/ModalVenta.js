import React, { useState, useEffect}  from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup } from 'reactstrap';
import Select from 'react-select'
import {useForm} from "react-hook-form";
import {store} from "react-notifications-component";
import {storeRecord} from "../../actions/storeRecord";
import {fetchRecords} from "../../actions/fetchRecords";

const ModalVenta = props => {
    const { register,errors, handleSubmit } = useForm();
    const [recordsProductos,setRecordsProductos] = useState([]);
    const [recordsPreciosProductos,setRecordsPreciosProductos] = useState([]);
    const [selectedProducto,setSelectedProducto] = useState([]);
    const [total,setTotal] = useState(0);

    useEffect(() => {
        async function getProductos() {

            var array = [];
            var arrayProductosPrecios = [];

            const result = await fetchRecords('productos');
            if(result) {
                result.map((val) => {
                    array.push({value:val.id,label:val.producto});
                    arrayProductosPrecios.push({idProducto:val.id,precio:val.precio});
                });

                setRecordsPreciosProductos(arrayProductosPrecios);
                setRecordsProductos(array);
            }
        }

        getProductos();
    },[]);
    
    const onSubmit = async (data) => {

        data.total = total;
        data.id_producto = selectedProducto;

        try {

            const response = await storeRecord(data,'ventasProductos');

            if(response) {
                store.addNotification({
                    title: "Correcto",
                    message: "Se ha registrado la venta",
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
                title: "Ocurrió un error al registrar la venta",
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
    
    const updateTotal = event => {
        const target = event.target;
        const value = target.value;
        let precio = 0;
        let productosPrecios = recordsPreciosProductos;

        productosPrecios.map((val,index) => {
            if(val.idProducto === selectedProducto) {
                precio = val.precio;
            }
        });

        setTotal(value * precio);
    };

    return(<Modal isOpen={props.modalRecord} toggle={() => props.toggleModal()} className={props.className}>
        <ModalHeader toggle={() => props.toggleModal()}>Registrar Venta</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <label>* Producto</label>
                    <Select options={recordsProductos}
                            placeholder="Selecciona un producto..."
                            name="id_producto"
                            onChange={event => setSelectedProducto(event.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <label>* Cantidad</label>
                    <input type="number"
                           name="cantidad"
                           min="1"
                           step="1"
                           max="100"
                           className="form-control"
                           onChange={event => updateTotal(event)}
                           ref={register({ required: true })}
                    />
                    {errors.cantidad && <small>Ingresa la cantidad de productos a vender</small>}
                </FormGroup>
                <FormGroup>
                    <label>Total</label>
                    <input value={total}
                           className="form-control"
                           onChange={event => props.handleInputChange(event)}
                           ref={register({ required: true })}
                           disabled
                    />
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary">Registrar Venta</Button>{' '}
        </ModalFooter>
    </Modal>);
};

export default ModalVenta;