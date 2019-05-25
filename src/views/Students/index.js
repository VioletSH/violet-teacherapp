import React,{Component} from 'react'
import DefultUser from '../../assets/default-user.png'

import './Students.css'

class Students extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const students = this.props.group?this.props.group.estudiantes:'';
        console.log(this.props.group)
        return(
            <div className="p-5 mx-5 col">
                {students?students.map(student=>{
                    return(
                    <div id={'StDv'+student.id}className="shadow-sm bg-white my-1 d-flex flex-column student" onClick={this.toggleElement.bind(this,'StDv'+student.id)}>
                        <div className="shadow-sm py-2 px-4 d-flex flex-row align-items-center justify-content-between flex-grow-1">
                            <div className='row col-4'>
                                <img src={DefultUser}/>
                                <div className='col'>
                                    <h6 className="m-0">{student.nombre}</h6>
                                </div>
                            </div>
                            <div className="col-6 row justify-contet-center align-items-center">
                                Progress:
                                <div className="progress col p-0 ml-2 position-relative shadow-sm">
                                    <div className="progress-bar" role="progressbar" style={{width: student.progreso+'%',backgroundColor:'var(--color-ppal)'}} aria-valuenow={student.progreso} aria-valuemin="0" aria-valuemax="100"></div>
                                    <span className="position-absolute">{student.progreso}%</span>
                                </div>
                            </div>
                            <span className="mr-5">Nota: {student.notaProm}</span>
                            <a href={"mailto:"+student.correoElectronico}>mail</a>
                        </div>
                        <div className="details px-5 py-3 row justify-content-between">
                            {student.notas.map(module=>{
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
export default Students