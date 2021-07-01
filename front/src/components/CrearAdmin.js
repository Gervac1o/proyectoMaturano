import React from 'react';
import axios from 'axios';
import DirectorioAdmin from './DirectorioAdmin';

class CrearAdmin extends React.Component {


    tipoUsuarioRef = React.createRef();
    contraseñaRef = React.createRef();
    emailRef = React.createRef();

    state = {
        usuario: {},
        contraseña: null,
        statusEmail: "",
        statusContraseña: "",
        status: false,
        searchEmail: {},
        emailExistente: null,
        ayuda: "false",
        statusLongitud: "false"
    };

    changeState = () => {
        this.setState({
            usuario: {
                email: this.emailRef.current.value,
                password: this.contraseñaRef.current.value,
                tipoUsuario: true,
                status:true
            },
            contraseña: this.contraseñaRef.current.value,
            statusEmail:this.emailRef.current.value,
            statusContraseña: this.contraseñaRef.current.value,
        });
        console.log(this.state.statusEmail + "status email")
        console.log(this.state.statusContraseña + "status contraseña dentro del if")
                
    }
    reload=()=>{
        window.location.reload(false)
    }

    saveAdmin = () =>{
        console.log(this.state.usuario.email + " email fuera del if")
        if(this.state.statusEmail !== "null"){
            console.log(this.state.statusEmail + " email dentro del if")
            if(this.state.statusEmail.length ){
               
                if(this.state.statusContraseña.length){
                 try{
                    console.log(this.state.contraseña + " contraseña dentro del if")
                    axios.post("usuario/saveAdmin", this.state.usuario)
                    .then(res =>{
                        this.setState({
                            status:true,
                        });
                        console.log(this.state.contraseña + " contraseña despues del setsatate")
                    });
               
                }
                finally{
                    this.setState({
                        statusContraseña:false,
                        statusEmail: "null"
                    })
                }
     
               // window.location.reload(false);
            }
            }
  
        else{
            this.setState({
                statusContraseña: false,
                statusEmail: "null"
            })
            console.log(this.state.statusContraseña + "dentro del rres")
        }
   
    }
}//Fin de saveAdmin

    render() {
        if(this.state.status === false){
        return (
 
                 <div className="center">
                    <DirectorioAdmin />
                        <div id="sidebar" className="crearAdmin">
                        <br/>
                            <strong>Crear Administrador</strong>
                  
                            <div>
                                <label htmlFor="email" className="text_login">Email</label>
                                <input type="email" className="input_login" name="email" ref={this.emailRef} placeholder="Ingresa aquí el correo electrónico" onChange={this.changeState}/>
                           
                                {(() => {
                                    switch(this.state.statusEmail){   
                                        case "null":
                                        return (
                                        <a className="warning">Ingresa un email válido</a>
                                        );
        
                                        default:
                                            break;
                                    }
                                })()}  
                            </div>
                            <div>
                                <label htmlFor="contraseña" className="text_login">Contraseña</label>
                                <input type="text" className="input_login" name="contarseña" ref={this.contraseñaRef} placeholder="Ingresa aquí la contraseña" onChange={this.changeState}/>
                                {(() => {
                                    switch(this.state.statusContraseña){   
                                        case "false":
                                        return (
                                        <a className="warning">¡Ingresa una contraseña!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }   
                                    })()}
                                    {(() => {
                                        switch(this.state.statusLongitud){   
                                            case "false":
                                            return (
                                            <a className="warning">¡Ingresa una contraseña entre 6 y 10 caracteres!</a>
                                            );
                                           
                                            default:
                                                break;
                                        }   
                                        })()}
                            </div>
                            <br/>
                            <button className = "btn" onClick = {this.saveAdmin}>Aceptar</button>
                                      
                                    
                                              
                     
                       
             </div>
             
            </div>
                    
                                
        );
                                    }
                                    else {
                                        return(
                                            <div className="center">
                                            <DirectorioAdmin />
                                            <div id="sidebar" className="crearAdmin">
                                            <br/>
                                            <strong>Se registró  </strong><br/>
                                            <strong>nuevo administrador</strong>
                                            <br/>
                                            <br/>
                                            <strong>Email:</strong> {this.state.usuario.email}
                                                <br/><br/>
                                                <strong>Contraseña:</strong>  {this.state.contraseña}
                                                <br/>
                                                <br/><br/>
                                            <button className = "btn" onClick= {this.reload}>Aceptar</button>
                                            </div>
                                                
                                                </div>
                                        );
                                    }

            
    
    }
}
export default CrearAdmin;
