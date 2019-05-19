import React, {Component} from 'react'

import './Modal.css'
class Modal extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const title= this.props.title?this.props.title:'Please provide title in props'
        const modalContent = this.props.children?this.props.children:'Please provide Content inside Component Tags'
        return(
            <div>
                <button onClick={this.showModal}></button>
                <div id="my-modal" className="modal fade d-block">
                    <div className="modal-dialog  modal-lg modal-dialog-centered position-relative">
                        <div className="modal-content py-4 px-4">
                            <div className="modal-header mx-4">
                                <button type="button" className="close position-absolute" onClick={this.hideModal}>&times;</button>
                                <h3 className="modal-title">{title}</h3>
                            </div>
                            <div className="modal-body mx-4">
                                {modalContent}
                            </div>
                        </div>
                    </div> 
                </div>
                <div className="modal-backdrop fade"></div>
            </div>
        )
    }
    showModal=()=>{
        var modal  =document.getElementById('my-modal')
        modal.classList.add('show')
        document.getElementsByClassName('modal-backdrop')[0].classList.add('show')
    }
    hideModal=()=>{
        var elements = document.getElementsByClassName("show");
        while(elements[0]){
            elements[0].classList.remove('show')
        }
    }
}

export default Modal;