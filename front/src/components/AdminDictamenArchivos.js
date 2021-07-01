import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import BorrarDoc from './BorrarDoc';
import ActualizarComentario from './ActualizarComentario';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class AdminDictamenArchivos extends React.Component {

    estadoRef = React.createRef();
    comentarioRef = React.createRef();
    eliminarRef = React.createRef();

    state = {
        idAlumno: this.props.id,
        statusArchivo: null,
        file: null,
        status: null,
        lista: {},
        listar: [],
        fileName: "",
       
        dictamen: {},
        alumno: {},
        usuario: {},
        statusDictamen: false,
        cambioEstado: {},
        
        statusEstado: null,
        comentario: {},
        statusEliminar: null
    };

    componentWillMount = () => {
        this.getDictamen();
        this.getLista();
        this.getAlumno();
    }




    cancelComentario = () => {
        this.setState({
            comentario: {
                status: "false",
                texto: ""
            },
            statusComentario: "true"
        })
    }



    getDictamen = () => {
       
        axios.get("user/dictamen/findIdAlumno/" + this.state.idAlumno)
            .then(response => {
                this.setState({
                    dictamen: response.data,
                   
                    cambioEstado:response.data,
                });
            }); 
           
    
            
    }//Fin de getDictamen()


    getAlumno = () => {
        axios.get("/alumno/find/" + this.state.idAlumno)
            .then(response => {
                this.setState({
                    alumno: response.data,
                });
            });
           
    }//Fin de getAlumno()

    statusDelete = () => {
        this.setState({
            statusEliminar: this.eliminarRef.current.value
        })
    }//Fin de Status Delete

    deleteDictamen = () => {
        if(this.state.statusEliminar === "true"){
            try{
                axios.delete("user/dictamen/delete/" + this.props.id)
                .then(res => {
                window.location.reload()
                });
            }
            finally{
                this.setState({
                    statusEliminar: "false"
                })
            }//Fin de finally
        }
    else{
        this.setState({
            statusEliminar: "false"
        });
        }//Fin de else
     
}//Fin de deleteDictamen

    changeState = () => {
      
        if(this.estadoRef === "undefined"){
            this.setState({
   
                cambioEstado: {
                    idAlumno: this.props.id,
                    idDictamen: this.state.dictamen.idDictamen,
                    semestre: "SEPTIMO",
                    porcentajeCreditos: this.state.dictamen.porcentajeCreditos,
                    estado: this.state.dictamen.estado,
                    fechaRegistro: this.state.dictamen.fechaRegistro,
                    revisado:this.state.dictamen.revisado
                },
            statusDictamen: true,
            });
        }
        else{
            this.setState({
   
                cambioEstado: {
                    idAlumno: this.props.id,
                    idDictamen: this.state.dictamen.idDictamen,
                    semestre: "SEPTIMO",
                    porcentajeCreditos: this.state.dictamen.porcentajeCreditos,
                    estado: this.estadoRef.current.value,
                    fechaRegistro: this.state.dictamen.fechaRegistro,
                    revisado:cookies.get('nombre'),
                },
            statusDictamen: true,
            });

        }
      

        console.log("esta en estado ref" +this.estadoRef )
        console.log("esta en Status dictamen" +this.state.statusDictamen )  
    }

    cambiarEstado = () => {
        if(this.state.statusDictamen === true){
            this.changeState();
            console.log(this.state.cambioEstado.estado)
            axios.post("user/dictamen/update", this.state.cambioEstado)
                .then(res => {
                    this.getDictamen();
                });
                window.location.reload(true);
        }else{
            console.log("esta en undefined el id dictamen" )
        }

    }//Fin de Cambiar Estado

    fileChange = (event) => {
        this.setState({
            file: event.target.files[0]
        });
    }

    estado = () => {
        this.setState({
            statusEstado: "true"
        });
    }//Fin de estado

    getLista = () => {
        axios.get("lista/findDictamen/" + this.props.id)
            .then(response => {
                this.setState({
                    listar: response.data,
                });
            });
    }

    guardarLista = async (e) => {
        await axios.post("lista/save", this.state.lista)
            .then(res => {
                this.setState({
                    status: "true"
                });
            });
    }

    upLoad = () => {
        if (this.state.file && this.state.file !== null && this.state.file !== undefined) {
            const fd = new FormData();
            console.log(this.state);
            fd.append('file', this.state.file, this.state.file.name)
            console.log(this.state.file.name)
            axios.post("docDictamen/upload/" + this.state.file.name + this.props.id, fd)
                .then(res => {
                    this.setState({
                        lista: {
                            idAlumno: this.props.id,
                            nombreDoc: res.data,
                            idTramite: 1,
                            idDoc: res.data + this.props.id,

                        },
                        statusArchivo: "true"
                    })
                    this.guardarLista();
                    window.location.reload(false);
                });
        } else {
            this.setState({
                statusArchivo: "false"
            })
        }//Fin de else file
    }//Fin de funcion upLoad

    render() {
 
   

            return (
                <div className="center">
                    <div id="sidebar" className="archivosAdminCenter">
                        <br />
                        <strong>DICTAMEN MENOS DE 70% DE CREDITOS</strong>
                        <div>
                            <br />
                            <input type="checkbox" id="btn-modal" />
                            <label htmlFor="btn-modal" className="btn" onClick={this.change}>INFORMACIÓN DE LA SOLICITUD</label>
                            <div className="modal">
                                <div className="contenedor">
                                    <h1>Dictamen de 70%</h1>
                                    <label htmlFor="btn-modal">X</label>
                                    <div className="contenido">
                                        <div>
                                            <strong>Fecha de Registro:</strong> {this.state.dictamen.fechaRegistro}
                                        </div>
                                        <div>
                                            <strong>Semestre:</strong> {this.state.dictamen.semestre}
                                        </div>
                                        <div>
                                            <strong>Porcentaje de Creditos:</strong> {this.state.dictamen.porcentajeCreditos}%
                                    </div>
                                        <div>
                                            <strong>Revisado por: </strong> {this.state.dictamen.revisado}
                                        </div>
                                        <div> {(() => {  
                                        switch (this.state.cambioEstado.estado){
                                            case "NUEVO":
                                             return (
                                                 <a id="state_new">NUEVO</a>
                                                     );
                                             case "PROCESANDO":
                                                 return(
                                                    <a id="state_processing">EN PROCESO</a>
                                                 );
                                             case "FINALIZADO":
                                                 return(
                                                    <a id="state_finished">TERMINADO</a>
                                                 );
                                             case "RECHAZADO":
                                                 return(
                                                    <a id="state_rejected">RECHAZADO</a>
                                                 );
                                        }
                                        })()}
                                        </div>
                                        <strong>Cambiar estado de la revisión:</strong>
                                        <div className="center">
                                            <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                                                <option value=""></option>
                                                <option value="NUEVO">NO REVISADO</option>
                                                <option value="PROCESANDO">EN PROCESO</option>
                                                <option value="FINALIZADO">FINALIZADO</option>
                                                <option value="RECHAZADO">RECHAZADO</option>
                                            </select>
                                            <button className="btn_join" onClick={this.cambiarEstado}>Actualizar</button>
                                            <br />
                                        </div>
                                        <br />
                                        <div className="center">
                                            <select name="eliminar" ref={this.eliminarRef} onChange={this.statusDelete}>
                                            <option value="false">NO</option>
                                            <option value="true">SI</option>
                                            </select>
                                        {(() => {
                                        switch(this.state.statusEliminar){   
                                            case "false":
                                            return (
                                            <a className="warning_search">¡Seleccione "SI" para eliminar alumno!</a>
                                            );
                                            break;
                                            default:
                                                return(
                                                    <a className="warning_search">¡Por seguridad antes de eliminar el registro, no debe tener documentos almacenados!</a>
                                                )
                                                break;
                                        }
                                        })()}
                                    <button id="btn_delete" onClick={this.deleteDictamen}>Eliminar</button>
                                    <br />
                                    </div>
                                    </div>
                                </div>
                            </div>
                            {/**fincontenedor */}
                        </div>
                        <div>
                                 <br />
                            <table>
                            <tbody>
                                <tr>
                                    <td className="table_lista, table_title"><strong>Documentos</strong></td>
                                    <td className="table_lista, table_title"><strong>Comentario</strong></td>
                                </tr>
                            </tbody>
                            {this.state.listar.map((lista1, i) =>
                                <tbody key={i}>
                                    <tr>
                                        <td className="table_lista">{lista1.nombreDoc}</td>
                                        <td className="table_lista">{lista1.comentario}</td>
                                        <td><Link to={'/doc/PdfDictamen/' + lista1.idDoc}target="_blank" id="btn_watch">Visualizar</Link></td>
                                        <td><a download href={ "/docDictamen/getDoc/" + lista1.idDoc}  id="btn_downLoad">Descargar</a></td>
                                        <td><BorrarDoc
                                            idLista={lista1.idLista}
                                            idDoc={lista1.idDoc}
                                            url="docDictamen/deleteDoc/"
                                            redirect={lista1.idAlumno}
                                        />
                                        </td>
                                        <td>
                                            <ActualizarComentario
                                                idLista={lista1.idLista}
                                                idAlumno={lista1.idAlumno}
                                                idDoc={lista1.idDoc}
                                                idTramite={lista1.idTramite}
                                                nombreDoc={lista1.nombreDoc}
                                                comentario={lista1.comentario}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                            </table>
                            <br />
                            <div  className="archivosAdminCenter" ><strong>Enviar archivo PDF</strong></div> <br /> 
                            <input type="file" name="file" onChange={this.fileChange} />
                            {(() => {
                                switch (this.state.statusArchivo) {
                                    case "false":
                                        return (
                                            <a className="warning_search">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                    default:
                                        break;
                                }
                            })()}
                        </div>
                        <br />
                        <button className="btn" onClick={this.upLoad}>Enviar</button>
                    </div>
                </div>
            );
 
           
    }//Fin de Render
}//Fin de Class SubirDictamen
export default AdminDictamenArchivos;
