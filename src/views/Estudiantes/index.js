import React,{Component} from 'react'
import DefultUser from '../../assets/img/default-user.png'

import './Estudiantes.css'
/**
 * @author Erik Loaiza & Marco Roldan
 * Component View used to render every Grupo/Curso students
 * @param estudiantes: array of estudiantes (Objects) by the selected Curso/Grupo on its parent
 */
class Estudiantes extends Component{
    render(){
        const estudiantes = this.props.grupo?this.props.grupo.estudiantes:'';
        return(
            <div className="p-5 mx-5 col">
                {estudiantes?estudiantes.map(estudiante=>{
                    return(
                    <div id={'StDv'+estudiante.id}className="shadow-sm bg-white my-1 d-flex flex-column student position-relative" onClick={this.toggleElement.bind(this,'StDv'+estudiante.id)}>
                        <div className="shadow-sm py-2 px-4 d-flex flex-row align-items-center justify-content-between flex-grow-1">
                            <div className='row col-4'>
                                <img src={DefultUser} alt='Imágen Estudiante'/>
                                <div className='col'>
                                    <h6 className="m-0">{estudiante.nombre}</h6>
                                </div>
                            </div>
                            <div className="col-6 row justify-contet-center align-items-center">
                                Progress:
                                <div className="progress col p-0 ml-2 position-relative shadow-sm">
                                    <div className="progress-bar" role="progressbar" style={{width: estudiante.progreso+'%',backgroundColor:'var(--color-ppal)'}} aria-valuenow={estudiante.progreso} aria-valuemin="0" aria-valuemax="100"></div>
                                    <span className="position-absolute">{estudiante.progreso}%</span>
                                </div>
                            </div>
                            <span className="mr-5">Nota: {estudiante.notaProm}</span>
                            <a href={"mailto:"+estudiante.correoElectronico} className='icon-mail'></a>
                        </div>
                        <div className="details px-5 py-3 row justify-content-between">
                            {estudiante.notas.map(module=>{
                                return(
                                    <div className='col-5 my-4'>
                                        <h5>{module.modulo}</h5>
                                        {module.notas.map(act=>{
                                            return(
                                                <div className="d-flex justify-content-between">
                                                    <span>{act.actividad}:</span>
                                                    <b>{act.nota.toFixed(1)}</b>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    )
                }):''}
            </div>
        )
    }
    /**Reusable function used to switch styles to elements
     * class active is defined by every element and affects its apperance, 
     * expected to works as switch that hides and shows info
     * @param id: the id of the HTML Element
     */
    toggleElement=(id)=>{
        var el = document.getElementById(id)
        if(el.classList.contains('active')){
            el.classList.remove('active')
        }
        else{
            el.classList.add('active')
        }
    }
}
export default Estudiantes