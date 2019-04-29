import React,{Component} from 'react'

class HexItem extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="hexagon d-flex mt-4" style={{'--hexBackground':'var(--bg-ligher)', '--hexHeigh':'10em', '--hexWidth':'30em'}}>
                <div className="hexagon m-auto d-flex" style={{'--hexBackground':'white', '--hexHeigh':'9em', '--hexWidth':'29em'}}>
                    <div className="d-flex flex-column">
                        <h3 className="mt-3">Title</h3>
                        <h5 className="mb-2">Desc</h5>
                        <span className="mt-auto mb-3">Desc2</span>
                    </div>
                    <div className="hexagon hex-regular ml-auto  position-relative d-flex align-items-center justify-content-center text-white" style={{'--hexBackground':'black', '--hexHeigh':'9em'}}>
                        *N
                        <div className="hexagon hex-regular fixed-top  ml-auto mt-n4 mr-n3 d-flex position-absolute" style={{'--hexBackground':'var(--bg-darker)', '--hexHeigh':'3em'}}>
                            <div className="hexagon hex-regular m-auto d-flex" style={{'--hexBackground':'white', '--hexHeigh':'2.8em'}}>
                                ...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HexItem;