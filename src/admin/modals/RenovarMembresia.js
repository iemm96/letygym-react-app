import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {url_base} from '../../constants/api_url';
import Select from "react-select";

const api_url = url_base;

export default class RenovarMembresia extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            mebresias:[],
            precio: 0,
        }

        this.textInput = React.createRef();
    }

    componentDidMount() {

        var array = [];
        var membresiasPrecios = [];

        console.log(this.props.socioMembresiaId);

        this.setState({socioMembresiaId:this.props.socioMembresiaId});

        fetch(`${api_url}membresias`, {
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
                array.push({value:val.id,label:val.membresia});
                membresiasPrecios.push({idMembresia:val.id,precio:val.precio});
            });

            this.setState({membresias: array, membresiasPrecios: membresiasPrecios});

            }
        );
    }

    handleRenovarMembresia = (event) => {
        event.preventDefault();

        fetch(`${api_url}socioMembresia/${this.textInput.current.props.value}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:this.stringifyData()
        }).then((res) => res.json())
            .then((data) =>  {
                if(data.id){
                    window.location.reload();
                }
            })
            .catch((err)=>console.log(err))
    }

    handleSelect = object => {
        this.setState({selectedMembresia: object.value});
        //this.handleSelectChange(object);
        this.updateTotal(object.value);
    }

    handleSelectChange = object => {
        this.setState({
            id_membresia: object.value
        });

    }

    updateTotal = selectedMembresia => {
        var precio = 0;
        var membresiasPrecios = this.state.membresiasPrecios;
        membresiasPrecios.map((val,index) => {
            if(val.idMembresia == selectedMembresia) {
                precio = val.precio;
            }
        });

        console.log(precio);
        this.setState({precio:precio});
    }

    stringifyData = () => {

        var json = JSON.stringify({
            id_membresia:this.state.selectedMembresia,
            pago:this.state.precio,
        });

        return json;
    };

    render() {
        return(<Modal isOpen={this.props.modalRecord} toggleMembresiaModal={() => this.props.toggleMembresiaModal(1)} className={this.props.className}>
            <ModalHeader>Renovar Membresía de {this.props.nombreSocio}</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.handleRenovarMembresia}>
                    <Input name="id_membresia" value={this.props.socioMembresiaId} ref={this.textInput} hidden={true}/>
                    <FormGroup>
                        <label>Nombre Completo:</label>
                        <Input type="text" name="nombre" id="" value={this.props.nombreCompleto} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <label>Pago por:</label>
                        <Select options={this.state.membresias}
                                placeholder="Seleccione una membresía"
                                name="id_membresia"
                                onChange={event => this.handleSelect(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Cantidad a cobrar:</label>
                        <Input type="text" name="cantidad" id="" value={'$' + this.state.precio} disabled/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleMembresiaModal()}>Cancelar</Button>
                <Button color="primary" form="form" type="submit">Renovar Membresía</Button>{' '}
            </ModalFooter>
        </Modal>);
    }

    
};

