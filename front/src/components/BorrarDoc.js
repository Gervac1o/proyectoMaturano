import React, { Component } from 'react';
import axios from 'axios';


class BorrarDoc extends Component {


    state = {
        statusDoc: null,
        statusLista: null
      };

      delete = () => {
          this.deleteLista();
          this.deleteDoc();
      }//Fin de Funcion delete
    
        deleteDoc = () => {
            axios.delete(this.props.url + this.props.idDoc)
            .then(res =>{
                this.setState({
                    statusDoc: "true"
                });
            });
        }//Fin de deleteDoc()
        deleteLista = () => {
            axios.delete("lista/delete/" + this.props.idLista)
            .then(res => {
                this.setState({
                    statusLista: "true"
                });
            });
        }//Fin de deleteLista()

    render(){

        if(this.state.statusDoc === "true" && this.state.statusLista === "true"){
            window.location.reload();
        }

        return(
            <button  id="btn_delete" onClick={this.delete}>Eliminar</button>
        )
    
    }//Fin de Render
}//Fin de class Borrar Doc
export default BorrarDoc;