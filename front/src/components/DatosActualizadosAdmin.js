import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();


class DatosActualizadosAdmin extends React.Component {



    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    telefonoRef = React.createRef();

    state = {
        admin: {},
        idUsuario: cookies.get('idUsuario'),
        idAdmin: cookies.get('idAdmin'),
        statusNombre: null,
        statusTelefono: null,
        statusApellidos: null,
        status: "null"
    };

    changeState = () => {
        this.setState({
            admin: {
                nombre: this.nombreRef.current.value.toUpperCase(),
                apellidos: this.apellidosRef.current.value.toUpperCase(),
                telefono: this.telefonoRef.current.value,
                idUsuario: this.state.idUsuario,
                idAdmin: this.state.idAdmin
            }
        });
    }

    saveAdmin = async (e) => {
        this.changeState();
        if(this.state.admin.nombre && this.state.admin.nombre !== null && this.state.admin.nombre !== undefined){
            if(this.state.admin.apellidos && this.state.admin.apellidos !== null && this.state.admin.apellidos !== undefined){
                if(this.state.admin.telefono && this.state.admin.telefono !== null && this.state.admin.telefono !== undefined){
                        await axios.patch("admin/update", this.state.admin)
                        .then(res => {
                            this.setState({
                                status: "true"
                                });
                            });
                }else{
                    this.setState(
                        {
                            statusTelefono: "false"
                        }
                    );
                }//Fin de else Telefono
            }else{
                this.setState(
                    {
                        statusApellidos: "false"
                    }
                );
            }//Fin de else Apellidos
        }else{
            this.setState(
                {
                    statusNombre: "false"
                }
            );
        }//Fin de else NOMBRE
    }//Fin de funcion saveAdmin()


    render() {
        const {cancel} = this.props
        if(this.state.status === 'true'){
            window.location.reload(false);
        }

        return (
            <div className = "center">
                <div id="sidebar" className="archivosAdminCenter3">
                    <div>
                    <br/>
                    <strong>Actualizar información personal </strong>
                        <label htmlFor="nombre" className="text_login">Nombre(s)</label>
                        <input type="text" className="input_login" name="nombre" ref={this.nombreRef} placeholder="Nombre(s)" onChange={this.changeState}/>
                        {(() => {
                                switch(this.state.statusNombre){   
                                    case "false":
                                    return (
                                    <a className="warning">¡Ingresa tu nombre!</a>
                                    );
                                    break;
                                    default:
                                        break;
                                }
                            })()}
                    </div>
                    <div>
                        <label htmlFor="apellidos" className="text_login">Apellidos</label>
                        <input type="text" className="input_login" name="apellidos" ref={this.apellidosRef} placeholder="Apellidos" onChange={this.changeState}/>
                        {(() => {
                                switch(this.state.statusApellidos){   
                                    case "false":
                                    return (
                                    <a className="warning">¡Ingresa tus Apellidos!</a>
                                    );
                                    break;
                                    default:
                                        break;
                                }
                            })()}
                    </div>
                    <div>
                        <label htmlFor="telefono" className="text_login">Número Telefónico</label>
                        <input type="text" className="input_login" name="telefono" ref={this.telefonoRef} placeholder="Número Telefónico" onChange={this.changeState}/>
                        {(() => {
                                switch(this.state.statusTelefono){   
                                    case "false":
                                    return (
                                    <a className="warning">¡Ingresa tu Apellido Materno!</a>
                                    );
                                    break;
                                    default:
                                        break;
                                }
                            })()}
                    </div>
                    <br/>
                    <button  className = "btn" onClick = {this.saveAdmin}>Aceptar</button>
                    <button  className ="btnCancel" onClick={cancel} >Cancelar</button>
                    </div>
        </div>
        );
    }
}
export default DatosActualizadosAdmin;
