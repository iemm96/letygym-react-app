import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import Select from 'react-select'
import InputNumber from "rc-input-number";
import {url_base} from '../../constants/api_url';

const api_url = url_base;

export default class RegistrarVenta extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            productos: [],
        }

        this.select = React.createRef();
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

                response.map((val,index) => {
                    array.push({value:val.id,label:val.producto});
                    arrayProductosPrecios.push({idProducto:val.id,precio:val.precio});
                });
                this.setState({productos: array, productosPrecios: arrayProductosPrecios})
            }
        );
    }

    handleSelect = object => {
        this.setState({selectedProduct: object.value});

    }

    updateTotal = event => {
        const target = event.target;
        const value = target.value;
        var precio = 0;
        var productosPrecios = this.state.productosPrecios;
        productosPrecios.map((val,index) => {
            if(val.idProducto == this.state.selectedProduct) {
                precio = val.precio;
            }
        });

        this.setState({total:(value * precio)});
    }

    render () {
        return(<Modal isOpen={this.props.modalRecord} toggle={() => this.props.toggleModal(1)} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleModal}>Registrar Venta</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <label>* Producto</label>
                        <Select options={this.state.productos}
                                placeholder="Seleccione un producto"
                                name="id_producto"
                                value={this.props.editMode ? this.props.id_producto : undefined}
                                onChange={event => this.handleSelect(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <label>* Cantidad</label>
                        <Input type="number" name="cantidad" min="1" step="1" max="100" id=""
                               value={this.props.editMode ? this.props.cantidad : undefined}
                               onChange={event => this.updateTotal(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Total</label>
                        <Input ref={this.select}
                               value="$50.00"
                               value={this.props.editMode ? this.props.total : this.state.total}
                               onChange={event => this.props.handleInputChange(event)}
                               disabled/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal}>Cancelar</Button>
                <Button color="primary" onClick={() => this.props.toggleModal}>Registrar Venta</Button>{' '}
            </ModalFooter>
        </Modal>);
    }
};

