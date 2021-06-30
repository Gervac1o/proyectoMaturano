import React, {Component} from 'react';
import axios from 'axios';

import DirectorioAdmin from './DirectorioAdmin';
import ObtenerAlumnoPorIdUsuario from './ObtenerAlumnoPorIdUsuario';
class ListaAlumnos extends Component{

    state = {
        usuarios: [],
        status: null,
    };

    componentWillMount() {
        this.getUsuarios();
    }

    getUsuarios = () => {
        axios.get("usuario/findStatus/"+true)
            .then(response => {
                this.setState({
                    usuarios: response.data,
                    status: 'success',
                });
            });
    }//Fin de getUsuarios
    
render() {
    if(this.state.usuarios.length >=1){        
       return (
        <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>Alumnos Registrados en el Sistema</strong></h1>
                <tbody>
                    <tr>
                        <th className="table_lista, table_title">Correo</th>
                        <th className="table_lista, table_title">Nombre</th>
                        <th className="table_lista, table_title">Boleta</th>
                        <th className="table_lista, table_title">Programa Académico</th>
                    </tr>
                </tbody>
                {this.state.usuarios.map((usuario, i) =>
                    <tbody key={i}>
                        <tr>
                            <td className="table_lista">{usuario.email}</td>
                            <ObtenerAlumnoPorIdUsuario
                            idAlumno={usuario.idUsuario}
                            />
                        </tr>
                    </tbody>
                    )
                }
        </React.Fragment>
    );
    }else if(this.state.usuarios.length === 0 && this.state.status === 'success'){
        return(
            <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>No hay Alumnos Registrados</strong></h1>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>Alumnos Registrados en el Sistema</strong></h1>
                <h1>Cargando... espere un momento</h1>
            </React.Fragment>
        );
    }
    }//Fin de Render
}//Fin de Class ListaAlumnos
export default ListaAlumnos;