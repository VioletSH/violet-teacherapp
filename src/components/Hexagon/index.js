import React,{Component} from 'react'
import './Hexagon.css'

class Hex extends Component{
    render(){
        const color= this.props.color?this.props.color:'#000'
        const content = this.props.children
        const size = this.props.size
        const tooltip = this.props.tooltip
        return(
            <div data-balloon={tooltip} data-balloon-pos="up" className="hex d-flex justify-content-center align-items-center mx-1" style={size?{height:size,width:size}:{}}>
                {content}
                <svg width="100%" height="100%" viewBox="0 0 200 174" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd">
                        <path fill={color} d='M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z'/>
                    </g>
                </svg>
            </div>
        )
    }
}
export default Hex