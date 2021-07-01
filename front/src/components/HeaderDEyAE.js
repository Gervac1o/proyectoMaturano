
import React from 'react';
import logo2 from '../assets/images/esimelogo.png'

class HeaderDEyAE extends React.Component{
//{/*<div><img src={logo} id="logo" alt="esime" /><img src={logo2} id="logo2" alt="politecnico" /></div>*/}

    render(){
        return(
            <div>
            <div className="jumbotron" >
               
            <img src={logo2} id="logo2" alt="politecnico" />
            <br/>
          
            <h2 id = "Header">Escuela Superior de Ingeniería Mecánica y Eléctrica</h2>
            <h3>Unidad Zacatenco</h3>
            <br/> 
            </div>	
            <div className = "navbar"><h4>Trámites de Servicio Social</h4></div>
            </div>
        );//Fin de Return
    }//Fin de Render
}//Fin de Class ErickComponente

export default HeaderDEyAE;