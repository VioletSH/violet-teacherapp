import React,{Component} from 'react'

import Modal from '../../../../components/Modal'
import DefultUser from '../../../../assets/img/default-user.png'
/**
 * @author Erik Loaiza & Marco Roldan
 * Component used to render Notas, based on component/Modal
 * @param actividad: the selected activity (Object)
 * @param nombre: the name of the activity
 * @param notas: an array of notas(Object) described by {estudiante:string , nota:float}
 */
class ModalNotas extends Component{
    constructor(props){
        super(props)
        this.state={
            openCountModal:0
        }
    }
    render(){
        const actividad = this.props.actividad;
        const nombre = actividad?actividad.nombre:'';
        const notas = actividad?actividad.notas:[];
        return(
            <Modal title={'Notas Actividad: '.concat(nombre)} openCount={this.state.openCountModal}>
                <div>
                    {notas.length>0?
                        notas.map(nota=>{
                            var dateFinished = new Date(nota.fechaEntrega)
                            var dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                        return(
                            <div className="shadow-sm py-2 px-4 d-flex flex-row align-items-center justify-content-between flex-grow-1">
                                <div className='row col'>
                                    <img src={DefultUser} alt='Imágen Estudiante'/>
                                    <div className='col'>
                                        <h6 className="m-0">{nota.estudiante}</h6>
                                        <span>Culminado: {dateFinished.toLocaleDateString("es-ES", dateFormatOptions)}</span>
                                    </div>
                                </div>
                                <span className="mr-5">Nota: {nota.nota}</span>
                            </div>
                        )
                    }):
                            <div>
                                Ningún estudiante ha terminado la actividad
                            </div>
                    }
                </div>
            </Modal>
        )
    }
    /** handles the logic to open the modal, see component/Modal for details */
    componentWillReceiveProps(props){
        if(props.openCount!==this.props.openCount){
            this.setState({
                openCountModal:this.state.openCountModal+1  
            })
        }
    }
    /**Use to handle binding of the inputs */
    componentDidMount(){
        this.setState({
            moduleTitle:this.props.moduleTitle,
            moduleDesc:this.props.moduleDesc
        })
    }
}
export default ModalNotas