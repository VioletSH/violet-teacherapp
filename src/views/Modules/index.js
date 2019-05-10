import React, {Component} from 'react'
import HexItem from '../../components/HexItem'
import Services from '../../services';


class Modules extends Component{
    constructor(props){
        super(props)
        this.state={
            modules:[]
        }
    }
    render(){
        const modules = this.state.modules;
        return(
            <div className="p-5 m-auto hexagon-container">
            {modules?modules.map(module=>{
                return( 
                    <HexItem title={module.nombre} desc1="Ingeniería Multimedia" desc2="20/20 estudiantes" val='80' onClick={this.editModule}/>
                )
                }):''}
            </div>
        );
    }
    componentDidMount(){
        const { idCurso,idGrupo } = this.props.match.params
        Services.getCurso(idCurso)  
        .then(response=>{
         return response.json();
         })
         .then((myJson)=>{
             this.setState({
                 modules:myJson.modulos
             })
         });
    }
    editModule=()=>{
        console.log("not implemented yet")
    }
}

export default Modules