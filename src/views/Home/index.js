import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

import Banner from '../../components/Banner'
import Asignatures from '../Asignatures'
import Modules from '../Modules'

class Home extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="h-100">
                <Banner/>
                <div className="h-100 d-flex mt-5 pt-2">
                    <Switch>
                        <Route path={this.props.match.path+ROUTES.ASIGNATURES} component={Asignatures} />
                        <Route path={this.props.match.path+ROUTES.MODULES} component={Modules} />
                        <Redirect from={this.props.match.path} to ={this.props.match.path+ROUTES.ASIGNATURES}/>
                    </Switch>
                </div>
            </div>
        );
    }

}
export default Home;
