import React,{Component} from 'react'

import Logo from '../../assets/img/logo.png'
import './Banner.css'

import * as ROUTES from '../../constants/routes'
import {withRouter} from 'react-router-dom' //Needed to know the first route;

/**
 * @author Erik Loaiza & Marco Roldan
 * Component used to handled every fixed top information, when is rendering *cursos* component
 * it only show the brand logo "Violet" and the user that's loged in. in other ase, after picked a Curso/Grupo
 * it replace logo by Curso abreviation and display a menú with 2 items, one goes to "Dashboard" and the other to "Estudiantes"
 * This component is rendered everytime except for the login view 
 */
class Banner extends Component{
    constructor(props){
        super(props)
        this.state={
            /** Used to handle navigation changes and setup the render elements i.e: logo*/
            routeArray:[]
        }
    }
    render(){
        /** Most commond variables to use in most of the component are listen uppon html elements t
         *  The structure const name = name?name:'' handles validations or asignations depending or cases
        */
        const curso = Object.entries(this.props.curso).length!==0?this.props.curso:null;
        /** Routearray handles the route as an array and location enables to identify numerically the 
         *  current location, in order to validate the elements to render
         */
        const routeArray=this.props.location.pathname.split('/')
        const location =routeArray.includes(ROUTES.MODULES.substring(1,ROUTES.MODULES.length))?
                        0:
                            routeArray.includes(ROUTES.STUDENTS.substring(1,ROUTES.STUDENTS.length))?
                        1:-1;
        return(
            <nav className="navbar navbar-expand-lg shadow-sm bg-white sticky-top py-0">
                <div className="navbar-brand">
                    <img src={Logo} className={location!==-1?'d-none':'d-block'} alt='Logo'/>
                    <div className={location!==-1?'d-flex':'d-none'} onClick={()=>this.chageView(-1)}>
                        <i className='icon-back mr-2'></i>
                        <span className='mr-2'>{curso?curso.abreviatura:''}</span>
                        {curso?'G'+curso.grupo.numero:''}
                    </div>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNavDropdown">
                    <ul className={`${location!==-1?'d-initial':'d-none'}`.concat(' navbar-nav')}>
                        <li className={`${location===0?'active':''}`.concat(" nav-item mx-2 px-1 pt-4 position-relative")}>
                            <span className="nav-link" onClick={()=>this.chageView(0)}>Asignaturas </span>
                        </li>
                        <li className={`${location===1?'active':''}`.concat(" nav-item mx-2 px-1 pt-4 position-relative")}>
                            <span className="nav-link" onClick={()=>this.chageView(1)}>Estudiante</span>
                        </li>
                    </ul>
                </div>
                <span>{this.state.nombre}</span>
                <i className='icon-logout ml-4' onClick={this.logout}></i>
            </nav>
        );
    }
    /**Initial logics after componend is mounted, we read for the user loged in localstorge if exist */
    componentDidMount(){
        if(localStorage.user){
            var user = JSON.parse(localStorage.user)
            this.setState({nombre:user.nombre})
        }
    }
    /** @param view indicates the navigations that will be performed in every link*/
    chageView=(view)=>{
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
    /**Deletes the user from local storage and redirects to Login view */
    logout=()=>{
        localStorage.clear()
        this.props.history.push(ROUTES.LOGIN);
    }
}
export default withRouter(Banner);