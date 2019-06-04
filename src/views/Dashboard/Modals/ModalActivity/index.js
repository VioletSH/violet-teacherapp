import React,{Component} from 'react'

import Modal from '../../../../components/Modal'
/**
 * @author Erik Loaiza & Marco Roldan
 * Component used to render Activity Form with add function, based on component/Modal
 * @param activityTitle: name of the activity
 * @param activityDesc: description of the activity
 * @param modules: array of modules (Objects) to get the id in order to relate the activity to a module
 * and to get the names to render on select input
 * @param moduleSelection: the selected module id
 * 
 * @param action: the function defined by its parent to add the Activity 
 */
class ModalActivity extends Component{
    constructor(props){
        super(props)
        this.state={
            openCountModal:0
        }
    }
    render(){
        const activityTitle = this.state.activityTitle;
        const activityDesc = this.state.activityDesc;
        const modules = this.props.modules;

        const moduleSelection = this.state.moduleSelection;

        return(
            <Modal title='Crear Actividad' openCount={this.state.openCountModal} onAccept={this.props.action.bind(this,moduleSelection,activityTitle,activityDesc)}>
                <form className="d-flex flex-column">
                    <label htmlFor="exampleFormControlSelect1">Modulo</label>
                    <select className="mb-3" id="exampleFormControlSelect1" onChange={(e)=>this.setState({moduleSelection:e.target.value})}>
                        {modules?modules.map(module=>{
                            return(<option value={module.id}>{module.nombre}</option>)
                        }):''}
                    </select>
                    <label>
                        Título de la actividad
                        <input type="text" className="w-100" value={activityTitle} placeholder='Digite el título de la actividad' onChange={(e)=>this.setState({activityTitle:e.target.value})}/>
                    </label>
                    <label>
                        Descripción
                        <textarea className="w-100" rows='4' value={activityDesc} placeholder='Digite la descripción de la actividad'onChange={(e)=>this.setState({activityDesc:e.target.value})}/>
                    </label>
                    <div className='row justify-content-between'>
                        <label className='col-3'>
                            Duración estimada
                            <input type="time" step="1" className="w-100"/>
                        </label>
                        <label className='col-4'>
                            Fecha máxima de entrega
                            <input type="datetime-local" className="w-100"/>
                        </label>
                        <label className='col-4'>
                            Nota máxima
                            <input type="number" className="w-100" placeholder='0.0' />
                        </label>
                    </div>
                </form>
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
export default ModalActivity