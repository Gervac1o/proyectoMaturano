import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DirectorioAdmin from './DirectorioAdmin';

class BuscarIE extends React.Component {



    state = {
        programas: [],
        status: null
    };

    componentWillMount = () => {
        this.searchIE();
    }

    searchIE = () => {
         axios.get("alumno/findPrograma/INGENIERÍA ELÉCTRICA")
            .then(res => {
                this.setState(
                    {
                        programas:res.data,
                        status: "true"     
                    }
                );
            });
    }//Fin de searchIE

    render() {
        if(this.state.programas.length >=1){
            return (
                <div className="center">
                    <DirectorioAdmin />
                    <h1><strong>Alumnos de IE</strong></h1>
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
                    <h1><strong>Alumnos de IE</strong></h1>
                    <br></br>
                    <h1>Aun no existen alumnos registrados de este Programa Académico</h1>
                </div>
            );
        }else{
            return(
                <div className="center">
                    <DirectorioAdmin />
                    <h1><strong>Alumnos de IE</strong></h1>
                    <br></br>
                    <h1>Cargando... Espere un momento...</h1>
                </div>
            );
        }
    }//Fin de Render
    
}//Fin de BuscarIE
export default BuscarIE;