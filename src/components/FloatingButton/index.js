import React,{Component} from 'react'

import './FloatingButton.css'
class FloatingButton extends Component{
    render(){
        const actions = this.props.actions
        return(
            <div className="floating-button position-fixed d-flex align-items-center justify-content-center">
                <div className="diamond position-absolute shadow"></div>{/*Background*/}
                <i>+</i>
                <div className="hidden-actions position-absolute">
                    {actions.map((action,index) =>{
                        return(
                            <div key={'FB'+index} data-balloon={action.tooltip} data-balloon-pos="left" className="floating-button position-relative d-flex align-items-center justify-content-center my-4" onClick={action.action}>
                                <div className="diamond position-absolute shadow"></div>{/*Background*/}
                                <i>{action.icon}</i>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default FloatingButton