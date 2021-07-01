import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DirectorioAdmin from './DirectorioAdmin';
import ObtenerAlumnoPorIdAlumno from './ObtenerAlumnoPorIdAlumno';
class BuscarBajaAlumnos extends Component{

    estadoRef = React.createRef();

    state = {
        bajas: [],
        status: null,
        statusEstado: null,
        estado: null
    };

    componentWillMount() {
        this.getBajas();
    }

    getBajas = () => {
        axios.get("solicitudBaja/findAll")
            .then(response => {
                this.setState({
                    bajas: response.data,
                    status: 'success',
                    statusEstado: "TODOS"
                });
            });
    }//Fin de getBajas

    changeState = () =>{
        this.setState({
            estado: this.estadoRef.current.value
        });
    }

    cambiarEstado = () =>{
        if(this.state.estado === "NUEVO"){
            this.getNew();
        }else if(this.state.estado === "PROCESANDO"){
            this.getProcessing();
        }else if(this.state.estado === "FINALIZADO"){
            this.getFinished();
        }else if(this.state.estado === "RECHAZADO"){
            this.getRejected();
        }else if(this.state.estado === "TODOS"){
            this.getBajas();
        }
    }

    getNew = () => {
        axios.get("solicitudBaja/findEstado/NUEVO")
            .then(response => {
                this.setState({
                    bajas: response.data,
                    status: 'success',
                    statusEstado: "NUEVO"
                });
            });
    }//Fin de getNew

    getProcessing = () => {
        axios.get("solicitudBaja/findEstado/PROCESANDO")
            .then(response => {
                this.setState({
                    bajas: response.data,
                    status: 'success',
                    statusEstado: "PROCESANDO"
                });
            });
    }//Fin de getProcessing

    getFinished = () => {
        axios.get("solicitudBaja/findEstado/FINALIZADO")
            .then(response => {
                this.setState({
                    bajas: response.data,
                    status: 'success',
                    statusEstado: "FINALIZADO"
                });
            });
    }//Fin de getFinished

