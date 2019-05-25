import React, {Component} from 'react'
import HexItem from '../../components/HexItem'
import Services from '../../services';

import {resourceIcon} from '../../constants/icons'

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
        const asignature = this.props.asignature;
        const modules = asignature.modulos;
        return(
            <div className="p-5 mx-5 col">
                <FloatingButton
                    actions={[{
                        action:this.addModule,
                        icon:'AM'
                        },
                        {
                        action:this.addActivity,
                        icon:'AA'
                        },
                        {
                        action:this.addContent,
                        icon:'AC'
                        },
                    ]}
                />


                <ModalModule openCount={this.state.openModalM}/>
                <ModalActivity openCount={this.state.openModalA}/>
                <ModalContent openCount={this.state.openModalC}/>

                <HexItem
                    title="Asignatura"
                    desc1="Ingeniería Multimedia" 
                    desc2="20 estudiantes" 
                    hexDesc={"G"+1}
                    />
                <div className=" row mt-4 align-items-start">   
                    <div className=" side-menu col-3 mr-4 shadow-sm bg-white p-0 sticky-top">
                        <h1 className="p-4 text-center">Modulos</h1>
                        <ul className=" p-0 m-0">
                            {modules?modules.map((module,i)=>{
                                return (
                                    <li key={'MdLi'+module.id} id={'MdLi'+module.id} 
                                        className={"d-flex justify-content-between align-items-center py-2 px-4 position-relative border-bottom ".concat(i==0?'active':'')} 
                                        onClick={this.navigateModules.bind(this,module.id)}
                                        >
                                        {module.nombre}
                                        <div className="hexagon hex-regular ml-auto  position-relative d-flex align-items-center justify-content-center" 
                                            style={{'--hexHeigh':'3em'}}
                                        >
                                            40%
                                        </div>
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
                                        <span className="align-self-end mr-4">20/20 Estudiantes terminaron</span>
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
                                            <label className="ml-auto mb-0 mr-4">Nota(prom): 4.2</label>
                                            <a href='#'>ver notas</a>
                                            <div className="hexagon hex-regular mx-5 d-flex align-items-center justify-content-center" style={{'--hexBackground': 'var(--color-ppal)','--hexHeigh':'3em', 'color':'white'}}>
                                                40%
                                            </div>
                                        </div>
                                        <div className="py-2 px-4 details">
                                            <div>
                                                <h6>Descripción</h6>
                                                <p>{actividad.descripcion}</p>
                                            </div>
                                            <div className="dflex my-4">
                                                {actividad.contenidos?actividad.contenidos.map(contenido=>{
                                                    var mimeType = contenido.peticion.tipoContenido
                                                    return(
                                                        <div key={contenido.id} className="hexagon hex-regular mx-5 d-flex align-items-center justify-content-center" style={{'--hexBackground': 'var(--color-ppal)','--hexHeigh':'3em', 'color':'white'}}>
                                                            {resourceIcon[mimeType]}
                                                        </div>
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
        menu.getElementsByClassName('active')[0].classList.remove('active')
        menuItem.classList.add('active')

        var moduleSection = document.getElementById('MdDv'+id);
        moduleSection.scrollIntoView({ 
            behavior: "smooth", 
            block: "center"
         })
    }
    addModule=()=>{
        this.setState({
            openModalM:this.state.openModalM+1
        });
    }
    addActivity=()=>{
        this.setState({
            openModalA:this.state.openModalA+1
        });
    } 
    addContent=()=>{
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
            <Modal title='Crear Módulo' openCount={this.state.openCountModal}>
                <form className="d-flex flex-column">
                    <label>
                        Título del módulo
                        <input type="text" className="w-100" value={moduleTitle} placeholder='Digite el título del módulo' onChange={(e)=>this.setState({moduleTitle:e.target.value})}/>
                    </label>
                    <label>
                        Descripción
                        <textarea className="w-100" rows='6' value={moduleDesc} placeholder='Digite la descripción del módulo'onChange={(e)=>this.setState({moduleDesc:e.target.value})}/>
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

            openCountModal:0
        }
    }
    render(){
        const moduleTitle = this.state.moduleTitle;
        const moduleDesc = this.state.moduleDesc;
        return(
            <Modal title='Crear Actividad' openCount={this.state.openCountModal}>
                <form className="d-flex flex-column">
                    <h1>On Development Activity! Come later :3</h1>
                </form>
            </Modal>
        )
    }
    componentWillReceiveProps(props){
        if(this.props.moduleTitle!=props.moduleTitle|this.props.moduleDesc!=props.moduleDesc){
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
        const moduleTitle = this.state.moduleTitle;
        const moduleDesc = this.state.moduleDesc;
        return(
            <Modal title='Crear Contenido' openCount={this.state.openCountModal}>
                <form className="d-flex flex-column">
                    <h1>On Development Content! Come later :3</h1>
                </form>
            </Modal>
        )
    }
    componentWillReceiveProps(props){
        if(this.props.moduleTitle!=props.moduleTitle|this.props.moduleDesc!=props.moduleDesc){
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