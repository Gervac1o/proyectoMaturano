import React from 'react';
import axios from 'axios';

class RecuperacionContraseña extends React.Component{

    cambioRef = React.createRef();

    state = {
        alumno:{},
        recuperar:{},
        contraseña: null,
        statusContraseña: null,
        status: null,
        email: "",
        clase:this.props.className
    }
    /* HAY QUE ACTIVAR EL ID Y EMAIL DEL STATE*/
    changeState = () =>{
        this.setState({
            recuperar:{
                idUsuario: this.props.id,
               
                email: this.state.alumno.email,
                password: "p4S"+this.props.id+"dE",
                
            }
        });
        
    }//Fin de changeState
  componentWillMount = () =>{
    this.getAlumno();

    console.log(this.props.className)
  }
     getAlumno = () =>{
        console.log(this.props.id+ " id del usuario de las props ")
        axios.get("usuario/findByAlumno/"+ this.props.id)
        .then(res =>{
            this.setState({
                alumno: res.data,
                contraseña: "true"
            });
            console.log(this.state.alumno.email + " id del usuario -a lumno que regresa de axios ")
            console.log(this.state.alumno.email + " id del usuario -a lumno que regresa de axios ")
        });

    }//Fin de getUsuario()
    
    updateContraseña = () =>{
        this.changeState();
        console.log("update contraseña ")
        if(this.cambioRef.current.value === "SI"){
            console.log("passwoed" + this.state.recuperar.password)
            console.log("passwoed" + this.state.recuperar.idUsuario)
            console.log("passwoed" + this.state.recuperar.email)
            try{
                axios.post("usuario/reset", this.state.recuperar)
                .then(res =>{
                    this.setState({
                        status: true,
                        statusContraseña: "true"
                    });
                });
            }
            finally{
                this.setState({
                    statusContraseña: "false"
                })
            }

           
        }else{
            this.setState({
                statusContraseña: "false"
            })
        }
    }//Fin de updateContraseña

    render() {
        const {cancel} = this.props
        if(this.state.status === true){
            return(
                <div className="center">
                <div id="sidebar" className={ this.props.className}>
                <br/><br/>
                <strong>Se restableció la contraseña con éxito</strong>
                </div>
                </div>
                
            );
        }
        else{
            return (
                
                <div className="center">
                <div id="sidebar" className={ this.props.className}>
                
                <br/>
                                                <strong>¿RESTABLECER CONTRASEÑA?</strong>
                                                <br/>  
                                                <select name="actualizar" ref={this.cambioRef} onChange={this.changeState}>
                                                    <option value="NO">NO</option>
                                                    <option value="SI">SI</option>
                                                    </select>
                                                <br/> 
                                                {(() => {
                                                switch(this.state.statusContraseña){   
                                                    case "false":
                                                    return (
                                                    <a className="warning_search">¡Seleccione "SI" para restablecer la contraseña!</a>
                                                    );
                                                    break;
                                                    default:
                                                        break;
                                                }
                                                })()}<br/>
                                                <strong>Email:</strong> {this.state.alumno.email}
                                                <br/> <br/>
                                                <strong>Nueva Contraseña:</strong> p4S{this.props.id}dE

                                                <br/><br/>
                                                
                                                <button className="btn" onClick={this.updateContraseña}>ACEPTAR</button>
                                                <button  className ="btnCancel" onClick={cancel} >Cancelar</button>
                                                
                                                
                                                
                </div>
                </div>
                
            );
                                            }
    }//Fin de Render
}//Fin de Class Recuperacion Contraseña
export default RecuperacionContraseña;