    getRejected = () => {
        axios.get("solicitudBaja/findEstado/RECHAZADO")
            .then(response => {
                this.setState({
                    bajas: response.data,
                    status: 'success',
                    statusEstado: "RECHAZADO"
                });
            });
    }//Fin de getFinish
    
render() {
    if(this.state.bajas.length >=1){        
       return (
        <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>BAJA DE SERVICIO SOCIAL</strong></h1>
            <br></br>
            <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                <option value="TODOS">TODOS</option>
                <option value="NUEVO">NO REVISADO</option>
                <option value="PROCESANDO">EN PROCESO</option>
                <option value="FINALIZADO">FINALIZADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
                </select>
            <br/><br/>
            <button className="btn_join" onClick={this.cambiarEstado}>Buscar</button>
            <br/><br/>
            <table>
                <tbody>
                    <tr>
                        <th className="table_lista, table_title">Nombre</th>
                        <th className="table_lista, table_title">Boleta</th>
                        <th className="table_lista, table_title">Programa Académico</th>
                        <th className="table_lista, table_title">Semestre</th>
                        <th className="table_lista, table_title">Registro de Servicio Social</th>
                        <th className="table_lista, table_title">Estado de la Solicitud</th>
                        <th className="table_lista, table_title">Revisado por</th>
                    </tr>
                </tbody>
                {(() => {  
                                switch (this.state.statusEstado){
                                case "NUEVO":
                                    return (
                                        <React.Fragment>
                                        {this.state.bajas.map((baja, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <ObtenerAlumnoPorIdAlumno
                                                idAlumno={baja.idAlumno}
                                                />
                                                <td className="table_lista">{baja.semestre}</td>
                                                <td className="table_lista">{baja.registroSS}</td>
                                                <td className="table_lista"><a id="state_new">NO REVISADO</a></td>
                                                <td className="table_lista">NO REVISADO</td>
                                                <td><Link to={'/DirectorioArchivosAlumno/' + baja.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    );
                                break;
                                case "PROCESANDO":
                                    return(
                                        <React.Fragment>
                                        {this.state.bajas.map((baja, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <ObtenerAlumnoPorIdAlumno
                                                idAlumno={baja.idAlumno}
                                                />
                                                <td className="table_lista">{baja.semestre}</td>
                                                <td className="table_lista">{baja.registroSS}</td>
                                                <td className="table_lista"><a id="state_processing">EN PROCESO</a></td>
                                                <td className="table_lista">{baja.revisado}</td>
                                                <td><Link to={'/admin/DirectorioArchivosAlumno/' + baja.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    ); 
                                    break;  
                                case "FINALIZADO":
                                    return(
                                        <React.Fragment>
                                        {this.state.bajas.map((baja, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <ObtenerAlumnoPorIdAlumno
                                                idAlumno={baja.idAlumno}
                                                />
                                                <td className="table_lista">{baja.semestre}</td>
                                                <td className="table_lista">{baja.registroSS}</td>
                                                <td className="table_lista"><a id="state_finished">FINALIZADO</a></td>
                                                <td className="table_lista">{baja.revisado}</td>
                                                <td><Link to={'/admin/DirectorioArchivosAlumno/' + baja.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    );
                                    break;
                                case "RECHAZADO":
                                    return(
                                        <React.Fragment>
                                        {this.state.bajas.map((baja, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <ObtenerAlumnoPorIdAlumno
                                                idAlumno={baja.idAlumno}
                                                />
                                                <td className="table_lista">{baja.semestre}</td>
                                                <td className="table_lista">{baja.registroSS}</td>
                                                <td className="table_lista"><a id="state_rejected">RECHAZADO</a></td>
                                                <td className="table_lista">{baja.revisado}</td>
                                                <td><Link to={'/admin/DirectorioArchivosAlumno/' + baja.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    );
                                break;
                                case "TODOS":
                                    return(
                                        <React.Fragment>
                                        {this.state.bajas.map((baja, i) =>
                                            <tbody key={i}>
                                            <tr>
                                                <ObtenerAlumnoPorIdAlumno
                                                idAlumno={baja.idAlumno}
                                                />
                                                <td className="table_lista">{baja.semestre}</td>
                                                <td className="table_lista">{baja.registroSS}</td>
                                                <td className="table_lista">{(() => {  
                                                        switch (baja.estado){
                                                        case "NUEVO":
                                                            return (
                                                                <a id="state_new">NO REVISADO</a>
                                                            );
                                                        break;
                                                        case "PROCESANDO":
                                                            return(
                                                                <a id="state_processing">EN PROCESO</a>
                                                            ); 
                                                            break;  
                                                        case "FINALIZADO":
                                                            return(
                                                                <a id="state_finished">FINALIZADO</a>   
                                                            );
                                                        case "RECHAZADO":
                                                            return(
                                                                <a id="state_rejected">RECHAZADO</a>
                                                            )
                                                        default: 
                                                            break;
                                                        }
                                                        })()}</td>
                                                    {(() => {  
                                                        switch (baja.estado){
                                                        case "NUEVO":
                                                            return(
                                                                <th className="table_lista">NO REVISADO</th>
                                                            ); 
                                                            break;  
                                                        default:
                                                            return(
                                                                <th className="table_lista">{baja.revisado}</th>
                                                            ); 
                                                            break;
                                                        }
                                                    })()}
                                                <td><Link to={'/admin/DirectorioArchivosAlumno/' + baja.idAlumno} id="btn_watch">Ver Archivos</Link></td>
                                            </tr>
                                        </tbody>
                                        )
                                        }
                                        </React.Fragment>
                                    );
                                break;
                                default: 
                                    break;
                                }
                                })()}
                    </table>
        </React.Fragment>
    );
    }else if(this.state.bajas.length === 0 && this.state.status === 'success'){
        return(
            <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>BAJA DE SERVICIO SOCIAL</strong></h1>
            <br></br>
            <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                <option value="TODOS">TODOS</option>
                <option value="NUEVO">NO REVISADO</option>
                <option value="PROCESANDO">EN PROCESO</option>
                <option value="FINALIZADO">FINALIZADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
                </select>
            <br/><br/>
            <button className="btn_join" onClick={this.cambiarEstado}>Buscar</button>
            <br/><br/>
                <h1>No hay alumnos registrados para esta solicitud</h1>
            </React.Fragment>
        );
    }else{
        return(
            <React.Fragment>
            <DirectorioAdmin />
            <h1><strong>BAJA DE SERVICIO SOCIAL</strong></h1>
            <br></br>
            <select name="estado" ref={this.estadoRef} onChange={this.changeState}>
                <option value="TODOS">TODOS</option>
                <option value="NUEVO">NO REVISADO</option>
                <option value="PROCESANDO">EN PROCESO</option>
                <option value="FINALIZADO">FINALIZADO</option>
                <option value="RECHAZADO">RECHAZADO</option>
                </select>
            <br/><br/>
            <button className="btn_join" onClick={this.cambiarEstado}>Buscar</button>
            <br/><br/>
                <h1>Cargando... espere un momento</h1>
            </React.Fragment>
        );
    }
    }//Fin de Render
}//Fin de Class BuscarBajaAlumnos
export default BuscarBajaAlumnos;