import React, {Component} from 'react'
import HexItem from '../../components/HexItem'
import Services from '../../services';

import {resourceIcon} from '../../constants/icons'

import FloatingButton from '../../components/FloatingButton'

import './Dashboard.css'

class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            modules:[]
        }
    }
    render(){
        const modules = this.state.modules;
        return(
            <div className="p-5 mx-5 col">
                <FloatingButton/>
                <HexItem
                    title="Asignatura"
                    desc1="Ingeniería Multimedia" 
                    desc2="20 estudiantes" 
                    hexDesc={"G"+1}
                    />
                <div className="row mt-4 align-items-start">   
                    <div className="col-3 mr-4 shadow-sm bg-white p-0">
                        <h1 className="p-4 text-center">Modulos</h1>
                        <ul className="side-menu p-0 m-0">
                            {modules?modules.map(module=>{
                                return (
                                    <li className="d-flex justify-content-between align-items-center py-2 px-4 position-relative border-bottom">
                                        {module.nombre}
                                        <div className="hexagon hex-regular ml-auto  position-relative d-flex align-items-center justify-content-center" style={{'--hexHeigh':'3em'}}>
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
                                <div>
                                    <div className="shadow-sm bg-white p-2 mb-2">
                                        <h3>{module.nombre}</h3>
                                    </div>
                                   {module.actividades.map(actividad=>{
                                    var dateCreation = new Date(actividad.createdAt)
                                    var dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

                                    return(
                                    <div className="shadow-sm bg-white mx-4 mb-1">
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
                                        <div className="py-2 px-4">
                                            <div>
                                                <h6>Descripción</h6>
                                                <p>{actividad.descripcion}</p>
                                            </div>
                                            <div className="dflex my-4">
                                                {actividad.contenidos?actividad.contenidos.map(contenido=>{
                                                    var mimeType = contenido.peticion.tipoContenido
                                                    return(
                                                        <div className="hexagon hex-regular mx-5 d-flex align-items-center justify-content-center" style={{'--hexBackground': 'var(--color-ppal)','--hexHeigh':'3em', 'color':'white'}}>
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
    componentDidMount(){
        const { idCurso,idGrupo } = this.props.match.params

        Services.getCurso(idCurso)  
        .then(response=>{
         return response.json();
         })
         .then((curso)=>{
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
                            this.setState({
                                modules:modulesWithNestedData
                            })
                        })
                    })
                })
             });
         })
    }
    editModule=()=>{
        console.log("not implemented yet")
    }
}

export default Dashboard