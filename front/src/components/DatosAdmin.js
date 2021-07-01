import React from 'react';
import { Redirect } from 'react-router-dom';
import Slider from './Slider';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class DatosAdmin extends React.Component {



    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    telefonoRef = React.createRef();
    idUsuarioRef = React.createRef();

    state = {
        admin: {},
        email: cookies.get('email'),
        idUsuario: cookies.get('idUsuario'),
        usuario: {},
        status: "null"
    };

    changeState = () => {
        this.setState({
            admin: {
                nombre: this.nombreRef.current.value.toUpperCase(),
                apellidos: this.apellidosRef.current.value.toUpperCase(),
                telefono: this.telefonoRef.current.value,
                idUsuario: this.state.idUsuario
            }
        });
    }

    saveAdmin = async (e) => {
        this.changeState();
        if(this.state.admin.nombre && this.state.admin.nombre !== null && this.state.admin.nombre !== undefined){
            if(this.state.admin.apellidos && this.state.admin.apellidos !== null && this.state.admin.apellidos !== undefined){
                if(this.state.admin.telefono && this.state.admin.telefono !== null && this.state.admin.telefono !== undefined){
                    await axios.post(this.url + "admin/save", this.state.admin)
                        .then(res => {
                            this.setState({
                                status: "true"
                                });
                            });
                            alert("DATOS PERSONALES GUARDADOS")
                }else{
                    alert("LLENA EL CAMPO DE TELEFONO")
                    window.location.reload(false);
                }//Fin de else Apellido Materno
            }else{
                alert("LLENA EL CAMPO DE APELLIDOS")
                window.location.reload(false);
            }//Fin de else Apellido Paterno
        }else{
            alert("LLENA EL CAMPO DE NOMBRE")
            window.location.reload(false);
        }//Fin de else NOMBRE
    }//Fin de funcion saveAlumno()

    componentDidMount= () =>{
        // if(cookies.get('email') == null || cookies.get('email') == undefined){
        //     window.location.href = './IniciarSesion';
        // }
    }

    componentWillMount=()=>{
        // if(cookies.get('email') == null || cookies.get('email') == undefined){
        //     window.location.href = './IniciarSesion';
        // }
    }
    render() {
        if(this.state.status == "true"){
            return <Redirect to = "/MisDatosAdmin"></Redirect>
        }

        return (
            <div className = "center">
                    <Slider
                        title="REGISTRARSE"
                        size="slider-small"
                    />
                    <div id="sidebar" className="datosAdmin">
                        <div>
                            <label htmlFor="nombre"  className="text_login">Nombre(s)</label>
                            <input type="text" className="input_login" name="nombre" ref={this.nombreRef} placeholder="Nombre(s)" onChange={this.changeState}/>
                        </div>
                        <div>
                            <label htmlFor="apellidos"  className="text_login">Apellidos</label>
                            <input type="text" className="input_login" name="apellidos" ref={this.apellidosRef} placeholder="Apellido(s)" onChange={this.changeState}/>
                        </div>
                        <div>
                            <label htmlFor="telefono"  className="text_login">Telefono</label>
                            <input type="text" className="input_login" name="telefono" ref={this.telefonoRef} placeholder="Número Telefónico" onChange={this.changeState}/>
                        </div>
                        <br/>
                        <button  className = "btn" onClick = {this.saveAdmin}>Aceptar</button>
                    </div>
            </div>
        );
    }
}
export default DatosAdmin;
