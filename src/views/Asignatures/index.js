import React,{Component} from 'react'
import Services from '../../services';
import * as ROUTES from '../../constants/routes'

import './Asignatures.css'

import HexItem from '../../components/HexItem'

class Cursos extends Component{
    constructor(props){
        super(props);
        this.state={
            cursos:[]
        }
    }
    render(){
        const cursos = this.state.cursos;
        return(
            <div className="p-5 m-auto hexagon-container">
                {cursos?cursos.map(curso=>{
                    return(
                        curso.grupos.map(group=>{
                        return(
                            <HexItem
                             key={curso.id+''+group.numero}
                             title={curso.nombre} 
                             desc1="Ingeniería Multimedia" 
                             desc2="20/20 estudiantes" 
                             hexDesc={"G"+group.numero}
                             onClick={this.navigateToModule.bind(this ,curso.id, group.id)}/>
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