import React, {Component} from 'react'
import logo from '../../assets/img/logo-login.png'
import logoResp from '../../assets/img/logo-login-res.png'
import Services from '../../services';

import * as ROUTES from '../../constants/routes'
/**
 * @author Erik Loaiza & Marco Roldan
 * Component view to handle the first view of the app, the authentication phase
 * @param correo= the mail of the user
 * @param contraseña= the passord of the user NOT IMPLEMENTED YET
 */
import './Login.css'
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            correo:'',
            contraseña:'',
        }
    }
    render(){
        const correo = this.state.correo
        const contraseña = this.state.contraseña
        return(
            <div className="row m-0 vh-100 overflow-hidden login">
                <div className="col">
                    <img src={logo} alt="Logo" className="d-none d-lg-block h-100"/>
                    <img src={logoResp} alt="Logo" className="d-block d-lg-none mx-auto"/>
                </div>
                <div className="col-lg-4 pr-5 ml-md-n4 d-flex flex-column align-items-center justify-content-center">
                    <h3 >Plataforma de administración</h3>
                    <form action="" className="my-5 w-75 d-flex flex-column position-relative" onSubmit={this.login}>
                        <input type="text" name="user" id="user" placeholder="Usuario" value={correo} onChange={(e)=>this.setState({correo:e.target.value})}/>
                        <input type="password" name="pass" id="pass" placeholder="Contraseña" value={contraseña} onChange={(e)=>this.setState({contraseña:e.target.value})}/>
                        <button className="btn btn-violet-primary position-absolute">Iniciar Sesión</button>
                    </form>     
                    <div className="row justify-content-around w-100">
                        <input className="inp-cbx d-none" id="cbx" type="checkbox"/>
                        <label className="cbx" htmlFor="cbx"><span>
                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                            </svg></span><span>Recordarme</span>
                        </label>
                        <a href="#" className="mr-auto ml-auto">¿Olvidó su contraseña?</a>
                    </div>
                    <h5 className="py-5">¿No tienes cuenta? <a href="#">Regístrate</a></h5>
                    <span>Esta información sólo se puede utilizar con</span>
                    <b>fines académicos</b>
                </div>
            </div>
        );
    }
    /**
     * this method search in the backend of the teacher that match the provided mail
     * if no match an empty array is returned
     * @param e: the event cgenerated after the login button is clicked
     */
    login=(e)=>{
        e.preventDefault()
        var correo = this.state.correo
        Services.getDocente(correo)
        .then(response=>{
            return response.json();
        })
        .then(data=>{
            if(data.length){
                var docente = data[0]
                localStorage.setItem('user',JSON.stringify(docente))
                this.props.history.push(ROUTES.HOME+ROUTES.MODULES)
            }
        })
    }
}

export default Login;