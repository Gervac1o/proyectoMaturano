import React, {Component} from 'react';
import Slider from './Slider';
import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';
import logo from'../assets/images/user.png';
const cookies = new Cookies();

class DirectorioAdmin extends Component{

    state = {
        email: cookies.get('email'),
        


        nombre:"null"
       
       
    }
    componentWillMount=()=>{
        if(cookies.get('nombre') ==="null"){
            alert("Registra tu información personal en la sección Actualizar Información Personal")
        }


    }
       
    

	cerrarSesion(){
        cookies.remove('idUsuario', {path:"/"});
        cookies.remove('email', {path:"/"});
        cookies.remove('contraseña', {path:"/"});
        cookies.remove('tipoUsuario', {path:"/"});
        cookies.remove('idAdmin', {path:"/"});
        cookies.remove('idAlumno', {path:"/"});
        cookies.remove('nombre', {path:"/"});
        window.location.href = '/auth/logout';
    }

    render(){
        return(
            <div className="">
            <Slider
            title= {this.state.email}
            size="slider-small"
            title2="DEyAE"/> 

           



                    <tbody >
                     <tr >
                     <th className="table"><div>
                        <ul>
                            <li>
                                <Link to='#' className="active">Lista de Alumnos ▼</Link>
                                <ul>
                                    <li><Link to={'/admin/Lista'} className="active">Alumnos Registrados</Link></li>
                                    <li><Link to={'/admin/Validar'} className="active">Alumnos por Validar</Link></li>
                                </ul>
                            </li>
                        </ul>
                        </div>
                    </th>
                        <th className="table"><div>
                        <ul>
                            <li>
                                <Link to='#' className="active">Buscar por trámite ▼</Link>
                                <ul>
                                   
                                    <li><Link to={'/admin/BuscarDictamen'} className="active">DICTAMEN DE 70%</Link></li>
                                    <li><Link to={'/admin/BuscarLiberacion'} className="active">LIBERACIÓN EXTEMPORANEA</Link></li>
                                    <li><Link to={'/admin/BuscarBaja'} className="active">BAJA DE SERVICIO SOCIAL</Link></li>
                                    <li><Link to={'/admin/BuscarServicio'} className="active">SERVICIO SOCIAL</Link></li>
                                </ul>
                            </li>
                        </ul>
                        </div>
                         </th>
                            <th className="table">
                                <div>
                                <ul>
                                    <li>
                                        <Link to='#' className="active">Buscar Alumno ▼</Link>
                                        <ul>
                                            <li><Link to={'/admin/BuscarNombre'} className="active">BUSCAR POR NOMBRE</Link></li>
                                            <li><Link to={'/admin/BuscarBoleta'} className="active">BUSCAR POR BOLETA</Link></li>
                                            <li><Link to={'/admin/BuscarICA'} className="active">INGENIERÍA EN CONTROL Y AUTOMATIZACIÓN</Link></li>
                                            <li><Link to={'/admin/BuscarICE'} className="active">INGENIERÍA EN COMUNICACIONES Y ELECTRÓNICA</Link></li>
                                            <li><Link to={'/admin/BuscarIE'} className="active">INGENIERÍA ELÉCTRICA</Link></li>
                                            <li><Link to={'/admin/BuscarISISA'} className="active">INGENIERÍA EN SISTEMAS AUTOMOTRICES</Link></li>
                                        </ul>
                                        </li>
                                    </ul>
                                </div>
                            </th>
                    <th className="table"><div>
                        <ul>
                            <li>
                                <Link to='#' className="active">Administradores ▼</Link>
                                <ul>
                                    <li><Link to={'/admin/Crearadmin'} className="active">Crear Administrador</Link></li>
                                    <li><Link to={'/admin/Admins'} className="active">Lista de Administradores</Link></li>
                                </ul>
                            </li>
                        </ul>
                        </div>
                    </th>
                    <th className="table" >
                         <div >
                        
                        <ul>
                            <li>
                                <Link to='#' className="active">{cookies.get('nombre')}... ▼</Link>
                                <ul>
                                   
                                    <li className="active" ><Link to='/admin/MisDatosAdmin' className = "active">Configuración</Link></li>
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
        );
    }

}//Fin de Class DirectorioAdmin
export default DirectorioAdmin;