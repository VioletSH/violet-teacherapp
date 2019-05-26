import React,{Component} from 'react'
import Hex from '../Hexagon'
import './hexitem.css'

class HexItem extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const mainColor = getComputedStyle(document.body).getPropertyValue('--color-ppal')


        const title = this.props.title;
        const desc1 = this.props.desc1;
        const desc2 = this.props.desc2;
        const hexDesc = this.props.hexDesc?this.props.hexDesc:'this.props.val+'%'';//Modificar
        const hexColor = (this.props.val)?this.setColor(this.props.val/100):'var(--bg-darker)'
        const hexFontColor = (this.props.val&&((this.props.val/100)<0.3))?'var(--color-ppal)':'white';//Modificar

        return(
                <div className='hex-item d-flex position-relative' onClick={this.props.onClick}>
                {/*<div className=" hex-item-inner hexagon m-auto d-flex" style={{'--hexBackground':'white', '--hexHeigh':'7em', '--hexWidth':'28em'}} onClick={this.props.onClick}>
                    <div className="hex-item-border hexagon d-flex mt-4" style={{'--hexHeigh':'7.1em', '--hexWidth':'28.1em'}} />
                    <div className="hex-item-content d-flex flex-column">
                        <h3 className="mt-3 mb-0">{title.substring(0,24)+"..."}</h3>
                        <label className="mb-2">{desc1}</label>
                        <span className="mt-auto mb-3">{desc2}</span>
                    </div>
                    <div className="hex-item-hex hexagon hex-regular ml-auto  position-relative d-flex align-items-center justify-content-center" style={{'--hexBackground':`${hexColor}`, '--hexHeigh':'7em','color':`${hexFontColor}`}}>
                        <h1>{hexDesc}</h1>
                        <div className="hex-item-config hexagon hex-regular fixed-top  ml-auto mt-n4 mr-n3 d-flex position-absolute d-flex align-items-center justify-content-center" style={{'--hexHeigh':'3em'}} onClick={this.props.onClick}>
                            <div className="hexagon hex-regular m-auto d-flex align-items-center justify-content-center" style={{'--hexHeigh':'2.75em'}}>
                                <h2 className="pb-3">...</h2>
                            </div>
                        </div>
                    </div>
                </div>*/}
                    <div className="hex-item-content d-flex flex-column">
                        <h3 className="mt-3 mb-0">{title.substring(0,24)+"..."}</h3>
                        <label className="mb-2">{desc1}</label>
                        <span className="mt-auto mb-3">{desc2}</span>
                    </div>
                    <div className="shape left h-100 w-100 position-absolute">
                        <Hex color={'#fff'}>a</Hex>
                    </div>
                    <div className="shape right h-100 w-100 position-absolute">
                        <Hex color={'#fff'}>a</Hex>
                    </div>
                    <div className='right w-100 h-100 position-absolute'>
                        <Hex color={hexColor}>
                            <h1>{hexDesc}</h1>
                        </Hex>
                    </div>
                    <div className="shadow w-100 h-100 position-absolute">
                        <div className="w-100 h-100 position-relative">
                            <div className="shape left h-100 w-100 position-absolute">
                                <Hex color={'#000'}>a</Hex>
                            </div>
                            <div className="shape right h-100 w-100 position-absolute">
                                <Hex color={'#000'}>a</Hex>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
    setColor(fact){
        var baseColor = getComputedStyle(document.getElementsByTagName('BODY')[0]).getPropertyValue('--bg-darker').substring(2,8);
        var colorRGB = this.hexToRGB(baseColor)
        var result = `rgba(${colorRGB[0]}, ${colorRGB[1]}, ${[colorRGB[2]]},${fact})`; 
        return result
    }
    hexToRGB = (hex) => {
        hex = '0x' + hex
        let r = hex >> 16 & 0xFF
        let g = hex >> 8 & 0xFF
        let b = hex & 0xFF
        return [r, g, b];
      }
}

export default HexItem;