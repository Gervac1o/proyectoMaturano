import React, { Component } from 'react';
import axios from 'axios';
import DirectorioAdmin from './DirectorioAdmin';
import Cookies from 'universal-cookie';
import AdminBajaArchivos from './AdminBajaArchivos';
import AdminDictamenArchivos from './AdminDictamenArchivos';
import AdminLiberacionArchivos from './AdminLiberacionArchivos';
import AdminServicioArchivos from './AdminServicioArchivos';
import RecuperacionContraseña from './RecuperacionContraseña';
import BorrarAlumno from './BorrarAlumno';
const cookies = new Cookies();

class DirectorioArchivosAlumno extends Component {

    state = {
        idAlumno: "",
        idTramite: 4,
        status: null,
        alumno:{}
    };

    componentWillMount() {
        
        const { match: { params } } = this.props;
        console.log(params.id + "id por parametros")
        var id = params.id;
        this.setState({
            idAlumno: params.id
        })
       
        
    }
    componentDidMount () {
        this.getAlumno();
    }

    getAlumno = () => {
        axios.get("/alumno/find/"+ this.state.idAlumno)
        .then(response => {
        this.setState({
            alumno: response.data,
        });
        } );   
    }//Fin de getAlumno()

    tramite1 = () => {
        this.setState({
            idTramite: 1
        })
    }
    tramite2 = () => {
        this.setState({
            idTramite: 2
        })
    }
    tramite3 = () => {
        this.setState({
            idTramite: 3
        })
    }
    tramite4 = () => {
        this.setState({
            idTramite: 4
        })
    }
    tramite5 = () => {
        this.setState({
            idTramite: 5
        })
    }
    tramite6 = () => {
        this.setState({
            idTramite: 6
        })
    }
    cancel=()=>{
        this.setState({
            idTramite: 1
        })
    }

    render() {


        return (
            <div className="center">



                <DirectorioAdmin />



                {/**AQUI VA LOS DATOS DEL ALUMNO */}
                <table>
                <tbody>
                    <tr >
                        <th className="table_lista, table_title">Alumno</th>
                        <th className="table_lista, table_title">Boleta</th>
                        <th className="table_lista, table_title">Programa Académico</th>

                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                        <td className="table_lista">{this.state.alumno.boleta}</td>
                        <td className="table_lista">{this.state.alumno.programaAcademico}</td>

                    </tr>
                </tbody>
                </table>

                <tbody>
                <td className="table_lista, table_title">TRÁMITE</td>
                    <tr><br/>
                        <tr>
                        <td><button class="btn" id= "btn-table" onClick={this.tramite4} > PRE REGISTRO</button></td>
                        </tr>
                        <br/>
                        <tr>
                        <td> <button class="btn" id= "btn-table" onClick={this.tramite1} > Dictamen de 70%</button></td>
                            
                        </tr>
                        <br/>
                    </tr>
                    <td className="table_lista, table_title">OTROS</td>
                    <tr><br/>
                        <tr>
                            <td><button class="btn" id= "btn-table" onClick={this.tramite5} > Restablecer contraseña de alumno</button></td>
                        </tr>
                        <br/>
                        <tr>
                            <td><button class="btn" id= "btn-table" onClick={this.tramite6} > Eliminar Alumno</button></td>
                        </tr>
                    </tr>
                </tbody>

                {(() => {
                    switch (this.state.idTramite) {
                        case 1:
                            return (
                                <AdminDictamenArchivos
                                    id={this.state.idAlumno} />
                            );
                            break;
                        case 2:
                            return (
                                <AdminLiberacionArchivos
                                    id={this.state.idAlumno} />
                            );
                            break;
                        case 3:
                            return (
                                <AdminBajaArchivos
                                    id={this.state.idAlumno} />
                            );
                            break;
                        case 4:
                            return (
                                <AdminServicioArchivos
                                    id={this.state.idAlumno} />
                            );
                            break;
                            case 5:
                            return (
                                <RecuperacionContraseña
                                cancel ={this.tramite1}
                                    id={this.state.idAlumno} 
                                    className="archivosAdminCenter"
                                    />
                            );
                            break;
                            case 6:
                            return (
                                <BorrarAlumno
                                cancel ={this.tramite1}
                                    id={this.state.idAlumno} 
                                    className="archivosAdminCenter"
                                    />
                            );
                            break;
                        default: break;

                    }


                })()}

            </div>
        );


    }
}
export default DirectorioArchivosAlumno;