import React from 'react'

import './Asignatures.css'

import HexItem from '../../components/HexItem'

const Asignatures= () =>{
    return(
        <div className="p-5 m-auto hexagon-container">
            <HexItem title="Una materia chida" desc1="Ingeniería Multimedia" desc2="20/20 estudiantes" hexDesc="G1"/>
            <HexItem title="Otra materia chida" desc1="Ingeniería Multimedia" desc2="20/20 estudiantes" hexDesc="G1"/>
            <HexItem title="Y otra materia chida" desc1="Ingeniería Multimedia" desc2="20/20 estudiantes" hexDesc="G2"/>
        </div>
    );
}
export default Asignatures