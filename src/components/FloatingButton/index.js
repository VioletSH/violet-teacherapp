import React,{Component} from 'react'

import './FloatingButton.css'
class FloatingButton extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="floating-button position-fixed d-flex align-items-center justify-content-center">
                <div className="position-absolute shadow"></div>{/*Background*/}
                <i>+</i>
            </div>
        )
    }
}
export default FloatingButton