import React, { Component } from 'react';
import axios from 'axios';

class BorrarAdmin extends React.Component {

    cambioRef = React.createRef();

    state = {
        recuperar:{},
        statusElimar: null,
        status: null,
    }
    /* HAY QUE ACTIVAR EL ID Y EMAIL DEL STATE*/
    changeState = () =>{
        this.setState({
            recuperar:{
                idUsuario: this.props.id,
            }
        });
    }//Fin de changeState
    
    deleteAdmin = () =>{
        if(this.cambioRef.current.value === "SI"){
            try{
                axios.delete("admin/delete/"+this.state.recuperar.idUsuario)
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
                window.location.reload(false);
            }
            else{
                return (
                    
                    <div className="center">
                        <div id="sidebar" className="adminEliminar">
                    <br/>
                                                    <strong>¿DESEA ELIMINAR SU CUENTA?</strong>
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
                                                        <a className="warning_search">¡Seleccione "SI" para eliminar cuenta!</a>
                                                        );
                                                        break;
                                                        default:
                                                            break;
                                                    }
                                                    })()}
                                                    <br></br>
                                                    <button className="btn" onClick={this.deleteAdmin}>ACEPTAR</button>
                                                    <button  className ="btnCancel" onClick={cancel}>Cancelar</button>                                
                    </div>
                    </div>
                );//Fin de return
        }
    }//Fin de Render

}//Fin de class Borrar Admin
export default BorrarAdmin;