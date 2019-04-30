import React,{Component} from 'react'

import './hexitem.css'

class HexItem extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const title = this.props.title;
        const desc1 = this.props.desc1;
        const desc2 = this.props.desc2;
        const hexDesc = this.props.hexDesc?this.props.hexDesc:this.props.val+'%';
        const hexColor = (this.props.val)?this.setColor(this.props.val/100):'var(--bg-darker)'
        const hexFontColor = (this.props.val&&((this.props.val/100)<0.3))?'var(--color-ppal)':'white';

        return(
            <div className="hex-item-border hexagon d-flex mt-4" style={{'--hexHeigh':'10em', '--hexWidth':'30em'}}>
                <div className=" hex-item-inner hexagon m-auto d-flex" style={{'--hexBackground':'white', '--hexHeigh':'9em', '--hexWidth':'29em'}}>
                    <div className="hex-item-content d-flex flex-column">
                        <h3 className="mt-3">{title}</h3>
                        <h5 className="mb-2">{desc1}</h5>
                        <span className="mt-auto mb-3">{desc2}</span>
                    </div>
                    <div className="hex-item-hex hexagon hex-regular ml-auto  position-relative d-flex align-items-center justify-content-center" style={{'--hexBackground':`${hexColor}`, '--hexHeigh':'9em','color':`${hexFontColor}`}}>
                        <h1>{hexDesc}</h1>
                        <div className="hex-item-config hexagon hex-regular fixed-top  ml-auto mt-n4 mr-n3 d-flex position-absolute d-flex align-items-center justify-content-center" style={{'--hexHeigh':'3em'}} onClick={this.props.onClick}>
                            <div className="hexagon hex-regular m-auto d-flex align-items-center justify-content-center" style={{'--hexHeigh':'2.75em'}}>
                                <h2 className="pb-3">...</h2>
                            </div>
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