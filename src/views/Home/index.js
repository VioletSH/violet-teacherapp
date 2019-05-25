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

}
export default Home;
