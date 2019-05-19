import React,{Component} from 'react'

import './FloatingButton.css'
class FloatingButton extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="floating-button position-fixed d-flex align-items-center justify-content-center">
                <div className="diamond position-absolute shadow"></div>{/*Background*/}
                <i>+</i>
                <div className="hidden-actions position-absolute">
                    <div className="floating-button position-relative d-flex align-items-center justify-content-center my-4">
                        <div className="diamond position-absolute shadow"></div>{/*Background*/}
                        <i>+</i>
                    </div>
                    <div className="floating-button position-relative d-flex align-items-center justify-content-center my-4">
                        <div className="diamond position-absolute shadow"></div>{/*Background*/}
                        <i>+</i>
                    </div>
                    <div className="floating-button position-relative d-flex align-items-center justify-content-center my-4">
                        <div className="diamond position-absolute shadow"></div>{/*Background*/}
                        <i>+</i>
                    </div>
                </div>
            </div>
        )
    }
}
export default FloatingButton