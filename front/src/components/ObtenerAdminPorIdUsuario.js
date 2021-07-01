import React, {Component} from 'react';
import axios from 'axios';

class ObtenerAdminPorIdUsuario extends Component{

    state = {
        usuario: {}
    };

    componentWillMount() {
        this.getUsuario();
    }

    getUsuario = () => {
        axios.get("usuario/find/"+this.props.idUsuario)
            .then(response => {
                this.setState({
                    usuario: response.data,
                });
            });
    }//Fin de getUsuario
    
render() {     
       return (
        <React.Fragment>
                            <td className="table_lista">{this.state.usuario.email}</td>
        </React.Fragment>
    );
    }//Fin de Render
}//Fin de Class ObtenerAdminPorIdUsuario
export default ObtenerAdminPorIdUsuario;