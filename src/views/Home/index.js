import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

import Banner from '../../components/Banner'
import Asignatures from '../Asignatures'
import Dashboard from '../Dashboard'

class Home extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="h-100 d-flex flex-column">
                <Banner/>
                <div className="px-5 bg-light flex-grow-1 jutify-content-center d-flex">
                    <Switch>
                        <Route path={this.props.match.path+ROUTES.ASIGNATURES} component={Asignatures} />
                        <Route path={this.props.match.path+ROUTES.MODULES+'/:idCurso/:idGrupo'} component={Dashboard} />
                        <Redirect from={this.props.match.path} to ={this.props.match.path+ROUTES.ASIGNATURES}/>
                    </Switch>
                </div>
            </div>
        );
    }

}
export default Home;
