import React from 'react';
import axios from 'axios';

class ActualizarComentario extends React.Component {

    comentarioRef = React.createRef();

    state = {
        status: null,
        lista: {},
        comentario: "",
        statusComentario: null
    };

    changeState = () => {
        this.setState({
            lista: {
                idLista: this.props.idLista,
                idAlumno: this.props.idAlumno,
                idDoc: this.props.idDoc,
                idTramite: this.props.idTramite,
                nombreDoc: this.props.nombreDoc,
                comentario: this.comentarioRef.current.value
            }
        });
        console.log("comentario " + this.state.lista.comentario)
        console.log("id doc " + this.state.lista.idLista)
    }

    comentario = () => {
        this.setState({
            comentario: "true",

        })
    }

    cancelComentario = () => {
        this.setState({
            comentario: "false",

        })
    }

    cambiarComentario = () => {
        this.changeState();
        if (this.state.lista.comentario && this.state.lista.comentario !== null && this.state.lista.comentario !== undefined) {
            axios.patch("lista/update", this.state.lista)
                .then(res => {
                    this.setState({
                        status: "true",
                        statusComentario: "true"
                    });
                });
        } else {
            this.setState({
                statusComentario: "false"
            });
        }//Fin de else Estado del Comentario
    }//Fin de cambiarComentario

    render() {
        if (this.state.status === "true") {
            window.location.reload()
        }
        return (
            <div>

                <button className="btn_join" onClick={this.comentario}>comentario</button>
                
                {(() => {
                    switch (this.state.comentario) {
                        case "true":
                            return (
                                <div class="window-notice" id="window-notice">
                                    <div class="content">
                                        <h1>Actualizar comentario</h1>
                                        <textarea className="table_watch_text" name="comentario" placeholder="Ingrese un mensaje informativo" ref={this.comentarioRef} onChange={this.changeState} />
                                        <br />
                                        <button className="btn_join" onClick={this.cambiarComentario}>Aceptar</button>
                                        <br />
                                        <button className="btn_join_red" onClick={this.cancelComentario}>Cancelar</button>
                                    </div>
                                </div>
                            );

                        default: break;
                    }
                })()}

            </div>
        );
    }//Fin de Render
}//Fin de Class ActualizarComentario
export default ActualizarComentario;
