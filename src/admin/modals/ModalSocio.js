import React  from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import {url_base} from '../../constants/api_url';
import Select from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const api_url = url_base;
export default class ModalSocio extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            idSocio: this.props.idSocio,
            bActiva: this.props.bActiva,
            nombre: undefined,
            apellidoP: undefined,
            apellidoM: undefined,
            membresias: [],
            valueStart: new Date(),
            valueEnd: new Date()
        }
    }

    componentDidMount() {
        var array = [];

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
                });

                this.setState({membresias: array})
            }
        );
    }

    handleSelect = object => {
        this.setState({id_membresia: object.value});
        this.props.handleSelectChange(object);
    }

    handleChangeStart = date => {
        this.setState({
            valueStart: date
        });
    };

    handleChangeEnd = date => {
        this.setState({
            valueEnd: date
        });
    };

    handleNewSocio = event => {

        event.preventDefault();
        fetch(`${api_url}socio`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:this.stringifyData()
        }).then((res) => res.json())
            .then((data) =>  {
                if(data.id) {
                    window.location.reload();
                }
            })
            .catch((err)=>console.log(err))

    }

    handleEditSocio = event => {

        event.preventDefault();
        fetch(`${api_url}socio/${this.props.idSocio}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json, text-plain, */*",
            },
            body:this.stringifyData()
        }).then((res) => res.json())
            .then((data) =>  {
                if(data.id) {
                    window.location.reload();
                }
            })
            .catch((err)=>console.log(err))

    }

    stringifyData = () => {
        return JSON.stringify({
            nombre:this.state.nombre,
            apellidoPaterno:this.state.apellidoPaterno,
            apellidoMaterno:this.state.apellidoMaterno,
            id_membresia:this.state.id_membresia,
            bActiva:this.state.bActiva,
            fecha_inicio:this.state.valueStart,
            fecha_fin:this.state.valueEnd
        })
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        var membresiaSection = <div><FormGroup>
                <Label>* ¿Qué tipo de membresía tiene?</Label>
                <Select options={this.state.membresias}
                        placeholder="Seleccione una membresía"
                        name="id_membresia"
                        onChange={event => this.handleSelect(event)}/>
            </FormGroup>
            <FormGroup row>
                <Col md={6}>
                    <Label>¿Cuándo inició?</Label>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={this.state.valueStart}
                        onChange={this.handleChangeStart}
                    />
                </Col>
                <Col md={6}>
                    <Label>* ¿Cuándo finalizará?</Label>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={this.state.valueEnd}
                        onChange={this.handleChangeEnd}
                    />
                </Col>
            </FormGroup>
            </div>;


        return(<Modal isOpen={this.props.modalSocio} toggle={() => this.props.toggleModal(1)} className={this.props.className}>
            <ModalHeader toggle={() => this.props.toggleModal(1)}>{this.props.editMode ? 'Editar' : 'Nueva'} Socia</ModalHeader>
            <ModalBody>
                <Form id="form" onSubmit={this.props.editMode ? this.handleEditSocio : this.handleNewSocio}>
                    <Row form>
                        <Col>
                            <FormGroup>
                                <Label>* Nombre</Label>
                                <Input type="text" name="nombre" id="" value={this.props.editMode ? this.props.nombre : undefined}
                                       onChange={event => this.handleInputChange(event)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup row>
                        <Col md={6}>
                            <Label>* Apellido Paterno</Label>
                            <Input type="text" name="apellidoPaterno" id=""
                                   value={this.props.editMode ? this.props.apellidoPaterno : undefined}
                                   onChange={event => this.handleInputChange(event)} />
                        </Col>
                        <Col md={6}>
                            <Label>* Apellido Materno</Label>
                            <Input type="text" name="apellidoMaterno" id=""
                                   value={this.props.editMode ? this.props.apellidoMaterno : undefined}
                                   onChange={event => this.handleInputChange(event)} />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label>* ¿Tiene membresía activa?</Label>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="bActiva" value="1" onChange={event => this.handleInputChange(event)}/>{' '}
                                Si
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="bActiva" value="0" onChange={event => this.handleInputChange(event)} />{' '}
                                No
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    {this.state.bActiva === 1 ? membresiaSection : ''}
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleModal(1)}>Cancelar</Button>
                <Button form="form" type="submit" color="primary">{this.props.editMode ? 'Editar ' : 'Agregar '} Socia</Button>
            </ModalFooter>
        </Modal>);
    }
    
};
