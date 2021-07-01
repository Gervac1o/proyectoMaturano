import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import BorrarDoc from './BorrarDoc';
import ActualizarComentario from './ActualizarComentario';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class AdminLiberacionArchivos extends React.Component {

    estadoRef = React.createRef();
    comentarioRef = React.createRef();
    eliminarRef = React.createRef();

    state = {
        idAlumno: this.props.id,
        statusArchivo: null,
        file: null,
        
        lista: {},
        listar:[],
        fileName: "",
       
        liberacion: {},
        alumno: {},
        usuario: {},
        statusLiberacion: false,
        cambioEstado: {},
    
        comentario: {},
        statusEliminar: null
    };

    componentWillMount = () => {
       
       
        this.getLista();
        this.getLiberacion();
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


    getLiberacion = () => {
        axios.get("liberacionExtemporanea/findIdAlumno/" + this.state.idAlumno)
            .then(response => {
                this.setState({
                    liberacion: response.data,
                    statusLiberacion: response.data.idLiberacion,
                    cambioEstado:response.data,
                });

            });
           
    }//Fin de getLiberacion()

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

    deleteLiberacion = () => {
        if(this.state.statusEliminar === "true"){
            try{
                axios.delete("liberacionExtemporanea/delete/" + this.props.id)
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
     
}//Fin de deleteLiberacion

    changeState = () => {
        if(this.estadoRef === "undefined"){ 
        this.setState({
            cambioEstado: {
                idAlumno:this.props.id,
                idLiberacion: this.state.liberacion.idLiberacion,
                telefono: this.state.liberacion.telefono,
                semestre: this.state.liberacion.semestre,
                egresado: this.state.liberacion.egresado,
                registroSS: this.state.liberacion.registroSS,
                prestatario: this.state.liberacion.prestatario,
                programaSS: this.state.liberacion.programaSS,
                fechaInicio: this.state.liberacion.fechaInicio,
                fechaTermino: this.state.liberacion.fechaTermino,
                estado: this.state.liberacion.estado,
                fechaRegistro: this.state.liberacion.fechaRegistro,
                revisado:this.state.liberacion.revisado
            },
            statusLiberacion:true,
        });
    }else{
        this.setState({
            cambioEstado: {
                idAlumno:this.props.id,
                idLiberacion: this.state.liberacion.idLiberacion,
                telefono: this.state.liberacion.telefono,
                semestre: this.state.liberacion.semestre,
                egresado: this.state.liberacion.egresado,
                registroSS: this.state.liberacion.registroSS,
                prestatario: this.state.liberacion.prestatario,
                programaSS: this.state.liberacion.programaSS,
                fechaInicio: this.state.liberacion.fechaInicio,
                fechaTermino: this.state.liberacion.fechaTermino,
                estado: this.estadoRef.current.value,
                fechaRegistro: this.state.liberacion.fechaRegistro,
                revisado:cookies.get('nombre'),
            },
            statusLiberacion:true,
        });
        
    }
    }

    cambiarEstado = () => {
       if(this.state.statusLiberacion === true){
        this.changeState();
        axios.patch("liberacionExtemporanea/update", this.state.cambioEstado)
            .then(res => {
                this.getLiberacion();
            });
            window.location.reload(true);
       }
       else{
           console.log("el id de liberacion esta en undefined")
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
        axios.get("lista/findLiberacion/" + this.props.id)
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
        if(this.state.file && this.state.file !== null && this.state.file !== undefined){
            const fd = new FormData();
            console.log(this.state);
            fd.append('file', this.state.file, this.state.file.name)
            console.log(this.state.file.name)
                axios.post("docLiberacion/upload/" + this.state.file.name + this.props.id, fd)
                    .then(res =>{
                        this.setState({
                            lista:{
                                idAlumno: this.props.id,
                                nombreDoc: res.data,
                                idTramite: 2,
                                idDoc: res.data + this.props.id,
                                comentario: this.state.comentar
                            },
                            statusArchivo: "true"
                        })
                        this.guardarLista();
                        window.location.reload(false);
                    });
        }else{
            this.setState({
                statusArchivo: "false"
            });
        }//Fin de else file
    }//Fin de funcion upLoad
    render() {
        
           
       
            return (
                <div className="center">
                            <div id="sidebar" className="archivosAdminCenter">
                            <br />
                            <strong>LIBERACIÓN EXTEMPORANEA</strong>
                                <div>
                                <br/>
                                
                                <input type="checkbox" id="btn-modal" />
                            <label htmlFor="btn-modal" className="btn" onClick={this.getEmail}>INFORMACIÓN DE LA SOLICITUD</label>
                            <br/>
                            <div className="modal">
                                <div className="contenedor">
                                    <h1>Liberación Extemporanea</h1>
                                    <label htmlFor="btn-modal">X</label>
                                    <div className="contenido">
                                        <div>
                                        <strong>Fecha de Registro:</strong> {this.state.liberacion.fechaRegistro}
                                        </div>
                                        <div>
                                        <strong>Semestre:</strong> {this.state.liberacion.semestre}
                                        </div>
                                        <div>
                                        <strong>Registro de Servicio Social:</strong> {this.state.liberacion.registroSS}
                                    </div>
                                        <div>
                                        <strong>Programa de Servicio Social:</strong> {this.state.liberacion.programaSS}
                                        </div>
                                        <div>
                                        <strong>Prestatario:</strong> {this.state.liberacion.prestatario}
                                        </div>
                                        <div>
                                        <strong>Fecha de Inicio:</strong> {this.state.liberacion.fechaInicio}
                                    </div>
                                    <div>
                                    <strong>Fecha de Término:</strong> {this.state.liberacion.fechaTermino}
                                </div>
                                <div>
                                <strong>Número Telefónico:</strong> {this.state.liberacion.telefono}
                            </div>
                            <div>
                            <strong>Correo electrónico:</strong> {this.state.usuario.email}
                        </div>
                        <div>
                        <strong>Revisado por: </strong> {this.state.liberacion.revisado}
                    </div>
                    <div>
                    {(() => {  
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
                                    <button id="btn_delete" onClick={this.deleteLiberacion}>Eliminar</button>
                                    <br />
                                    </div>
                                    </div>
                                </div>
                            </div>
                            {/**fincontenedor */}   
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
                                                <td><Link to={'/doc/PdfLiberacion/' + lista1.idDoc}target="_blank" id="btn_watch">Visualizar</Link></td>
                                                <td><a  href={ "/docLiberacion/getDoc/" + lista1.idDoc} download  id="btn_downLoad">Descargar</a></td>
                                                <td><BorrarDoc
                                                idLista={lista1.idLista}
                                                idDoc={lista1.idDoc}
                                                url= "docLiberacion/deleteDoc/"
                                                redirect={lista1.idAlumno}
                                                />
                                                </td>
                                                <td>
                                                <ActualizarComentario
                                                idLista={lista1.idLista}
                                                idAlumno= {lista1.idAlumno}
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
                                        <br/>
                                    <div  className="archivosAdminCenter" ><strong>Enviar archivo PDF</strong></div> <br />    
                                    <input type="file" name = "file"   onChange={this.fileChange} />
                                    {(() => {
                                    switch(this.state.statusArchivo){   
                                        case "false":
                                        return (
                                        <a className="warning_search">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                      
                                        default:
                                            break;
                                    }
                                    })()} 
                                </div>
                                <br/>
                                <button className="btn"  onClick = {this.upLoad}>ENVIAR</button> 
                            </div>
                </div>
            );
        
       
    }//Fin de Render
}//Fin de Class AdminLiberacionArchivos
export default AdminLiberacionArchivos;
