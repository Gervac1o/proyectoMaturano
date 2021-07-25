import React, { Component } from 'react';
import axios from 'axios';
import DirectorioAdmin from './DirectorioAdmin';
import Cookies from 'universal-cookie';
import DatosActualizadosAdmin from './DatosActualizadosAdmin';
import DatosActualizadosEmail from './DatosActualizadosEmail';
import BorrarAdmin from './BorrarAdmin';

const cookies = new Cookies();

class MisDatosAdmin extends Component{



    state = {
        admin: {
            nombre:"---",
            telefono: "---"
        },
        usuario: {},
        idUsuario: cookies.get('idUsuario'),
        idAdmin: cookies.get('idAdmin'),
        email: cookies.get('email'),
        status: null
    };
        componentWillMount() {
            this.getAdmin();
           
        }

        getAdmin = () => {
            axios.get("admin/findIdUsuario/"+ this.state.idUsuario)
       
            .then(res => {
                    this.setState({
                        admin: res.data,
                        status: 'success'
                       });
                       cookies.set('idAdmin', this.state.admin.idAdmin, {path:"/"})
                       cookies.set('nombre', this.state.admin.nombre, {path:"/"})
            })
        }//Fin de funcion getAdmin()
        updateDatos=()=>{
            this.setState({
                actualizar: "DATOS"
            })
        }
        updateEmail=()=>{
            this.setState({
                actualizar: "EMAIL"
            })
        }
        eliminarCuenta=()=>{
            this.setState({
                actualizar: "ELIMINAR"
            })
        }
        cancel=()=>{
            this.setState({
                actualizar: "false"
            })
        }
        
    render() {
            return(
                <div className="center">
  
                <DirectorioAdmin/>
                <table>
                    <tbody >
                        <tr>
                            <th className="table_lista, table_title">Nombre</th>
                            <th className="table_lista, table_title">Telefono</th>
                            <th className="table_lista, table_title">Correo</th>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td className="table_lista"> {this.state.admin.nombre} {this.state.admin.apellidos}</td>
                            <td className="table_lista"> {this.state.admin.telefono}</td>
                            <td className="table_lista"> {this.state.email}</td>
                        </tr>
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr>
                            <tr>
                            <td><button  className="btn" id= "btn-table" onClick={this.updateDatos} >Actualizar Información Personal</button></td>
                            <td><button  className="btn" id= "btn-table"onClick={this.updateEmail} >Cambiar Contraseña</button></td>
                            <td><button  className="btn" id= "btn-table"onClick={this.eliminarCuenta} >Eliminar Cuenta</button></td>
                            </tr>
                        </tr>
                    </tbody>
                </table>
                        {(() => {  
                            switch (this.state.actualizar){
                            case "DATOS":
                                return (
                                    <div>
                                    <DatosActualizadosAdmin
                                    cancel = {this.cancel}
                                    clase = "archivosAdminCenter3"/>
                                   
                                    </div>
                                  );
                            break;
                            case "EMAIL":
                                return (
                                    <div>
                                    <DatosActualizadosEmail
                                    cancel = {this.cancel}
                                    redirect="MisDatosAdmin"
                                    tipoUsuario="true"
                                    clase="archivosAdminCenter3"
                                    />
                                    </div>
                                  );
                                  break;
                            case "ELIMINAR":
                                return(
                                     <div>       
                                        <BorrarAdmin
                                        cancel = {this.cancel}
                                        id= {this.state.idAdmin}
                                        />
                                    </div>
                                    );
                                break;
                             default: 
                             break;
                            }
                            })()}
                           
                            <a download href={ "/alumno/export/NUEVO" }  id="btn_downLoad">Export to CSV</a>
                </div>
            );
  
}//Fin de Render ()
}//Fin de Classs MisDatosAdmin

export default MisDatosAdmin;