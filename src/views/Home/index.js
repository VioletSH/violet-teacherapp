import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Services from '../../services';

import * as ROUTES from '../../constants/routes'

import './Home.css'

import Banner from '../../components/Banner'
import Cursos from '../Cursos'
import Dashboard from '../Dashboard'
import Estudiantes from '../Estudiantes'
/**
 * @author Erik Loaiza & Marco Roldan
 * Component view to handle as parent of everything in the app (except by the login),
 * it handle every comunication with ./services and API, and defines most of the logic to
 * perform CRUD. Also handles the route rendering and the Banner component
 * @param curso, the selected curso, that will render its info in the other views, this value will be
 * send as props to children
 */
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            curso:{}
        }
    }
    render(){
        return(
            <div className="d-flex flex-column home">
                <Banner curso={this.state.curso}/>
                <div className="px-5 bg-light flex-grow-1 jutify-content-center d-flex">
                    <Switch>
                        <Route path={this.props.match.path+ROUTES.CURSOS} 
                            render={(props) => <Cursos {...props} setCurso={this.setCurso}/>} />

                        <Route path={this.props.match.path+ROUTES.MODULES} 
                            render={(props) => <Dashboard {...props} 
                            curso={this.state.curso} 
                            agregarModulo={this.agregarModulo}
                            agregarActividad={this.agregarActividad}
                            agregarContenido={this.agregarContenido}
                            eliminarModulo={this.eliminarModulo}
                            eliminarActividad={this.eliminarActividad}
                            />} />

                        <Route path={this.props.match.path+ROUTES.STUDENTS} 
                            render={(props) => <Estudiantes {...props} grupo={this.state.curso.grupo} />} />

                        <Redirect from={this.props.match.path} to ={this.props.match.path+ROUTES.CURSOS}/>
                    </Switch>
                </div>
            </div>
        );
    }
    /** prevents rendering if there is not Curso/selected and if not user is loged in*/
    componentDidMount(){
        if(Object.keys(this.state.curso).length===0)
        this.props.history.push(ROUTES.HOME+ROUTES.CURSOS)

        if(!localStorage.user){
            this.props.history.push(ROUTES.LOGIN)
        }
    }
    /** Gets all detailed data of a the selected Curso/Grupo and sets it in state to pass to children*/
    setCurso=(idAsignature,idGroup)=>{
        Services.getCursoGrupo(idAsignature,idGroup)  
        .then(response=>{
         return response.json();
         })
        .then((curso)=>{
            this.setState({
                curso:curso
            })
        })
    }
    /** adds a module with the API to backend and to selected Curso/Grupo object
    * @param nombre: the name of the module
    */
    agregarModulo=(nombre)=>{
        var idAsignature = this.state.curso.id;
        if(!idAsignature|!nombre)return
        var that = this;

        Services.postModulo(idAsignature,nombre)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('added', data);
            var cursoCopia = JSON.parse(JSON.stringify(that.state.curso))
            cursoCopia.modulos.push(data)
            that.setState({
                curso:cursoCopia
            })
        });
    }
    /** deletes a module with the API to backend and to selected Curso/Grupo object
    * @param idModule: the id of the module
    */
    eliminarModulo=(idModule)=>{
        var that = this;
        Services.deleteModulo(idModule)
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            console.log('removed',data)
            var cursoCopia = JSON.parse(JSON.stringify(that.state.curso))
            cursoCopia.modulos = cursoCopia.modulos.filter(x=>x.id!=data.id)
            that.setState({
                curso:cursoCopia
            })
        })
    }
    /** adds an activity with the API to backend and to selected Curso/Grupo object
    * @param nombre: the name of the activity
    * @param idModule: the id of the module where will be related the activity
    * @param desc: the description of the activity NOT USED YET IN BACKEND
    */
    agregarActividad=(idModule,nombre,desc)=>{
        if(!idModule|!nombre|!desc)return
        var that = this;
        
        Services.postActividad(idModule,nombre,desc)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('added', data);
            var cursoCopia = JSON.parse(JSON.stringify(that.state.curso))
            var moduleIndex = cursoCopia.modulos.findIndex(x=>x.id===data.modulo.id)
            console.log(moduleIndex)
            cursoCopia.modulos[moduleIndex].actividades.push(data)
            that.setState({
                curso:cursoCopia
            })
        });
    }
    /** deletes an activity with the API to backend and to selected Curso/Grupo object
    * @param idModule: the id of the module
    * @param idAcivity: the id of the activity
    */
    eliminarActividad=(idModule,idAcivity)=>{
        var that = this;
        Services.deleteActividad(idAcivity)
        .then(response=>{
            return response.json()
        })
        .then(data=>{
            console.log('removed',data)
            var cursoCopia = JSON.parse(JSON.stringify(that.state.curso))
            var moduleIndex = cursoCopia.modulos.findIndex(x=>x.id===data.modulo.id)
            var module = cursoCopia.modulos[moduleIndex]
            module.actividades = module.actividades.filter(x=>x.id!=data.id)
            that.setState({
                curso:cursoCopia
            })
        })
    }
    /** adds a content with the API to backend and to selected Curso/Grupo object
     * needs to create a resource in the backend and then it relates its id to the activity to
     * create the content
    * @param idModulo: the id of the module where will be related the activity that has the content
    * @param idActividad: the id of the activity where will be related the content
    * @param url: the url where the resource will be found
    * @param tipo: the MIME type of the resource
    */
    agregarContenido=(idModulo,idActividad,url,tipo)=>{
        console.log('module: '+ idModulo+' Actividad: '+ idActividad + ' url: '+url+' Tipo: '+tipo)
        if(!idModulo|!idActividad|!url|!tipo)return
        var that = this;

        Services.postResource(url,tipo)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            Services.postContent(idActividad,data.id)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log('added', data);
                var cursoCopia = JSON.parse(JSON.stringify(that.state.curso))
                var moduleIndex = cursoCopia.modulos.findIndex(x=>x.id==idModulo)
                var activityIndex = cursoCopia.modulos[moduleIndex].actividades.findIndex(x=>x.id==data.actividad.id)
                cursoCopia.modulos[moduleIndex].actividades[activityIndex].contenidos.push(data)
                that.setState({
                    curso:cursoCopia
                })
            })
        })

    }

}
export default Home;
