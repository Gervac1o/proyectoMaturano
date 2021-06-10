import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Slider from './Slider';
import DirectorioAdmin from './DirectorioAdmin';

class BuscarICE extends React.Component {



    state = {
        programas: [],
        status: null
    };

    componentWillMount = () => {
        this.searchICE();
    }

    searchICE = () => {
         axios.get("alumno/findPrograma/INGENIERÍA EN COMUNICACIONES Y ELECTRÓNICA")
            .then(res => {
                this.setState(
                    {
                        programas:res.data,
                        status: "true"     
                    }
                );
            });
    }//Fin de searchICA

    render() {
        if(this.state.programas.length >=1){
            return (
                <div className="center">
                    <DirectorioAdmin />
                                    <tbody >
                                        <tr >
                                            <th className="table_lista">Alumno</th>
                                            <th className="table_lista">Boleta</th>
                                            <th className="table_lista">Programa Academico</th>
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
                </div>
            );
        }else if(this.state.programas.length === 0 && this.state.status === 'true'){
            return (
                <div className="center">
                    <DirectorioAdmin />
                    <div>
                        <h1>Aun no existen alumnos registrados de este Programa Academico</h1>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="center">
                    <DirectorioAdmin />
                    <div>
                        <h1>Cargando... Espere un momento...</h1>
                    </div>
                </div>
            );
        }
    }//Fin de Render
    
}//Fin de BuscarICE
export default BuscarICE;