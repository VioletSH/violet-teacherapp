import React, {Component} from 'react'

import HexItem from '../../components/HexItem'


class Modules extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="p-5 m-auto hexagon-container">
                <HexItem title="Una materia chida" desc1="Ingeniería Multimedia" desc2="20/20 estudiantes" val='35' onClick={this.editModule}/>
                <HexItem title="Una materia chida" desc1="Ingeniería Multimedia" desc2="20/20 estudiantes" val='10' />
                <HexItem title="Una materia chida" desc1="Ingeniería Multimedia" desc2="20/20 estudiantes" val='85' />
                <HexItem title="Una materia chida" desc1="Ingeniería Multimedia" desc2="20/20 estudiantes" val='55' />
                <HexItem title="Una materia chida" desc1="Ingeniería Multimedia" desc2="20/20 estudiantes" val='65' />
            </div>
        );
    }

    editModule=()=>{
        console.log("not implemented yet")
    }
}

export default Modules