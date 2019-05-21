import React,{Component} from 'react'
import DefultUser from '../../assets/default-user.png'

import './Students.css'

class Students extends Component{
    constructor(props){
        super(props);
        this.state={
            students:[
                //115, 121
                {
                    id:1,
                    nombre:'Juani Alimaña',
                    correoElectronico:'correo@ejemplo.com',
                    progress:20
                },
                {
                    id:2,
                    nombre:'Elver Gotas',
                    correoElectronico:'mail@example.com',
                    progress:10
                },
                {
                    id:3,
                    nombre:'Susan',
                    correoElectronico:'correito@ejemplito.com',
                    progress:80
                },
            ]
        }
    }
    render(){
        const students = this.state.students;
        return(
            <div className="p-5 mx-5 col">
                {students.map(student=>{
                    return(
                    <div id={'StDv'+student.id}className="shadow-sm bg-white my-1 d-flex flex-column student" onClick={this.toggleElement.bind(this,'StDv'+student.id)}>
                        <div className="shadow-sm py-2 px-4 d-flex flex-row align-items-center justify-content-between flex-grow-1">
                            <div className='row'>
                                <img src={DefultUser}/>
                                <div className='col'>
                                    <h6 className="m-0">{student.nombre}</h6>
                                    <span>Fecha Entrega</span>
                                </div>
                            </div>
                            <div className="col-6 row justify-contet-center align-items-center">
                                Progress:
                                <div className="progress col p-0 ml-2 position-relative shadow-sm">
                                    <div className="progress-bar" role="progressbar" style={{width: student.progress+'%',backgroundColor:'var(--color-ppal)'}} aria-valuenow={student.progress} aria-valuemin="0" aria-valuemax="100"></div>
                                    <span className="position-absolute">{student.progress}%</span>
                                </div>
                            </div>
                            <span className="mr-5">Nota: 4.2</span>
                            <a href={"mailto:"+student.correoElectronico}>mail</a>
                        </div>
                        <div className="details px-2">
                            <h1>On Development :3</h1>
                        </div>
                    </div>
                    )
                })}
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