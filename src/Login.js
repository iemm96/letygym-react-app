import React from 'react';
import './styles/style.scss';

const ApiUrl = React.createContext('https://api-letygym.nucleodev.com/');

export default class Login extends React.Component{

    static contextType = ApiUrl;

    componentDidMount() {
        /*
        var inputForm = document.getElementsByClassName('input-form');

        inputForm.addEventListener('change', function () {
            this.classList.remove('bounce');
        });*/
    }


    /*
    render() {
        return (
            <div className="center">
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">
                        <form action="">
                            <div className="form-group">
                                <input _ngcontent-c0="" className="form-control form-control-lg"
                                       placeholder="User email" type="text"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control form-control-lg" placeholder="Password" type="password"/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-info btn-lg btn-block">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }*/

    render() {
        return (
            <div className="row justify-content-center h-100">
                    <div id="cardLogin" className="login card card-nav-tabs animate fadeInUp one">
                        <div className="card-body">
                            <form id="formLogin" className="center" onSubmit={this.submitForm}>
                                <h3>Bienvenid@ a LetyGym</h3>
                                <div className="form-group">
                                    <input id="inputEmail" type="text" className="input-form" name="username"
                                           aria-describedby="emailHelp" placeholder="Nombre de Usuario"
                                           onChange={this.clearInput}/>
                                </div>
                                <div className="form-group">
                                    <input id="inputPassword" type="password" className="input-form"
                                           name="password"
                                           placeholder="Password" onChange={this.clearInput}/>
                                </div>
                                <div className="error-box" style={{display: undefined}}>

                                </div>
                                <button id="btnIngresar" type="submit" className="">Ingresar</button>
                            </form>
                        </div>
                    </div>
            </div>

        );
    }

    submitForm(e) {

        e.preventDefault();
        var btnIngresar = document.getElementById('btnIngresar').firstChild;
        var xhr = new XMLHttpRequest();
        var inputEmail = document.getElementById('inputEmail');
        var inputPassword = document.getElementById('inputPassword');
        var cardLogin = document.getElementById('cardLogin');

        cardLogin.classList.remove('animate','one','fadeInUp');

        cardLogin.classList.add('fadeOut');

        btnIngresar.data = 'Ingresando';


        /*
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here

            if(xhr.success !== true) {
                if(xhr.type === 'password') {
                    inputPassword.classList.add('bounce');
                }

                if(xhr.type === 'email') {
                    inputEmail.classList.add('bounce');
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

        if(inputEmail.innerText === '') {
            inputEmail.classList.add('bounce');
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
