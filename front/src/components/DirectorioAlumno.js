import React, {Component} from 'react';
import logo from'../assets/images/user.png';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class DirectorioAlumno extends Component{
    


    usuraioRef=React.createRef();
    

	state = {
        email: cookies.get('email'),
        tipoUsuario: cookies.get('tipoUsuario'),
        nombre:"null"
    }
    componentWillMount=()=>{
        this.setState({
            nombre: cookies.get('nombre')
            
        });
        if(cookies.get('nombre') ==="null"){
            alert("Registra tu información personal en la sección Actualizar Información Personal")
        }


    

       
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
    }//Fin de Cerrar SesiON 
    
    render(){
            return(
                <div className="center">
                <tbody>
                    <tr>
                        <th className="table"><Link to='/user/CrearDictamen' className = "active">Dictamen de 70%</Link></th>
                        <th className="table"><Link to='/user/CrearLiberacion' className = "active">Liberación Extemporanea</Link></th>
                        <th className="table"> <Link to='/user/CrearBaja' className = "active">Baja de Servicio Social</Link></th>
                        <th className="table"><Link to='/user/CrearServicio' className = "active">Pre Registro</Link></th>

                       
                    <th className="table" >
                        <div >
                        
                        <ul>
                            <li>
                                <Link to='#' className="active">{cookies.get('nombre')}...▼</Link>
                                <ul>
                                   
                                    <li className="active" ><Link to='/user/MisDatosAlumno' className = "active">Configuración</Link></li>
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
            )//Fin de Return
    };

}//Fin de Class DirectorioAlumno
export default DirectorioAlumno;