import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import BorrarDoc from './BorrarDoc';

const cookies = new Cookies();

class SubirDictamen extends React.Component {
    
    state = {
        idDictamen: cookies.get('idAlumno'),
        statusArchivo: null,
        file: {
            name:"selecciona archivo"
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
            statusArchivo:true
        });
    }

    getLista = () => {
        axios.get("lista/findDictamen/" + this.state.idDictamen)
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
        if(this.state.statusArchivo !== null && this.state.statusArchivo !== undefined){
            const fd = new FormData();
            console.log(this.state);
            fd.append('file', this.state.file, this.state.file.name)
            console.log(this.state.file.name)
                axios.post("docDictamen/upload/" + this.state.file.name + this.state.idDictamen, fd)
                    .then(res =>{
                        this.setState({
                            lista:{
                                idAlumno: cookies.get('idAlumno'),
                                nombreDoc: res.data,
                                idTramite: 1,
                                idDoc: res.data + this.state.idDictamen,
                                idDictamen:this.state.idDictamen,
                                comentario: "NUEVO"
                            }
                        
                        })
                        console.log("id de dictamen" + this.state.idDictamen)
                        this.guardarLista();
                    });
        }else{
            this.setState(
                {
                    statusArchivo: false
                }
            );
        }//Fin de else file
        
    }
render() {

        if(this.state.status === "true"){
            window.location.reload(false);
        }
        if(this.state.listar.length >=1){
            return (
                <div className="center">
                            <div id="sidebar" className="servicioRight">
                            <strong>DOCUMENTACIÓN DICTAMEN</strong>
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
                                                    <td><Link to={'/doc/PdfDictamen/' + lista1.idDoc}target="_blank" id="btn_watch">Visualizar</Link></td>
                                                    <td><a download href={ "/docDictamen/getDoc/" + lista1.idDoc}  id="btn_downLoad">Descargar</a></td>
                                                    <td><BorrarDoc
                                                    idLista={lista1.idLista}
                                                    idDoc={lista1.idDoc}
                                                    url= "docServicio/deleteDoc/"
                                                    redirect= "CrearServicio"
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
                            <div id="sidebar" className="servicioRight">
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
                        <div id="sidebar" className="dictamenRight">
                            <div>
                                Cargando... Espere un momento
                                <div  >
                                    <br/>
                                    <br/>
                                   
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
    }
    }//Fin de Render
}//Fin de Class SubirDictamen
export default SubirDictamen;
