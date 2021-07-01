import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import BorrarDoc from './BorrarDoc';

const cookies = new Cookies();

class SubirBaja extends React.Component {
    
    state = {
        idSolicitud: cookies.get('idAlumno'),
        statusArchivo: null,
        file: {
            name:"elegir archivo"
        },
        status: null,
        lista: {},
        listar:[],
        fileName: ""
    };

    componentWillMount = () => {
        this.getLista();
    } 

    fileChange = (event) => {
       this.setState({
            file: event.target.files[0],
            statusArchivo: true
        });
    }

    getLista = () => {
        axios.get("lista/findBaja/" + this.state.idSolicitud)
            .then(response => {
                this.setState({
                    listar: response.data,
                });
            });
    }

    guardarLista = async (e) => {
        await axios.post( "lista/save", this.state.lista)
        .then(res => {
            this.setState({
                status: "true"
            });
        });
    }

    upLoad = () => {
        if(this.state.statusArchivo !== null && this.state.file !== undefined){
            const fd = new FormData();
            console.log(this.state);
            fd.append('file', this.state.file, this.state.file.name)
            console.log(this.state.file.name)
                axios.post("docBaja/upload/" + this.state.file.name + this.state.idSolicitud, fd)
                    .then(res =>{
                        this.setState({
                            lista:{
                                idAlumno: cookies.get('idAlumno'),
                                nombreDoc: res.data,
                                idTramite: 3,
                                idDoc: res.data + this.state.idSolicitud,
                                comentario: "NUEVO"
                            }
                        })
                        this.guardarLista();
                    });
        }else{
            this.setState(
                {
                    statusArchivo: false
                }
            );
        }//Fin de else file
        
    }//Fin de funcion upLoad

    render() {
        if(this.state.status === 'true'){
            window.location.reload(false);
        }
        if(this.state.listar.length >=1){
        return (
            <div className="center">
                        <div id="sidebar" className="bajaRight">
                        <strong>DOCUMENTACIÓN BAJA DE SERVICIO SOCIAL</strong>
                                <div>
                                <br/>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="table_lista, table_title"><strong>Archivo</strong></td>
                                            <td className="table_lista, table_title"><strong>Comentario</strong></td>
                                        </tr>
                                    </tbody>
                                    {this.state.listar.map((lista1, i) =>
                                        <tbody key={i}>
                                            <tr>
                                                <td className="table_lista">{lista1.nombreDoc}</td>
                                                <td className="table_lista">{lista1.comentario}</td>
                                                <td><Link to={"/doc/PdfBaja/" + lista1.idDoc}target="_blank" id="btn_watch">Visualizar</Link></td>
                                                <td><a  href={ "/docBaja/getDoc/" + lista1.idDoc} download  id="btn_downLoad">Descargar</a></td>
                                                <td><BorrarDoc
                                                idLista={lista1.idLista}
                                                idDoc={lista1.idDoc}
                                                url= "docBaja/deleteDoc/"
                                                redirect= "CrearBaja"
                                                /></td>
                                            </tr>
                                    </tbody>
                                    )}
                                </table>
                                    <br/>
                                   <br/>
                                    <div  >
                                 <label for="file" id = "input-size"  >{this.state.file.name}</label>
                                    <input type="file" name = "file" id = "file"  onChange={this.fileChange} />
                                    </div>
                                    {(() => {
                                    switch(this.state.statusArchivo){   
                                        case false:
                                        return (
                                        <a className="warning">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                    })()}  
                                </div>
                                <br/>
                                <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button>
                        </div>           
            </div>
        );
    }else if(this.state.listar.length === 0){
        return (
            <div className="center">
                        <div id="sidebar" className="bajaRight">
                            <div>
                                <strong>Aun no hay archivos guardados</strong>
                                <br/>
                                <br/>
                                <div  >
                                 <label for="file" id = "input-size"  >{this.state.file.name}</label>
                                    <input type="file" name = "file" id = "file"  onChange={this.fileChange} />
                                    </div>
                                {(() => {
                                    switch(this.state.statusArchivo){   
                                        case false:
                                        return (
                                        <a className="warning">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()}  
                            </div>
                            <br/>
                            <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button>
                        </div>           
            </div>
        );
    }else{
        return (
            <div className="center">
                        <div id="sidebar" className="bajaRight">
                            <div>
                                Cargando... Espere un momento
                                <div  >
                                 <label for="file" id = "input-size"  >{this.state.file.name}</label>
                                    <input type="file" name = "file" id = "file"  onChange={this.fileChange} />
                                    </div>
                                {(() => {
                                    switch(this.state.statusArchivo){   
                                        case false :
                                        return (
                                        <a className="warning">¡Seleccione un Archivo para Registrar!</a>
                                        );
                                        break;
                                        default:
                                            break;
                                    }
                                })()}    
                            </div>
                            <br/>
                            <button className="btn"  onClick = {this.upLoad}>Subir Archivo</button>
                        </div>           
            </div>
        );
    }
}//Fin de Render 
}//Fin de Class SubirBaja
export default SubirBaja;
