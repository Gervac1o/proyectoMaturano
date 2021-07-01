import React, {Component} from 'react';
import axios from 'axios';

import DirectorioAdmin from './DirectorioAdmin';
import ObtenerAdminPorIdUsuario from './ObtenerAdminPorIdUsuario';
class ListaAdministradores extends Component{

    state = {
        admins: [],
        status: null,
    };

    componentWillMount() {
        this.getAdmins();
    }

    getAdmins = () => {
        axios.get("admin/findAll")
            .then(response => {
                this.setState({
                    admins: response.data,
                    status: 'success',
                });
            });
    }//Fin de getAdmins
    
render() {
    if(this.state.admins.length >=1){        
       return (
        <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>Administradores Registrados en el Sistema</strong></h1>
            <table>
                <tbody className="centrar">
                    <tr>
                        <th className="table_lista, table_title">Correo</th>
                        <th className="table_lista, table_title">Nombre</th>
                        <th className="table_lista, table_title">Teléfono</th>
                    </tr>
                </tbody>
                {this.state.admins.map((admin, i) =>
                    <tbody key={i}>
                        <tr>
                            <ObtenerAdminPorIdUsuario
                            idUsuario={admin.idUsuario}
                            />
                            <td className="table_lista">{admin.nombre} {admin.apellidos} </td>
                            <td className="table_lista">{admin.telefono}</td>
                        </tr>
                    </tbody>
                    )
                }
            </table>
        </React.Fragment>
    );
    }else if(this.state.admins.length === 0 && this.state.status === 'success'){
        return(
            <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>No hay Administradores Registrados</strong></h1>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>Administradores Registrados en el Sistema</strong></h1>
                <h1>Cargando... espere un momento</h1>
            </React.Fragment>
        );
    }
    }//Fin de Render
}//Fin de Class ListaAdministradores
export default ListaAdministradores;