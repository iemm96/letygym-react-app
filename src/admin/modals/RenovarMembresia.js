import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {url_base} from '../../constants/api_url';
import Select from "react-select";
import moment from 'moment';
import 'moment/locale/es';
import {store} from "react-notifications-component";

const api_url = url_base;

export default class RenovarMembresia extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            mebresias:[],
            precio: 0,
            diasProrroga: 0,
            fechaProrroga: null,
            displayDivProrroga: false,
        }

        this.textInput = React.createRef();
    }

    componentDidMount() {

        var array = [];
        var membresiasPrecios = [];


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
                    store.addNotification({
                        title: "Correcto",
                        message: `Se ha renovado la membresía de ${this.props.nombreSocio}` ,
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

                    this.props.updateRecords();
                }
            })
            .catch((err)=>console.log(err))
    };

    handleSelect = object => {
        this.setState({selectedMembresia: object.value},() => this.updateFechaPago());
        this.handleSelectChange(object);
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
    };

    stringifyData = () => {

        var json = JSON.stringify({
            id_membresia:this.state.selectedMembresia,
            pago:this.state.precio,
            diasProrroga:this.state.diasProrroga,
            fechaSigCobro:this.state.fechaProrrogaForm,
        });

        return json;
    };

    updateFechaPago = () => {

        //Se muestra el div con la información de la prorroga
        this.setState({displayDivProrroga:true});
        moment().locale('es');

        let date = moment(new Date(), "DD.MM.YYYY");
        date.add(this.state.diasProrroga, 'days');

        //Se agregan los días o meses necesarios dependiendo el valor del select membresía
        switch (this.state.selectedMembresia) {
            case 1: {
                date.add(7,'days');
                break;
            }
            case 2: {
                date.add(1,'months');
                break;
            }
            case 3: {
                date.add(2,'months');
                break;
            }
            case 4: {
                date.add(3,'months');
                break;
            }
        }

        //Se guarda en status los datos de la fecha actualizados
        if(this.state.selectedMembresia) {
            this.setState({fechaProrrogaForm:date.format('YYYY-M-DD')});
            this.setState({diaProrroga:date.format('DD')});
            this.setState({mesProrroga:date.format('MMMM')});
            this.setState({yearProrroga:date.format('YYYY')});
        }
    }

    handleChangeDiasProrroga = event => {
        this.setState({diasProrroga:event.target.value},() => this.updateFechaPago());
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
                        <label>Membresía:</label>
                        <Select options={this.state.membresias}
                                placeholder="Seleccione una membresía"
                                name="id_membresia"
                                onChange={event => this.handleSelect(event)}/>
                    </FormGroup>
                    <FormGroup>
                        <label>Cantidad a cobrar:</label>
                        <Input type="text" name="cantidad" id="" value={'$' + this.state.precio} disabled/>
                    </FormGroup>
                    <FormGroup>
                        <label>Días de prorroga:</label>
                        <Input id="selectDiasProrroga" onChange={(event) => this.handleChangeDiasProrroga(event)} type="number" name="prorroga" pattern="[0-9]*" inputMode="numeric" defaultValue={0}/>
                    </FormGroup>
                    {this.state.displayDivProrroga ?  <FormGroup>
                        <p>El siguiente pago será el <b>{this.state.diaProrroga} de <span style={{textTransform:'capitalize'}}>{this.state.mesProrroga}</span> de {this.state.yearProrroga}</b></p>
                    </FormGroup> : ''}
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => this.props.toggleMembresiaModal()}>Cancelar</Button>
                <Button color="primary" form="form" type="submit">Renovar Membresía</Button>{' '}
            </ModalFooter>
        </Modal>);
    }

    
};

