import React,{Component} from 'react'

import Modal from '../../../../components/Modal'
/**
 * @author Erik Loaiza & Marco Roldan
 * Component used to render Content Form with add function, based on component/Modal
 * @param contentTitle: name of the Content
 * @param modules: array of modules (Objects) to get the id in order to list the activities and relate 
 * content to a module and to get the names to render on select input
 * @param moduleSelection: the selected module id
 * @param activities: array of activities (Objects) to get the id in order to relate the content to a activity
 * and to get the names to render on select input
 * @param activitySelection: the selected activity id
 * @param action: the function defined by its parent to add the Content 
 * 
 * 
 * @param files: the uploaded file
 * @param fileType: the MIME type of the uploaded file
 */
class ModalContent extends Component{
    constructor(props){
        super(props)
        this.state={
            openCountModal:0
        }
    }
    render(){
        const contentTitle = this.state.contentTitle;
        const moduleSelection = this.state.moduleSelection;
        const activitySelection = this.state.activitySelection;

        const files = this.state.files;
        const fileSelection = files?files[0]:null;
        const fileUrl = fileSelection?'https://temporalURL.com/'+fileSelection.name.replace(/\s/g,''):null
        const fileType = fileSelection?fileSelection.type:null

        const modules = this.props.modules?this.props.modules:[];
        const moduleSelected = modules.find(x=>x.id==moduleSelection)
        const activities = moduleSelected?moduleSelected.actividades:[]

        return(
            <Modal title='Crear Contenido' openCount={this.state.openCountModal} onAccept={this.props.action.bind(this,moduleSelection,activitySelection,fileUrl,fileType)}>
                <form className="d-flex flex-column">
                    <label htmlFor="exampleFormControlSelect1">Modulo</label>
                    <select className="mb-3" id="exampleFormControlSelect1" onChange={(e)=>this.setState({moduleSelection:e.target.value})}>
                        {modules.map(module=>{
                            return(<option value={module.id}>{module.nombre}</option>)
                        })}
                    </select>
                    <label htmlFor="exampleFormControlSelect1">Actividad</label>
                    <select className="mb-3" id="exampleFormControlSelect1" onChange={(e)=>this.setState({activitySelection:e.target.value})}>
                        {activities.map(activity=>{
                            return(<option value={activity.id}>{activity.nombre}</option>)
                        })}
                    </select>

                     <label>
                        Nombre
                        <input type="text" className="w-100" value={contentTitle} placeholder='Digite el título de la actividad' onChange={(e)=>this.setState({contentTitle:e.target.value})}/>
                    </label>
                    <label>
                        SubirArchivo
                        <input type="file" className="w-100" name="myFile" onChange={(e)=>this.setState({files:e.target.files})}/>
                    </label>
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
            contentTitle:this.props.contentTitle,
        })
    }
}
export default ModalContent