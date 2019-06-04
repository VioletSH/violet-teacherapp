import React,{Component} from 'react'
import Services from '../../services';
import * as ROUTES from '../../constants/routes'

import './Cursos.css'

import Hex from '../../components/Hexagon'

/**
 * @author Erik Loaiza & Marco Roldan
 * Component View used to render every Grupo/Curso associated with the Teacher that is loged in
 * After selection, the view Dashboard will display detailed information
 * 
 * @param grupos: every Grupo/Curso associated with the teacher
 */
class Cursos extends Component{
    constructor(props){
        super(props);
        this.state={
            grupos:[]
        }
    }
    render(){
        const grupos = this.state.grupos;
        const hexColor = 'var(--bg-darker)'

        return(
            <div className="p-5 m-auto hexagon-container">
                {grupos?grupos.map(grupo=>{
                    return(
                             <div key={'CGDv'+grupo.curso.id+''+grupo.id} className='hex-item hoverable d-flex position-relative' onClick={this.navigateToModule.bind(this ,grupo.curso.id, grupo.id)}>
                                <div className="hex-item-content d-flex flex-column justify-content-center">
                                    <h3 className="mt-3 mb-0">{grupo.curso.nombre.substring(0,24)+"..."}</h3>
                                    <label className="mb-4">{'Ingeniería Multimedia'}</label>
                                </div>
                                <div className="shape left h-100 w-100 position-absolute">
                                    <Hex color={'#fff'}></Hex>
                                </div>
                                <div className="shape right h-100 w-100 position-absolute">
                                    <Hex color={'#fff'}></Hex>
                                </div>
                                <div className='right w-100 h-100 position-absolute'>
                                    <Hex color={hexColor}>
                                        <h1>G{grupo.numero}</h1>
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
                }):''}
            </div>
        );
    }
    /**Reads local storage to get the information relative to user(teacher) id that is loged in*/
    componentDidMount(){
        if(localStorage.user){
            var user = JSON.parse(localStorage.user)

            var idDocente = user.id
            Services.getGrupos(idDocente)  
            .then(response=>{
            return response.json();
            })
            .then((grupos)=>{
                console.log(grupos)
                this.setState({
                    grupos:grupos
                })
            });
        }
    }
    /**used to navigate to 'Dashboard' view and set the selected Grupo/Curso in 'Home' component view
     * @param idCurso: id of the curso in backend
     * @param idGrupo: id of the Grupo in backend
     */
    navigateToModule=(idCurso,idGrupo)=>{
        this.props.setCurso(idCurso,idGrupo);
        this.props.history.push(ROUTES.HOME+ROUTES.MODULES)
    }
}
export default Cursos