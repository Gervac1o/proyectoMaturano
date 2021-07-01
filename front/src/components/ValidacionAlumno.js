import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import HeaderDEyAE from './HeaderDEyAE';
import Footer from './Footer';
import DatosActualizadosAlumno from './DatosActualizadosAlumno';
import {Link} from 'react-router-dom';
import logo from'../assets/images/user.png';
const cookies = new Cookies();

class ValidacionAlumno extends Component {

  

    state = {
        idUsuario: cookies.get('idUsuario'),
        status: false,
        nombre:"null",
       
      };

      componentWillMount=()=>{
        this.getAlumno();


      }

      getAlumno = () => {
        
        axios.get("alumno/findIdUsuario/" + cookies.get('idUsuario'))
           .then(res => {

                  this.setState({
                    nombre: res.data.nombre,
                    status: true,
                    idUsuario:res.data.nombre,
                    
                  })
                 
            })
       
          
        }
    
        cancel = () => {
          this.setState({
            nombre: "null",
            status:false
          })
        }
        actualizar = () => {
          this.setState({
            nombre: null,
            status:false
          })
        }
        cerrarSesion = () => {
          cookies.remove('idUsuario', {path:"/"});
          cookies.remove('email', {path:"/"});
          cookies.remove('contraseña', {path:"/"});
          cookies.remove('tipoUsuario', {path:"/"});
          cookies.remove('idAlumno', {path:"/"});
          cookies.remove('boleta', {path:"/"});
          cookies.remove('nombre', {path:"/"});
      
          window.location.href = '/auth/logout';
      }


    render(){

        return(
         
            <div>
                <HeaderDEyAE/>
             
                <div className="center">
                <tbody>
                    <tr className = "active">
                        <th className="table">Dictamen de 70%</th>
                        <th className="table">Liberacion Extemporanea</th>
                        <th className="table"> Baja de Servicio Social</th>
                        <th className="table">Pre Servicio Social</th>     
                    <th className="table" >
                        <div >
                        
                        <ul>
                            <li>
                                <Link to='#' className="active">{this.state.nombre}...</Link>
                                <ul>
                                   
                                 
                                   <li className="active"  > <p id ="table-btn" onClick={this.cerrarSesion}>cerrar sesion</p></li>
                                   
                               </ul> 
                            </li>
                        </ul>
                        <img src={logo} className ="user"></img>
                        </div>

                    </th>
                   
                    </tr>
                </tbody>
                </div>
                {(() => {
              switch (this.state.nombre) {
                case null:
                 return(
                 <div>
                 <DatosActualizadosAlumno
                 cancel={this.cancel}
                 statusBoleta="false"
                 clase="datosValidacion"
                 statusBtnCancel = "false"
                 />
                 </div>
                 );
              }
              switch (this.state.status){
              case true :
                return(
               <div className = "center">
                <h1  className="datosValidacion" id="sidebar" >Tu cuenta fue registrada exitosamente, espera a que sea validada de 1 a 3 dias </h1>
              </div>
               );
                }
            })()}
            <Footer/>
            </div>
           
          
          );
    
    }//Fin de redner()
}//Fin de Class ValidacionAlumno
export default ValidacionAlumno;