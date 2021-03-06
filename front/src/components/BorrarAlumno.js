import React, { Component } from 'react';
import axios from 'axios';

class BorrarAlumno extends React.Component {

    cambioRef = React.createRef();

    state = {
        alumno:{},
        recuperar:{},
        statusElimar: null,
        status: null,
        email: "",
        clase:this.props.className
    }
    /* HAY QUE ACTIVAR EL ID Y EMAIL DEL STATE*/
    changeState = () =>{
        this.setState({
            recuperar:{
                idUsuario: this.props.id,
                email: this.state.alumno.email
            }
        });
    }//Fin de changeState

  componentWillMount = () =>{
    this.getAlumno();
  }

     getAlumno = () =>{
        axios.get("usuario/findByAlumno/"+ this.props.id)
        .then(res =>{
            this.setState({
                alumno: res.data,
            });
        });

    }//Fin de getUsuario()
    
    deleteAlumno = () =>{
        if(this.cambioRef.current.value === "SI"){
            try{
                axios.delete("alumno/delete/"+this.state.recuperar.idUsuario)
                .then(res => {
                    this.setState({
                        status: true
                    });
                });
            }
            finally{
                this.setState({
                    statusEliminar: "false"
                })
            }
        }else{
            this.setState({
                statusElimar: "false"
            })
        }
    }//Fin de deleteAlumno

        render() {
            const {cancel} = this.props
            if(this.state.status === true){
                return(
                    <div className="center">
                    <div id="sidebar" className={ this.props.className}>
                    <br/><br/>
                    <strong>Se eliminó el alumno con éxito</strong>
                    </div>
                    </div>
                    
                );
            }
            else{
                return (
                    
                    <div className="center">
                    <div id="sidebar" className={ this.props.className}>
            
                    <br/>
                                                    <strong>¿ELIMINAR ALUMNO?</strong>
                                                    <br/>  
                                                    <select name="actualizar" ref={this.cambioRef} onChange={this.changeState}>
                                                        <option value="NO">NO</option>
                                                        <option value="SI">SI</option>
                                                        </select>
                                                    <br/> 
                                                    {(() => {
                                                    switch(this.state.statusElimar){   
                                                        case "false":
                                                        return (
                                                        <a className="warning_search">¡Seleccione "SI" para eliminar alumno!</a>
                                                        );
                                                        break;
                                                        default:
                                                            return(
                                                                <a className="warning_search">¡Por seguridad antes de eliminar, el alumno no debe tener registros y documentos almacenados!</a>
                                                            )
                                                            break;
                                                    }
                                                    })()}<br/>
                                                    <strong>Email:</strong> {this.state.alumno.email}
                                                    <br/> <br/>

                                                    <button className="btn" onClick={this.deleteAlumno}>ACEPTAR</button>
                                                    <button  className ="btnCancel" onClick={cancel}>Cancelar</button>                                
                    </div>
                    </div>
                );//Fin de return
        }
    }//Fin de Render

}//Fin de class Borrar Alumno
export default BorrarAlumno;