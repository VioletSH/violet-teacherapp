import React,{Component} from 'react'
/**
 * @author Erik Loaiza & Marco Roldan
 * Component used to handled floatting button with actions, uses an incremental number of options that
 * will be displayed on hover the button element positioned on right bottom of the viewport
 * 
 * @param actions an array of actions that will appear in the element, every action is a child button that
 * will appear after hovering the parent one. 
 * every action is an object with the structure {action:function, tooltip:string, icon:css class}
 */
import './FloatingButton.css'
class FloatingButton extends Component{
    render(){
        const actions = this.props.actions
        return(
            <div className="floating-button position-fixed d-flex align-items-center justify-content-center">
                <div className="diamond position-absolute shadow"></div>{/*Background*/}
                <i className='icon-plus'></i>
                <div className="hidden-actions position-absolute">
                    {actions.map((action,index) =>{
                        return(
                            <div key={'FB'+index} data-balloon={action.tooltip} data-balloon-pos="left" className="floating-button position-relative d-flex align-items-center justify-content-center my-4" onClick={action.action}>
                                <div className="diamond position-absolute shadow"></div>{/*Background*/}
                                <i className={action.icon}></i>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default FloatingButton