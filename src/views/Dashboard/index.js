import React, {Component} from 'react'

import {resourceIcon} from '../../constants/icons'

import Hex from '../../components/Hexagon'
import FloatingButton from '../../components/FloatingButton'

import ModalModule from './Modals/ModalModule'
import ModalActivity from './Modals/ModalActivity'
import ModalContent from './Modals/ModalContent'
import ModalNotas from './Modals/ModalNotas'

import './Dashboard.css'

/**
 * @author Erik Loaiza & Marco Roldan
 * Main view, used to show detailed info of selected Grupo/Curso
 * @param curso: the selected Grupo/Curso object contains: nested info
 * @param totalEstudiantes: number of students of the selected Grupo/Curso
 * @param modulos: an array of objects describong each module, contains also 
 * activities(objects) array in each one
 * @param mainColor: the main color of the app defined on index.css
 * @param actividadSeleccionada: used to view detailed information on modal Notas about 
 * the selected activity (sets by clicking in "ver notas")
 */
class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            //counters used for open modals: read components/Modal documentation for details
            openModalM:0,
            openModalA:0,
            openModalC:0,
            openModalN:0,
        }
    }
    render(){
        const curso = Object.keys(this.props.curso).length>0?this.props.curso:null;
        const totalEstudiantes = curso?curso.grupo.estudiantes.length:0
        const modulos = curso?curso.modulos:'';
        const mainColor = getComputedStyle(document.body).getPropertyValue('--color-ppal')

        const actividadSeleccionada = this.state.actividadSeleccionada;
        return(
            <div className="p-5 mx-5 col">
                {/*Renders a floating button that displays 3 childs with an add action each one
                    read FloatingButton documentation for details.*/}
                <FloatingButton
                    actions={[{
                        action:this.openModalAddModule,
                        icon:'icon-module',
                        tooltip:'Agregar Modulo'
                        },
                        {
                        action:this.openModalAddActivity,
                        icon:'icon-activity',
                        tooltip:'Agregar Actividad'

                        },
                        {
                        action:this.openModalAddContent,
                        icon:'icon-content',
                        tooltip:'Agregar Contenido'
                        },
                    ]}
                />
                {/*Every  modal used to define add forms and activity calification details.
                    read documentation for details inside ./Modals for each modal. 
                    Every Modal uses base component Modal defined in components/Modal 
                    read its documentation for details
                */}
                <ModalModule openCount={this.state.openModalM} action={this.props.agregarModulo}/>
                <ModalActivity openCount={this.state.openModalA} modules={modulos} action={this.props.agregarActividad}/>
                <ModalContent openCount={this.state.openModalC} modules={modulos} action={this.props.agregarContenido}/>
                
                <ModalNotas openCount={this.state.openModalN} actividad={actividadSeleccionada}/>

                <div className='hex-item d-flex position-relative'>
                    <div className="hex-item-content d-flex flex-column">
                        <h3 className="mt-3 mb-0">{curso?curso.nombre+' - Grupo '+curso.grupo.numero:''}</h3>
                        <label className="mb-2">{'Ingeniería Multimedia'}</label>
                        <span className="mt-auto mb-3">{totalEstudiantes+' estudiantes'}</span>
                    </div>
                    <div className="shape left h-100 w-100 position-absolute">
                        <Hex color={'#fff'}></Hex>
                    </div>
                    <div className="shape right h-100 w-100 position-absolute">
                        <Hex color={'#fff'}></Hex>
                    </div>

                    <div className="shadow w-100 h-100 position-absolute">
                        <div className="w-100 h-100 position-relative">
                            <div className="shape left h-100 w-100 position-absolute">
                                <Hex color={'#000'}></Hex>
                            </div>
                            <div className="shape right h-100 w-100 position-absolute">
                                <Hex color={'#000'}></Hex>
                            </div>
                        </div>
                    </div>
                    <div className='options position-absolute mr-2' >
                        <div class="dropdown-menu">
                            <button class="dropdown-item" href="#">Editar</button>
                            <div role="separator" class="dropdown-divider"></div>
                            <button class="dropdown-item" href="#">Eliminar</button>
                        </div>
                    </div> 
                </div>

                <div className=" row mt-4 align-items-start">   
                    <div className=" side-menu col-3 mr-4 shadow-sm bg-white p-0 sticky-top">
                        <h1 className="p-4 text-center">Modulos</h1>
                        <ul className=" p-0 m-0">
                            {modulos?modulos.map((modulo,i)=>{
                                return (
                                    <li key={'MdLi'+modulo.id} id={'MdLi'+modulo.id} 
                                        className={"d-flex justify-content-between align-items-center py-2 px-4 position-relative border-bottom ".concat(i===0?'active':'')} 
                                        onClick={this.navigateModules.bind(this,modulo.id)}
                                        >
                                        <span>{modulo.nombre}</span>
                                        <Hex size='3.5em' color={mainColor} tooltip='Estudiantes que completaron el modulo'>{modulo.progreso}%</Hex> 
                                    </li>
                                    )
                            }):''}
                        </ul>
                    </div>
                    <div className="col ml-2 p-0">
                        {modulos?modulos.map(modulo=>{
                            return (
                                <div key= {'MdDv'+modulo.id}    >
                                    <div id={'MdDv'+modulo.id} className="shadow-sm bg-white p-2 mb-2 d-flex flex-column position-relative">
                                        <h3>{modulo.nombre}</h3>
                                        <div id={'MdOpt'+modulo.id} className='options position-absolute mr-2' onClick={this.toggleElement('MdOpt'+modulo.id)}>
                                            <div class="dropdown-menu">
                                                <button class="dropdown-item" href="#">Editar</button>
                                                <div role="separator" class="dropdown-divider"></div>
                                                <button class="dropdown-item" href="#" onClick={this.props.eliminarModulo.bind(this,modulo.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                        <span className="align-self-end mr-4">{modulo.estudiantesTerminaron +'/' + totalEstudiantes} Estudiantes terminaron</span>
                                    </div>
                                   {modulo.actividades.map(actividad=>{
                                    var dateCreation = new Date(actividad.createdAt)
                                    var dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                                    return(
                                    <div key={'AcDv'+actividad.id} id={'AcDv'+actividad.id} className="shadow-sm bg-white mx-4 mb-2 activity position-relative" onClick={this.toggleElement('AcDv'+actividad.id)}>
                                        <div className="shadow-sm bg-white p-2 pr-5 d-flex flex-row align-items-center">
                                            <div className="d-flex flex-column col">
                                                <b>{actividad.nombre.substring(0,50)}...</b>
                                                <span>Publicado: {dateCreation.toLocaleDateString("es-ES", dateFormatOptions)}</span>
                                            </div>
                                            <label className="ml-auto mb-0 mr-4">Nota(prom): {actividad.notaProm?actividad.notaProm.toFixed(1):0.0}</label>
                                            <button href='#' className='mr-2 btn btn-violet-secondary'onClick={this.openModalVerNotas(actividad)}>ver notas</button>
                                            <Hex size='3.5em' color={mainColor} tooltip='Estudiantes que completaron la actividad'>{actividad.progreso}%</Hex>
                                            <div id={'AcOpt'+actividad.id} className='options position-absolute mr-2' onClick={this.toggleElement('AcOpt'+actividad.id)}>
                                                <div class="dropdown-menu">
                                                    <button class="dropdown-item" href="#">Editar</button>
                                                    <div role="separator" class="dropdown-divider"></div>
                                                    <button class="dropdown-item" href="#" onClick={this.props.eliminarActividad.bind(this,modulo.id,actividad.id)}>Eliminar</button>
                                                </div>
                                            </div> 
                                        </div>
                                        <div className="py-2 px-4 details">
                                            <div>
                                                <h6>Descripción</h6>
                                                <p>{actividad.descripcion}</p>
                                            </div>
                                            <div className="row m-4">
                                                {actividad.contenidos?actividad.contenidos.map(contenido=>{
                                                    var mimeType = contenido.peticion.tipoContenido
                                                    return(
                                                        <Hex key={contenido.id} size='3.5em' color={mainColor}>{resourceIcon[mimeType]}</Hex> 
                                                    );
                                                }):''}
                                            </div>
                                        </div>
                                    </div>
                                    );
                                   })}
                                </div>
                                )
                        }):''}
                    </div>
                </div>
            </div>
        );
    }
    /**we set the styles to the first menu item on navigation menu*/
    componentDidUpdate(){
        var menu = document.getElementsByClassName('side-menu')[0];
        if(menu){
            var firstItem = menu.getElementsByTagName('UL')[0].firstElementChild;
            if(firstItem.classList.contains('active'))
            //Needed to handle svg
            firstItem.getElementsByTagName('path')[0].setAttribute('fill','#FFF');
        }
    }
    /**Reusable function used to switch styles to elements
     * class active is defined by every element and affects its apperance, 
     * expected to works as switch that hides and shows info
     * @param id: the id of the HTML Element
     * @param event: the generated event after clicked the elements that invokes this method
     */
    toggleElement=id=>event=>{
        event.preventDefault()
        event.stopPropagation()
        
        var el = document.getElementById(id)
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
        else{
            el.classList.add('active')
        }
    }
    /**Method used to navigate by scroll into the view, works
     * by cliking left side menu
     * also changes the menu selection and its styles
     * @param id the id of the HTML element
     * */
    navigateModules(id){
        var menuItem = document.getElementById('MdLi'+id);
        var menu = menuItem.parentElement;
        var lastActiveItem = menu.getElementsByClassName('active')[0]
        if(!menuItem.classList.contains('active')){
            lastActiveItem.classList.remove('active')
            menuItem.classList.add('active')
    
            //Needed to handle svg
            menuItem.getElementsByTagName('path')[0].setAttribute('fill','#FFF');
            lastActiveItem.getElementsByTagName('path')[0].setAttribute('fill',getComputedStyle(document.body).getPropertyValue('--color-ppal'));          
              
        }

        var moduleSection = document.getElementById('MdDv'+id);
        moduleSection.scrollIntoView({ 
            behavior: "smooth", 
            block: "center"
         })
    }
    /**Used to open the modal based on incrementing its counter, see component/Modal documentation for details */
    openModalAddModule=()=>{
        this.setState({
            openModalM:this.state.openModalM+1
        });
    }
    /**Used to open the modal based on incrementing its counter, see component/Modal documentation for details */    
    openModalAddActivity=()=>{
        this.setState({
            openModalA:this.state.openModalA+1
        });
    } 
    /**Used to open the modal based on incrementing its counter, see component/Modal documentation for details */
    openModalAddContent=()=>{
        this.setState({
            openModalC:this.state.openModalC+1
        });
    }
    /**Used to open the modal based on incrementing its counter, see component/Modal documentation 
     * for details, needs to prevent the toggle function */    
    openModalVerNotas=(actividad)=>event=>{
        event.preventDefault()
        event.stopPropagation()

        this.setState({
            openModalN:this.state.openModalN+1,
            actividadSeleccionada:actividad
        });
    }

    /**FUTURE: add methods to edit the stored info by CRUD*/
    editModule=()=>{
        console.log("not implemented yet")
    }
}

export default Dashboard

