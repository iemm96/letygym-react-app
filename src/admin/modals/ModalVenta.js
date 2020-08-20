import React, { useState, useEffect}  from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input } from 'reactstrap';
import Select from 'react-select'

import {url_base} from '../../constants/api_url';
import {useForm} from "react-hook-form";
import {updateRecord} from "../../actions/updateRecord";
import {store} from "react-notifications-component";
import {storeRecord} from "../../actions/storeRecord";
import {fetchRecords} from "../../actions/fetchRecords";

const ModalVenta = props => {
    const { register,errors, handleSubmit } = useForm();
    const [recordsProductos,setRecordsProductos] = useState([]);
    const [recordsPreciosProductos,setRecordsPreciosProductos] = useState([]);
    const [selectedProducto,setSelectedProducto] = useState([]);

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
            if(val.idProducto === state.selectedProduct) {
                precio = val.precio;
            }
        });

        var total = value * precio;
        setState({total:total});
        props.updateTotal(total);
        props.handleInputChange(event);
    };

    return(<Modal isOpen={props.modalRecord} toggle={() => props.toggleModal()} className={props.className}>
        <ModalHeader toggle={() => props.toggleModal()}>Registrar Venta</ModalHeader>
        <ModalBody>
            <Form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <label>* Producto</label>
                    <Select options={state.productos}
                            placeholder="Seleccione un producto"
                            name="id_producto"
                            value={props.editMode ? props.id_producto : undefined}
                            onChange={event => handleSelect(event)}/>
                </FormGroup>
                <FormGroup>
                    <label>* Cantidad</label>
                    <input type="number" name="cantidad" min="1" step="1" max="100" id=""
                           value={props.editMode ? props.cantidad : undefined}
                           onChange={event => updateTotal(event)}/>
                </FormGroup>
                <FormGroup>
                    <label>Total</label>
                    <input ref={select}
                           value={props.editMode ? props.total : state.total}
                           onChange={event => props.handleInputChange(event)}
                           disabled/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={() => props.toggleModal()}>Cancelar</Button>
            <Button form="form" type="submit" color="primary" onClick={() => props.toggleModal()}>Registrar Venta</Button>{' '}
        </ModalFooter>
    </Modal>);
};

export default ModalVenta;

const api_url = url_base;

export default class RegistrarVenta extends React.Component{

    constructor(props) {
        super(props);

        state = {
            total: 0,
            productos: [],
        };

        select = React.createRef();
    }

    componentDidMount() {

        var array = [];
        var arrayProductosPrecios = [];
        fetch(`${api_url}productos`, {
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

            }).then(response => {

                response.map((val) => {
                    array.push({value:val.id,label:val.producto});
                    arrayProductosPrecios.push({idProducto:val.id,precio:val.precio});
                });
                setState({productos: array, productosPrecios: arrayProductosPrecios})
            }
        );
    }

    handleSelect = object => {
        setState({selectedProduct: object.value});
        props.handleSelectChange(object);
    }

    updateTotal = event => {
        const target = event.target;
        const value = target.value;
        var precio = 0;
        var productosPrecios = state.productosPrecios;
        productosPrecios.map((val,index) => {
            if(val.idProducto === state.selectedProduct) {
                precio = val.precio;
            }
        });

        var total = value * precio;
        setState({total:total});
        props.updateTotal(total);
        props.handleInputChange(event);
    }

    render () {

    }
};

