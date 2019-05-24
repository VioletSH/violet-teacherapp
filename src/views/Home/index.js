import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Services from '../../services';

import * as ROUTES from '../../constants/routes'

import './Home.css'

import Banner from '../../components/Banner'
import Asignatures from '../Asignatures'
import Dashboard from '../Dashboard'
import Students from '../Students'

class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            asignature:{}
        }
    }
    render(){
        return(
            <div className="d-flex flex-column home">
                <Banner asignature={this.state.asignature}/>
                <div className="px-5 bg-light flex-grow-1 jutify-content-center d-flex">
                    <Switch>
                        <Route path={this.props.match.path+ROUTES.ASIGNATURES} 
                            render={(props) => <Asignatures {...props} setAsignature={this.setAsignature} />} />

                        <Route path={this.props.match.path+ROUTES.MODULES} 
                            render={(props) => <Dashboard {...props} asignature={this.state.asignature} />} />
                        <Route path={this.props.match.path+ROUTES.STUDENTS} 
                            render={(props) => <Students {...props} asignature={this.state.asignature} />} />

                        <Redirect from={this.props.match.path} to ={this.props.match.path+ROUTES.ASIGNATURES}/>
                    </Switch>
                </div>
            </div>
        );
    }
    setAsignature=(idAsignature,idGroup)=>{
        var asignature={}
        Services.getCurso(idAsignature)  
        .then(response=>{
         return response.json();
         })
         .then((curso)=>{
             asignature=curso
             var group = asignature.grupos.find(x=> x.id === idGroup)
             delete asignature.grupos
             asignature.grupo = group
             return curso.modulos
         })
         .then((modules)=>{
             var modulesWithNestedData = modules;
             modulesWithNestedData.forEach(module => {
                module.actividades = []
                Services.getModulo(module.id)  
                .then(response=>{
                    return response.json();
                })
                .then((modulo)=>{
                    return modulo.actividades
                })
                .then((actividades)=>{
                    actividades.forEach(actividad=>{
                        actividad.contenidos=[]
                        Services.getContenidos(actividad.id)
                        .then(response=>{
                            return response.json();
                        })
                        .then((contenidos)=>{
                            actividad.contenidos=(contenidos)
                            module.actividades.push(actividad)
                            asignature.modulos=modulesWithNestedData
                            this.setState({
                                asignature:asignature
                            })
                        })
                    })
                })
             });
         })
    }

}
export default Home;
