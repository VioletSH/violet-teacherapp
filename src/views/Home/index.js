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
                            render={(props) => <Dashboard {...props} 
                            asignature={this.state.asignature} 
                            addModule={this.addModule}
                            addActivity={this.addActivity}
                            addContent={this.addContent}
                            />} />

                        <Route path={this.props.match.path+ROUTES.STUDENTS} 
                            render={(props) => <Students {...props} group={this.state.asignature.grupo} />} />

                        <Redirect from={this.props.match.path} to ={this.props.match.path+ROUTES.ASIGNATURES}/>
                    </Switch>
                </div>
            </div>
        );
    }
    setAsignature=(idAsignature,idGroup)=>{
        Services.getCursoGrupo(idAsignature,idGroup)  
        .then(response=>{
         return response.json();
         })
        .then((curso)=>{
            this.setState({
                asignature:curso
            })
        })
    }
    
    addModule=(nombre)=>{
        var idAsignature = this.state.asignature.id;
        if(!idAsignature|!nombre)return
        var that = this;

        Services.postModulo(idAsignature,nombre)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('added', data);
            var asignatureCopy = JSON.parse(JSON.stringify(that.state.asignature))
            asignatureCopy.modulos.push(data)
            that.setState({
                asignature:asignatureCopy
            })
        });
    }
    addActivity=(idModule,nombre,desc)=>{
        if(!idModule|!nombre|!desc)return
        var that = this;
        
        Services.postActividad(idModule,nombre,desc)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('added', data);
            var asignatureCopy = JSON.parse(JSON.stringify(that.state.asignature))
            var moduleIndex = asignatureCopy.modulos.findIndex(x=>x.id===data.modulo.id)
            console.log(moduleIndex)
            asignatureCopy.modulos[moduleIndex].actividades.push(data)
            that.setState({
                asignature:asignatureCopy
            })
        });
    }
    addContent=(idModulo,idActividad,url,tipo)=>{
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
                var asignatureCopy = JSON.parse(JSON.stringify(that.state.asignature))
                var moduleIndex = asignatureCopy.modulos.findIndex(x=>x.id==idModulo)
                var activityIndex = asignatureCopy.modulos[moduleIndex].actividades.findIndex(x=>x.id==data.actividad.id)
                asignatureCopy.modulos[moduleIndex].actividades[activityIndex].contenidos.push(data)
                that.setState({
                    asignature:asignatureCopy
                })
            })
        })

    }

}
export default Home;
