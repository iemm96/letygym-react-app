import React, {useState} from 'react';
import './styles/style.scss';
import ListaResultados from "./ListaResultados";
import ModalMembresia from "./ModalMembresia";

const ApiUrl = React.createContext('https://api-letygym.nucleodev.com/');
let arr = ["anagrams-of-string-(with-duplicates)", "array-concatenation", "array-difference", "array-includes", "array-intersection", "array-remove", "array-sample", "array-union", "array-without", "array-zip", "average-of-array-of-numbers", "bottom-visible", "capitalize-first-letter-of-every-word", "capitalize-first-letter", "chain-asynchronous-functions", "check-for-palindrome", "chunk-array", "collatz-algorithm", "compact", "count-occurrences-of-a-value-in-array", "current-URL", "curry", "deep-flatten-array", "distance-between-two-points", "divisible-by-number", "drop-elements-in-array", "element-is-visible-in-viewport", "escape-regular-expression", "even-or-odd-number", "factorial", "fibonacci-array-generator", "fill-array", "filter-out-non-unique-values-in-an-array", "flatten-array-up-to-depth", "flatten-array", "get-days-difference-between-dates", "get-max-value-from-array", "get-min-value-from-array", "get-native-type-of-value", "get-scroll-position", "greatest-common-divisor-(GCD)", "group-by", "hamming-distance", "head-of-list", "hexcode-to-RGB", "initial-of-list", "initialize-array-with-range", "initialize-array-with-values", "is-array", "is-boolean", "is-function", "is-number", "is-string", "is-symbol", "last-of-list", "measure-time-taken-by-function", "median-of-array-of-numbers", "nth-element-of-array", "number-to-array-of-digits", "object-from-key-value-pairs", "object-to-key-value-pairs", "ordinal-suffix-of-number", "percentile", "pick", "pipe", "powerset", "promisify", "random-integer-in-range", "random-number-in-range", "redirect-to-URL", "reverse-a-string", "RGB-to-hexadecimal", "round-number-to-n-digits", "run-promises-in-series", "scroll-to-top", "shallow-clone-object", "shuffle-array", "similarity-between-arrays", "sleep", "sort-characters-in-string-(alphabetical)", "speech-synthesis-(experimental)", "standard-deviation", "sum-of-array-of-numbers", "swap-values-of-two-variables", "tail-of-list", "take-right", "take", "truncate-a-string", "unique-values-of-array", "URL-parameters", "UUID-generator", "validate-email", "validate-number", "value-or-default", "write-json-to-file"];

let list = '';
let arrayResults = [];

export default class Asistencia extends React.Component{

    static contextType = ApiUrl;

    constructor(props)
    {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {
            showResults: false,
            isHovering: false,
            arrayResults: [],
            isLoading: false,
            isCorrect: false,
            isDisabled: false,
            hoverEnable: true,
            buttonText: 'Registrar Asistencia',
            modalMembresia: false
        }
    }

    componentDidMount() {
        /*
        var inputForm = document.getElementsByClassName('input-form');

        inputForm.addEventListener('change', function () {
            this.classList.remove('bounce');
        });*/
    }

    updateResult = event => {
        let resultList = document.querySelector("#result-list");

        if(event.target.value.length > 2) {
            arrayResults = [];

            resultList.style = 'display: block';

            arr.map(algo => {
                event.target.value.split(" ").map(word => {
                    if(algo.toLowerCase().indexOf(word.toLowerCase()) != -1) {

                        this.setState({arrayResults: arrayResults.push(algo)})
                    }
                });
            });
        }else{

            resultList.style = 'display: none';
        }

    };

    toggleModal = () => (this.state.modalMembresia ? this.setState({modalMembresia: false}) : this.setState({modalMembresia: true}));

    handleMouseHover = () => (this.setState(this.toogleHoverState));

    toogleHoverState = state => {
        console.log(this.state.isHovering);
        return ({isHovering: !state.isHovering});
    };

    checarAsistencia = index => {


        //var span = document.getElementsByTagName('span');

        this.setState({hoverEnable: false});
        this.setState({isLoading: true});
        this.setState({buttonText: 'Registrando...'});

        var self = this;

        var state = false;

        if(state) {
            setTimeout(function () {
                // and call `resolve` on the deferred object, once you're done
                self.setState({isLoading: false});
                self.setState({isCorrect: true});
                self.setState({isDisabled: true});
                self.setState({buttonText: 'Correcto!'});


            }, 800);

            setTimeout(function () {
                window.location.reload();
            },5000);
        }else{
            this.setState({modalMembresia: true})
        }

    };

    render() {
        return (
            <div className="row justify-content-center h-100">
                <ModalMembresia
                    toggleModal={this.toggleModal}
                    modalMembresia={this.state.modalMembresia}
                />
                <div id="cardLogin" className="login card card-nav-tabs animate fadeInUp one">
                    <div className="card-body">
                        <form id="formLogin" className="center" onSubmit={this.submitForm}>
                            <h3>Bienvenid@ a LetyGym</h3>
                            <div className="form-group">
                                <input onInput={this.updateResult}
                                       id="inputNombre" type="text"
                                       className="input-form" name="username"
                                       aria-describedby=""
                                       placeholder="Ingresa tu nombre para registrar tu asistencia"
                                       onChange={this.clearInput}/>
                            </div>
                            <div className="">
                                <ul id="result-list" className="list-group result">
                                    <ListaResultados list={arrayResults}
                                                     checarAsistencia={this.checarAsistencia}
                                                     isLoading={this.state.isLoading}
                                                     isCorrect={this.state.isCorrect}
                                                     isDisabled={this.state.isDisabled}
                                                     buttonText={this.state.buttonText}
                                                     hoverEnable={this.state.hoverEnable}
                                    />
                                </ul>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }

    submitForm(e) {

        e.preventDefault();
        var xhr = new XMLHttpRequest();
        var inputNombre = document.getElementById('inputNombre');
        var inputPassword = document.getElementById('inputPassword');
        var cardLogin = document.getElementById('cardLogin');

        cardLogin.classList.remove('animate','one','fadeInUp');

        cardLogin.classList.add('fadeOut');

        /*
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here

            if(xhr.success !== true) {
                if(xhr.type === 'password') {
                    inputPassword.classList.add('bounce');
                }

                if(xhr.type === 'email') {
                    inputNombre.classList.add('bounce');
                }

                btnIngresar.innerText = 'Ingresar';
            }
            console.log(xhr.success)
        });
        // open the request with the verb and the url
        xhr.open('POST', this.context)
        // send the request
        xhr.send()*/

        /*
        if(inputPassword.innerText === '') {
            inputPassword.classList.add('bounce');
        }

        if(inputNombre.innerText === '') {
            inputNombre.classList.add('bounce');
        }*/

        //btnIngresar.innerText = 'Ingresar';


        setTimeout(function () {
            // and call `resolve` on the deferred object, once you're done
            window.location.href = '/admin/index';

        }, 500);

    }

    clearInput(e)
    {
        e.target.classList.remove('bounce');
    }

};
