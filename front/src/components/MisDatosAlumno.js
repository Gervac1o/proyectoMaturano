import React, {Component} from 'react';
import HeaderDEyAE from './HeaderDEyAE';
import axios from 'axios';
import DirectorioAlumno from './DirectorioAlumno';
import Cookies from 'universal-cookie';
import DatosActualizadosAlumno from './DatosActualizadosAlumno';
import DatosActualizadosEmail from './DatosActualizadosEmail';
import DatosAlmacenadosAlumno from './DatosAlmacenadosAlumno';

const cookies = new Cookies();

class MisDatosAlumno extends Component {


    state = {
        alumno: {
            nombre:"---",
            boleta:"---",
            programaAcademico:"---"
        },
        usuario: {},
        idUsuario: cookies.get('idUsuario'),
        idAlumno: cookies.get('idAlumno'),
        email: cookies.get('email'),
        actualizar: null,
        status: null
    };

    componentWillMount() {
        this.getAlumno();
      //  if(cookies.get('nombre') ==="null"){
       //     alert("Registra tu información personal en la sección Actualizar Información Personal")
    //    }
       
    }

    getAlumno = () => {
        console.log(this.state.idUsuario);
        axios.get("alumno/findIdUsuario/" + this.state.idUsuario)
            .then(res => {
                this.setState({
                    alumno: res.data,
                    status: 'success'
                });
                cookies.set('idAlumno', this.state.alumno.idAlumno, {path: "/"})
                cookies.set('boleta', this.state.alumno.boleta, {path: "/"})
                cookies.set('nombre', this.state.alumno.nombre, {path: "/"})
            })
            .catch(err => {
                
            })
    }//Fin de funcion getAlumno()


    updateDatos = () => {
        this.setState({
            actualizar: "DATOS"
        })
    }
    updateEmail = () => {
        this.setState({
            actualizar: "EMAIL"
        })
    }
    cancel = () => {
        this.setState({
            actualizar: "false"
        })
    }

    render() {
        return (

            <div className="center">
                <HeaderDEyAE/>
                <DirectorioAlumno/>
                <table>
                <tbody>
                <tr>
                    <th className="table_lista, table_title">Nombre</th>
                    <th className="table_lista, table_title">Boleta</th>
                    <th className="table_lista, table_title">Programa Académico</th>
                    <th className="table_lista, table_title">Correo</th>
                </tr>
                </tbody>
                <tbody>
                <tr>
                    <td className="table_lista">{this.state.alumno.nombre} {this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno}</td>
                    <td className="table_lista">{this.state.alumno.boleta}</td>
                    <td className="table_lista">{this.state.alumno.programaAcademico}</td>
                    <td className="table_lista">{this.state.email}</td>
                </tr>
                </tbody>
                </table>
                <table>
                <tbody>
                <tr>
                    <tr>
                        <td>
                            <button className="btn" id="btn-table" onClick={this.updateDatos}>Actualizar Información
                                Personal
                            </button>
                        </td>
                        <td>
                            <button className="btn" id="btn-table" onClick={this.updateEmail}>Cambiar Contraseña
                            </button>
                        </td>
                    </tr>
                </tr>
                </tbody>
                </table>
                <br></br><br></br><br></br><br></br><br></br><br></br>
                
                {(() => {
                    switch (this.state.actualizar) {
                        case "DATOS":
                            return (
                                <div>
                                    <DatosAlmacenadosAlumno
                                        cancel={this.cancel}
                                        clase="datosAlumno"
                                        statusBtnCancel= "true"
                                        />
                                </div>
                            );
                            break;
                        case "EMAIL":
                            return (
                                <div>
                                    <DatosActualizadosEmail
                                        cancel={this.cancel}
                                        redirect="MisDatosAlumno"
                                        tipoUsuario="false"
                                        clase="datosAlumno"
                                       
                                    />
                                </div>
                            );
                        default:
                            break;
                    }
                })()}
            </div>
        );
    }//Fin de Render ()
}//Fin de Classs MisDatosAlumno

export default MisDatosAlumno;