import React, {Component} from 'react'

import './Modal.css'
class Modal extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <button onClick={this.showModal}></button>
                <div id="my-modal" className="modal fade d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title">Title</h4>
                            </div>
                            <div className="modal-body">
                                Hello World!
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
        modal.className+=' show'
        document.getElementsByClassName('modal-backdrop')[0].className +=' show'
        console.log(modal.classList)
    }
}

export default Modal;