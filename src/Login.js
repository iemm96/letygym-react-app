import React from 'react';
import './styles/style.scss';

const ApiUrl = React.createContext('https://api-letygym.nucleodev.com/');

export default class Login extends React.Component{

    static contextType = ApiUrl;

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
        var cardLogin = document.getElementById('cardLogin');

        cardLogin.classList.remove('animate','one','fadeInUp');

        cardLogin.classList.add('fadeOut');

        btnIngresar.data = 'Ingresando';

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
