import React,{Component} from 'react'

import Logo from '../../assets/logo.png'
import './Banner.css'

import * as ROUTES from '../../constants/routes'
import {withRouter} from 'react-router-dom';

class Banner extends Component{
    constructor(props){
        super(props)
        this.state={
            routeArray:[]
        }
    }
    render(){
        const asignature = Object.entries(this.props.asignature).length!=0?this.props.asignature:null;
        const routeArray=this.props.location.pathname.split('/')
        const location =routeArray.includes(ROUTES.MODULES.substring(1,ROUTES.MODULES.length))?
                        0:
                            routeArray.includes(ROUTES.STUDENTS.substring(1,ROUTES.STUDENTS.length))?
                        1:-1;
        return(
            <nav className="navbar navbar-expand-lg shadow-sm bg-white sticky-top py-0">
                <a className="navbar-brand">
                    <img src={Logo} className={location!==-1?'d-none':'d-block'}/>
                    <div className={location!==-1?'d-flex':'d-none'} onClick={()=>this.chageView(-1)}>
                        <a className='mr-2'>&#8249;</a>
                        <span className='mr-2'>{asignature?asignature.abreviatura:''}</span>
                        {asignature?'G'+asignature.grupo.numero:''}
                    </div>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNavDropdown">
                    <ul className={`${location!==-1?'d-initial':'d-none'}`+' navbar-nav'}>
                        <li className={`${location===0?'active':''}`+" nav-item mx-2 px-1 pt-4 position-relative"}>
                            <span className="nav-link" onClick={()=>this.chageView(0)}>Asignaturas </span>
                        </li>
                        <li className={`${location===1?'active':''}`+" nav-item mx-2 px-1 pt-4 position-relative"}>
                            <span className="nav-link" onClick={()=>this.chageView(1)}>Estudiante</span>
                        </li>
                    </ul>
                </div>
                <span>Juan Vicente Pradilla Cerón</span>
            </nav>
        );
    }
    chageView=(view)=>{
        console.log(view)
        switch(view){
            case 0: 
                this.props.history.push(ROUTES.HOME+ROUTES.MODULES);
            break;
            case 1: 
                this.props.history.push(ROUTES.HOME+ROUTES.STUDENTS);
            break;
            default:
                this.props.history.push(ROUTES.HOME);

        }
    }
}
export default withRouter(Banner);