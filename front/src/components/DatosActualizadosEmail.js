import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class DatosActualizadosEmail extends React.Component {



    contraseñaRef = React.createRef();
  
    nuevaContraseñaRef = React.createRef();

    confirmarNuevaContraseña = React.createRef();

    state = {
        confirmarContraseña: "null",
        confirmarNuevaContraseña: "",
        nuevaContraseña: "",
        idUsuario: cookies.get('idUsuario'),
        emailPerfil: cookies.get('email'),
        statusEmail: null,
        statusContraseña: null,
        statusNuevoEmail: null,
        statusNuevaContraseña: "false",
        statusNuevaConfirmar: null,
        usuario: {
            password:"null"
        },
        email: "",
        contraseña: "",
        status: false,
        searchEmail: {},
        emailExistente: null,
        ayuda: "false"
    };

    changeState =  () => {
        
        this.setState({
            usuario: {
                idUsuario: cookies.get('idUsuario'),
                password: this.contraseñaRef.current.value,
                password2: this.nuevaContraseñaRef.current.value,
                confirmPassword:this.confirmarNuevaContraseña.current.value,


            },
       
        });  

    }//Fin de changeState

    update = () => {
            if(this.state.usuario.password!==undefined || this.state.usuario.password.length >= 6){
                if(this.state.usuario.password2.length >= 6 || this.state.usuario.password2 !== undefined){
                    if(this.state.usuario.confirmPassword!==undefined && this.state.usuario.confirmPassword === this.state.usuario.password2){
                        try{
                            axios.patch("usuario/update", this.state.usuario)
                            .then(res => {
                                this.setState({
                                    status: true
                                });
                            });
                        }
                        finally{
                            this.setState({
                                statusContraseña:false,
                                emailExistente: "true",
                                status:false
                            })
                        }
                    }
                }
        
            }
                                          
    }//Fin de update
                                    
    render() {
        const {cancel} = this.props
     if(this.state.status === true){
         window.location.reload(false);
     }

        return (
            <div className = "center">
                <div id="sidebar" className={this.props.clase}>
                    <br/>
                    <div>
                    <strong>Cambiar Contraseña</strong>
                        <label htmlFor="contraseña" className="text_login">Contraseña actual</label>
                        <input type="password" className="input_login" name="contraseña" ref={this.contraseñaRef} placeholder="Ingresa aquí tu contraseña" onChange={this.changeState}/>
                            {(() => {
                            switch(this.state.statusContraseña){   
                            case "false":
                                return (
                                <a className="warning">¡Ingresa tu contraseña!</a>
                                );
                                break;
                            default:
                                break;
                                }   
                                })()}
                                <label htmlFor="nuevaContraseña" className="text_login">Nueva Contraseña</label>
                                <input type="password" className="input_login" name="nuevaContraseña" ref={this.nuevaContraseñaRef} placeholder="Ingresa aquí tu nueva contraseña" onChange={this.changeState}/>
                    </div>

                    <div>
                        <label htmlFor="nuevaContraseña" className="text_login">Confirma tu Nueva Contraseña</label>
                        <input type="password" className="input_login" name="nuevaContraseña" ref={this.confirmarNuevaContraseña} placeholder="Confirma tu nueva contraseña" onChange={this.changeState}/>
                            {(() => {
                            switch(this.state.statusNuevaContraseña){   
                            case "false":
                                return (
                                <a className="warning">¡Ingresa una Nueva Contraseña entre 6 y 10 caracteres!</a>
                                );
                               
                            default:
                                break;
                                }   
                                })()}
                    </div>
 
                          <br/>
                            <button  className = "btn" onClick = {this.update}>Aceptar</button>
                            <button  className ="btnCancel" onClick={cancel} >Cancelar</button>
                        </div>
                        
                        </div> 
        );
    }
}//Fin de classs DatosActualizadosEmail
export default DatosActualizadosEmail;
