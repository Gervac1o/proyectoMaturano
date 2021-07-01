import React from 'react';
import axios from 'axios';

class ValidarAlumno extends React.Component {
    
    state = {
        usuario: {},
        idAlumno: this.props.id,
        alumno: {},
        status: null
    };

    componentWillMount() {
        this.changeState();
        this.getAlumno();
    }

    changeState = () => {
        this.setState({
                usuario: {
                idUsuario: this.props.id
                },
                idAlumno: this.props.id
        });
    }

    checkUsuario = async (e) => {
        axios.post("usuario/validarStatus", this.state.usuario)
            .then(res => {
             this.setState({
                status: "true"
                });
            });
    }//Fin de funcion checkUsuario()

    getAlumno = async (e) => {
        axios.get("alumno/findIdUsuario/" + this.state.idAlumno)
           .then(res => {
                  this.setState({
                      alumno: res.data
                  }); 
            });
    }//Fin de funcion getAlumno()

    delete = () => {
        axios.delete("alumno/delete/"+this.state.alumno.idAlumno)
        .then(res => {
            this.setState({
                status: "false"
            });
        });
    }

    render() {
        if (this.state.status === 'true') {
            return (
                <div className="check"><strong>✓</strong></div>
            );
        }
        else if(this.state.status === 'false'){
            return (
                <div className="deny"><strong>X</strong></div>
            );
            }
        else{
            return (
                <React.Fragment>
                    <button className="btn" onClick={this.checkUsuario}>Validar</button>
                    <button  className="btnCancel" onClick={this.delete}>Denegar</button>
                </React.Fragment>
            );
        }
    }//Fin de Render
}//Fin de class ValidarAlumno 
export default ValidarAlumno;
