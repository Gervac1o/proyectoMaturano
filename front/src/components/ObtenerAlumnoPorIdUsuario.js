import React, {Component} from 'react';
import axios from 'axios';
class ObtenerAlumnoPorIdUsuario extends Component{

    state = {
        alumno: {}
    };

    componentWillMount() {
        this.getAlumno();
    }

    getAlumno = () => {
        axios.get("alumno/findIdUsuario/"+this.props.idAlumno)
            .then(response => {
                this.setState({
                    alumno: response.data,
                });
            });
    }//Fin de getAlumno
    
render() {
        return (
            <React.Fragment>
                                <td className="table_lista">{this.state.alumno.apellidoPaterno} {this.state.alumno.apellidoMaterno} {this.state.alumno.nombre}</td>
                                <td className="table_lista">{this.state.alumno.boleta}</td>
                                <td className="table_lista">{this.state.alumno.programaAcademico}</td>
            </React.Fragment>
        );
    }//Fin de Render
}//Fin de Class ObtenerAlumnoPorIdUsuario
export default ObtenerAlumnoPorIdUsuario;