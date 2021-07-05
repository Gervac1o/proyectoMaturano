import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DirectorioAdmin from './DirectorioAdmin';

class BuscarIF extends React.Component {

    state = {
        programas: [],
        status: null
    };

    componentWillMount = () => {
        this.searchIF();
    }

    searchIF = () => {
         axios.get("alumno/findPrograma/INGENIERÍA FOTÓNICA")
            .then(res => {
                this.setState(
                    {
                        programas:res.data,
                        status: "true"     
                    }
                );
            });
    }//Fin de searchIF

    render() {
        if(this.state.programas.length >=1){
            return (
                <div className="center">
                    <DirectorioAdmin />
                    <h1><strong>Alumnos de IF</strong></h1>
                    <br></br>
                            <table>
                                    <tbody >
                                        <tr >
                                            <th className="table_lista, table_title">Alumno</th>
                                            <th className="table_lista, table_title">Boleta</th>
                                            <th className="table_lista, table_title">Programa Académico</th>
                                        </tr>
                                    </tbody>
                                {this.state.programas.map((programa1, i) =>
                                    <tbody key={i}>
                                        <tr>
                                            <td className="table_lista">{programa1.apellidoPaterno} {programa1.apellidoMaterno} {programa1.nombre}</td>
                                            <td className="table_lista">{programa1.boleta}</td>
                                            <td className="table_lista">{programa1.programaAcademico}</td>
                                            <td><Link to={'/admin/DirectorioArchivosAlumno/' + programa1.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                </div>
            );
        }else if(this.state.programas.length === 0 && this.state.status === 'true'){
            return (
                <div className="center">
                    <DirectorioAdmin />
                    <h1><strong>Alumnos de IF</strong></h1>
                    <br></br>
                    <h1>Aun no existen alumnos registrados de este Programa Académico</h1>
                </div>
            );
        }else{
            return(
                <div className="center">
                    <DirectorioAdmin />
                    <h1><strong>Alumnos de IF</strong></h1>
                    <br></br>
                    <h1>Cargando... Espere un momento...</h1>
                </div>
            );
        }
    }//Fin de Render
    
}//Fin de BuscarIF
export default BuscarIF;