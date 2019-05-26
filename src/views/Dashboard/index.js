import React, {Component} from 'react'

import {resourceIcon} from '../../constants/icons'

import Hex from '../../components/Hexagon'
import FloatingButton from '../../components/FloatingButton'
import Modal from '../../components/Modal'

import './Dashboard.css'

class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            //Used for open modals
            openModalM:0,
            openModalA:0,
            openModalC:0,
        }
    }
    render(){
        const asignature = Object.keys(this.props.asignature).length>0?this.props.asignature:null;
        const totalStudents = asignature?asignature.grupo.estudiantes.length:0
        const modules = asignature?asignature.modulos:'';
        const mainColor = getComputedStyle(document.body).getPropertyValue('--color-ppal')
        return(
            <div className="p-5 mx-5 col">
                <FloatingButton
                    actions={[{
                        action:this.openModalAddModule,
                        icon:'AM'
                        },
                        {
                        action:this.openModalAddActivity,
                        icon:'AA'
                        },
                        {
                        action:this.openModalAddContent,
                        icon:'AC'
                        },
                    ]}
                />


                <ModalModule openCount={this.state.openModalM} action={this.props.addModule}/>
                <ModalActivity openCount={this.state.openModalA} modules={modules} action={this.props.addActivity}/>
                <ModalContent openCount={this.state.openModalC}/>

                <div className='hex-item d-flex position-relative'>
                    <div className="hex-item-content d-flex flex-column">
                        <h3 className="mt-3 mb-0">{asignature?asignature.nombre+' - Grupo '+asignature.grupo.numero:''}</h3>
                        <label className="mb-2">{'Ingeniería Multimedia'}</label>
                        <span className="mt-auto mb-3">{'n estudiantes'}</span>
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
                </div>

                <div className=" row mt-4 align-items-start">   
                    <div className=" side-menu col-3 mr-4 shadow-sm bg-white p-0 sticky-top">
                        <h1 className="p-4 text-center">Modulos</h1>
                        <ul className=" p-0 m-0">
                            {modules?modules.map((module,i)=>{
                                return (
                                    <li key={'MdLi'+module.id} id={'MdLi'+module.id} 
                                        className={"d-flex justify-content-between align-items-center py-2 px-4 position-relative border-bottom ".concat(i===0?'active':'')} 
                                        onClick={this.navigateModules.bind(this,module.id)}
                                        >
                                        <span>{module.nombre}</span>
                                        <Hex size='3.5em' color={mainColor}>{module.progreso}%</Hex> 
                                    </li>
                                    )
                            }):''}
                        </ul>
                    </div>
                    <div className="col ml-2 p-0">
                        {modules?modules.map(module=>{
                            return (
                                <div key= {'MdDv'+module.id}    >
                                    <div id={'MdDv'+module.id} className="shadow-sm bg-white p-2 mb-2 d-flex flex-column">
                                        <h3>{module.nombre}</h3>
                                        <span className="align-self-end mr-4">{module.estudiantesTerminaron +'/' + totalStudents} Estudiantes terminaron</span>
                                    </div>
                                   {module.actividades.map(actividad=>{
                                    var dateCreation = new Date(actividad.createdAt)
                                    var dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                                    return(
                                    <div key={'AcDv'+actividad.id} id={'AcDv'+actividad.id} className="shadow-sm bg-white mx-4 mb-1 activity" onClick={this.toggleElement.bind(this,('AcDv'+actividad.id))}>
                                        <div className="shadow-sm bg-white p-2 d-flex flex-row align-items-center">
                                            <div className="d-flex flex-column">
                                                <b>{actividad.nombre}</b>
                                                <span>Publicado: {dateCreation.toLocaleDateString("es-ES", dateFormatOptions)}</span>
                                            </div>
                                            <label className="ml-auto mb-0 mr-4">Nota(prom): {actividad.notaProm?actividad.notaProm.toFixed(1):0.0}</label>
                                            <a href='#' className='mr-2'>ver notas</a>
                                            <Hex size='3.5em' color={mainColor}>{actividad.progreso}%</Hex> 
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
    toggleElement=(id)=>{
        var el = document.getElementById(id)
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
        else{
            el.classList.add('active')
        }
    }
    navigateModules(id){
        var menuItem = document.getElementById('MdLi'+id);
        var menu = menuItem.parentElement;
        var lastActiveItem = menu.getElementsByClassName('active')[0]
        lastActiveItem.classList.remove('active')
        menuItem.classList.add('active')

        //Needed to handle svg
        menuItem.getElementsByTagName('path')[0].setAttribute('fill','#FFF');
        lastActiveItem.getElementsByTagName('path')[0].setAttribute('fill',getComputedStyle(document.body).getPropertyValue('--color-ppal'));          
          
        var moduleSection = document.getElementById('MdDv'+id);
        moduleSection.scrollIntoView({ 
            behavior: "smooth", 
            block: "center"
         })
    }
    openModalAddModule=()=>{
        this.setState({
            openModalM:this.state.openModalM+1
        });
    }
    openModalAddActivity=()=>{
        this.setState({
            openModalA:this.state.openModalA+1
        });
    } 
    openModalAddContent=()=>{
        this.setState({
            openModalC:this.state.openModalC+1
        });
    }

    editModule=()=>{
        console.log("not implemented yet")
    }
}

export default Dashboard


class ModalModule extends Component{
    constructor(props){
        super(props)
        this.state={
            moduleTitle:'',
            moduleDesc:'',

            openCountModal:0
        }
    }
    render(){
        const moduleTitle = this.state.moduleTitle?this.state.moduleTitle:'';
        const moduleDesc = this.state.moduleDesc?this.state.moduleDesc:'';
        return(
            <Modal title='Crear Módulo' openCount={this.state.openCountModal} onAccept={this.props.action.bind(this,moduleTitle)}>
                <form className="d-flex flex-column">
                    <label>
                        Título del módulo
                        <input type="text" className="w-100" value={moduleTitle} placeholder='Digite el título del módulo' onChange={(e)=>this.setState({moduleTitle:e.target.value})}/>
                    </label>
                    <label>
                        Descripción
                        <textarea className="w-100" rows='4' value={moduleDesc} placeholder='Digite la descripción del módulo'onChange={(e)=>this.setState({moduleDesc:e.target.value})}/>
                    </label>
                </form>
            </Modal>
        )
    }
    componentWillReceiveProps(props){
        if(this.props.moduleTitle!==props.moduleTitle|this.props.moduleDesc!==props.moduleDesc){
            console.log('yai c:')
        }
        if(props.openCount!==this.props.openCount){
            this.setState({
                openCountModal:this.state.openCountModal+1  
            })
        }
    }
    componentDidMount(){
        this.setState({
            moduleTitle:this.props.moduleTitle,
            moduleDesc:this.props.moduleDesc,
        })
    }
}

class ModalActivity extends Component{
    constructor(props){
        super(props)
        this.state={
            moduleTitle:'',
            moduleDesc:'',
            moduleSelection:'',

            openCountModal:0

        }
    }
    render(){
        const activityTitle = this.state.activityTitle;
        const activityDesc = this.state.activityDesc;
        const modules = this.props.modules;

        const moduleSelection = this.state.moduleSelection;

        return(
            <Modal title='Crear Actividad' openCount={this.state.openCountModal} onAccept={this.props.action.bind(this,moduleSelection,activityTitle,activityDesc)}>
                <form className="d-flex flex-column">
                    <label for="exampleFormControlSelect1">Modulo</label>
                    <select className="form-control mb-2" id="exampleFormControlSelect1" onChange={(e)=>this.setState({moduleSelection:e.target.value})}>
                        {modules?modules.map(module=>{
                            return(<option value={module.id}>{module.nombre}</option>)
                        }):''}
                    </select>
                    <label>
                        Título de la actividad
                        <input type="text" className="w-100" value={activityTitle} placeholder='Digite el título de la actividad' onChange={(e)=>this.setState({activityTitle:e.target.value})}/>
                    </label>
                    <label>
                        Descripción
                        <textarea className="w-100" rows='4' value={activityDesc} placeholder='Digite la descripción de la actividad'onChange={(e)=>this.setState({activityDesc:e.target.value})}/>
                    </label>
                    <div className='row'>
                        <label className='col-4'>
                            Duración estimada
                            <input type="text" className="w-100" placeholder='00:00:00'/>
                        </label>
                        <label className='col-4'>
                            Nota máxima
                            <input type="text" className="w-100" placeholder='0.0' />
                        </label>
                    </div>
                </form>
            </Modal>
        )
    }
    componentWillReceiveProps(props){
        if(this.props.moduleTitle!==props.moduleTitle|this.props.moduleDesc!==props.moduleDesc){
            console.log('yai c:')
        }
        if(props.openCount!==this.props.openCount){
            this.setState({
                openCountModal:this.state.openCountModal+1  
            })
        }
    }
    componentDidMount(){
        this.setState({
            moduleTitle:this.props.moduleTitle,
            moduleDesc:this.props.moduleDesc
        })
    }
}

class ModalContent extends Component{
    constructor(props){
        super(props)
        this.state={
            moduleTitle:'',
            moduleDesc:'',

            openCountModal:0
        }
    }
    render(){
        //const moduleTitle = this.state.moduleTitle;
        //const moduleDesc = this.state.moduleDesc;
        return(
            <Modal title='Crear Contenido' openCount={this.state.openCountModal}>
                <form className="d-flex flex-column">
                    <h1>On Development Content! Come later :3</h1>
                </form>
            </Modal>
        )
    }
    componentWillReceiveProps(props){
        if(this.props.moduleTitle!==props.moduleTitle|this.props.moduleDesc!==props.moduleDesc){
            console.log('yai c:')
        }
        if(props.openCount!==this.props.openCount){
            this.setState({
                openCountModal:this.state.openCountModal+1  
            })
        }
    }
    componentDidMount(){
        this.setState({
            moduleTitle:this.props.moduleTitle,
            moduleDesc:this.props.moduleDesc
        })
    }
}