import React,{Component} from 'react'
import './HexButton.css'
/**
 * @author Erik Loaiza & Marco Roldan
 * Component used to render buttons with some hexagonal shapes , there are two types...
 * @param type: the type of the button to render, cancel and accept (differs on shape and color)
 * @param mainColor: the css variable defined on index.css to be the main color of the app 
 * @param content: the html elements or plain text inside the hexagon
 */
class HexButton extends Component{
    render(){
        const mainColor = getComputedStyle(document.body).getPropertyValue('--color-ppal')
        const type = this.props.type
        const content = this.props.children
        return(
            <div className='hex-button position-relative mx-n1 d-flex justify-content-center align-items-center' onClick={this.props.onClick}>
                {
                    type?
                    type==='cancel'?
                    <svg className='position-absolute' xmlns="http://www.w3.org/2000/svg" width="117.777" height="30.316" viewBox="0 0 117.777 30.316">
                        <path id="Trazado_204" data-name="Trazado 204" d="M222.7,144.6l9.767,13.72H337.327l-9.7-13.72,9.7-14.6H232.464Z" transform="translate(-221.482 -129)" fill="none" stroke={mainColor} strokeWidth="2"/>
                    </svg>
                    :type==='accept'?
                    <svg className='position-absolute' xmlns="http://www.w3.org/2000/svg" width="113.824" height="30.316" viewBox="0 0 113.824 30.316">
                        <path id="Trazado_203" data-name="Trazado 203" d="M492.7,144.6l9.767,13.72h91.53l10.083-13.72L593.994,130h-91.53Z" transform="translate(-491.482 -129)" fill={mainColor} stroke={mainColor} strokeWidth="2"/>
                    </svg>
                    :'':''
                }
                <span className={type?type==='accept'?'text-white':'':''}>{content}</span>
            </div>
        )
    }
}
export default HexButton