import React, {Component} from 'react'
import ReactDOM from "react-dom";
import HexButton from '../HexButton'

import './Modal.css'

/**
 * @author Erik Loaiza & Marco Roldan
 * Component used to handled modals, main used as forms to add data
 * @param title: the type of the button to render, cancel and accept (differs on shape and color)
 * @param modalContent: the css variable defined on index.css to be the main color of the app 
 * @param onAccept: if needs to execute a logic after accept, this will be a function defined by its parent.
 * It uses both types of HexButtons: cancel and accept
 */

class Modal extends Component{
    render(){
        const title= this.props.title?this.props.title:'Please provide title in props'
        const modalContent = this.props.children?this.props.children:'Please provide Content inside Component Tags'
        return(
            <div>
                <div className="modal fade d-block">
                    <div className="modal-dialog  modal-lg modal-dialog-centered position-relative">
                        <div className="modal-content py-4 px-4">
                            <div className="modal-header mx-4">
                                <button type="button" className="close position-absolute" onClick={this.hideModal}>&times;</button>
                                <h3 className="modal-title">{title}</h3>
                            </div>
                            <div className="modal-body mx-4">
                                {modalContent}
                            </div>
                            <div className="modal-footer mr-3">
                                <HexButton type='cancel' onClick={this.hideModal}>Cancelar</HexButton>
                                <HexButton type='accept' onClick={this.onAccept}>Aceptar</HexButton>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="modal-backdrop fade"></div>
            </div>
        )
    }
    /** in order to achive the logic of open the modals
     *  works by comparing a counter, if it increments the modal will show up
     *  that mens that the value of that props will differ from the actual one
     *  @param props: the new props for the component
    */
    componentWillReceiveProps(props){
        if(this.props.openCount !== props.openCount){
            this.showModal();
        }
    }
    /**Logic that change styles to show the modal */
    showModal=()=>{
        var modal =ReactDOM.findDOMNode(this).getElementsByClassName('modal')[0];
        modal.classList.add('show')
        document.getElementsByClassName('modal-backdrop')[0].classList.add('show')
    }
    /**Logic that change styles to hide the modal */
    hideModal=()=>{
        var elements = document.getElementsByClassName("show");
        while(elements[0]){
            elements[0].classList.remove('show')
        }
    }
    /**Logic that handles logic after accept & hides the modal*/
    onAccept=()=>{
        this.props.onAccept();
        this.hideModal();
    }
}

export default Modal;