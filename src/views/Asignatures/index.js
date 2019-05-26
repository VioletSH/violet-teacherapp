import React,{Component} from 'react'
import Services from '../../services';
import * as ROUTES from '../../constants/routes'

import './Asignatures.css'

import Hex from '../../components/Hexagon'


class Cursos extends Component{
    constructor(props){
        super(props);
        this.state={
            cursos:[]
        }
    }
    render(){
        const cursos = this.state.cursos;
        const mainColor = getComputedStyle(document.body).getPropertyValue('--color-ppal')
        const hexColor = 'var(--bg-darker)'

        return(
            <div className="p-5 m-auto hexagon-container">
                {cursos?cursos.map(curso=>{
                    return(
                        curso.grupos.map(group=>{
                            console.log(group)
                        return(
                             <div className='hex-item hoverable d-flex position-relative' onClick={this.navigateToModule.bind(this ,curso.id, group.id)}>
                                <div className="hex-item-content d-flex flex-column">
                                    <h3 className="mt-3 mb-0">{curso.nombre.substring(0,24)+"..."}</h3>
                                    <label className="mb-2">{'Ingeniería Multimedia'}</label>
                                    <span className="mt-auto mb-3">{'n estudiantes'}</span>
                                </div>
                                <div className="shape left h-100 w-100 position-absolute">
                                    <Hex color={'#fff'}></Hex>
                                </div>
                                <div className="shape right h-100 w-100 position-absolute">
                                    <Hex color={'#fff'}></Hex>
                                </div>
                                <div className='right w-100 h-100 position-absolute'>
                                    <Hex color={hexColor}>
                                        <h1>G{group.numero}</h1>
                                    </Hex>
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
                            )
                        })
                    )
                }):''}
            </div>
        );
    }
    componentDidMount(){
        Services.getCursos()  
       .then(response=>{
        return response.json();
        })
        .then((myJson)=>{
            this.setState({
                cursos:myJson
            })
        });
    }
    navigateToModule=(idcurso,idGroup)=>{
        this.props.setAsignature(idcurso,idGroup);
        this.props.history.push(ROUTES.HOME+ROUTES.MODULES)
    }
}
export default Cursos