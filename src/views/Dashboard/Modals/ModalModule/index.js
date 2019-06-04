import React,{Component} from 'react'

import Modal from '../../../../components/Modal'
/**
 * @author Erik Loaiza & Marco Roldan
 * Component used to render Module Form with add function, based on component/Modal
 * @param moduleTitle: name of the Module
 * @param moduleDesc: description of the Module
 */
class ModalModule extends Component{
    constructor(props){
        super(props)
        this.state={
            openCountModal:0
        }
    }
    render(){
        const moduleTitle = this.state.moduleTitle?this.state.moduleTitle:'';
        const moduleDesc = this.state.moduleDesc?this.state.moduleDesc:'';
        return(
            <Modal title='Crear Módulo' openCount={this.state.openCountModal} onAccept={this.props.action.bind(this,moduleTitle)}>
                <form className="d-flex flex-column">
                    <label>
                        Título del módulo
                        <input type="text" className="w-100" value={moduleTitle} placeholder='Digite el título del módulo' onChange={(e)=>this.setState({moduleTitle:e.target.value})}/>
                    </label>
                    <label>
                        Descripción
                        <textarea className="w-100" rows='4' value={moduleDesc} placeholder='Digite la descripción del módulo'onChange={(e)=>this.setState({moduleDesc:e.target.value})}/>
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
            moduleTitle:this.props.moduleTitle,
            moduleDesc:this.props.moduleDesc,
        })
    }
}
export default ModalModule