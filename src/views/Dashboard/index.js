import React, {Component} from 'react'
import HexItem from '../../components/HexItem'
import Services from '../../services';


class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            modules:[]
        }
    }
    render(){
        const modules = this.state.modules;
        console.log(modules)
        return(
            <div className="p-5 m-auto col">
                <HexItem
                    title="Asignatura"
                    desc1="Ingeniería Multimedia" 
                    desc2="20/20 estudiantes" 
                    hexDesc={"G"+1}
                    />
                <div className="row mt-4 align-items-start">   
                    <div className="col-3 mr-3 shadow-sm bg-white">
                        <h1 className="p-5">Modulos</h1>
                        <ul>
                            {modules?modules.map(module=>{
                                return (
                                    <li>{module.nombre}</li>
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
                                            <label className="ml-auto">Nota(prom): 4.2</label>
                                            <a href='#'>ver notas</a>
                                            <div className="hexagon"></div>
                                        </div>
                                        <div className="py-2 px-4">
                                            <div>
                                                <h6>Descripción</h6>
                                                <p>{actividad.descripcion}</p>
                                            </div>
                                            <div>
                                                {actividad.contenidos?actividad.contenidos.map(contenido=>{
                                                    return(
                                                        <div className="text-danger">{contenido.peticion.tipoContenido}</div>
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