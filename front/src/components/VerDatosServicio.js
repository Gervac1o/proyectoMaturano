import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';

const cookies = new Cookies();

class VerDatosServicio extends Component{

    state = {
        servicio: {},
        idAlumno: cookies.get('idAlumno'),
        email: cookies.get('email'),
        status: null
    };
        componentWillMount() {
            this.getServicio();
        }

        getServicio = () => {
            axios.get("servicioSocial/findIdAlumno/" + this.state.idAlumno)
            .then(res => {
                    this.setState({
                        servicio: res.data,
                        status: 'success'
                       });
            });
        }//Fin de funcion getServicio()
        
    render() {
        if(this.state.servicio ){
            if(this.state.servicio.semestre !== "EGRESADO")
            {
                return(
                    <div className="center">
                            <div id="sidebar" className="servicioCenter">
                            <strong>Constancia de créditos.</strong><br/>
                            <strong>Estado de Trámite: </strong>
                                {(() => {  
                                switch (this.state.servicio.estado){
                                case "NUEVO":
                                    return (
                                        <a id="state_new">NUEVO</a>
                                    );
                                break;
                                case "PROCESANDO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_processing">EN PROCESO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.servicio.revisado}
                                        </div>
                                        </React.Fragment>
                                    ); 
                                    break;  
                                case "FINALIZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_finished">TERMINADO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.servicio.revisado}
                                        </div>
                                        </React.Fragment>   
                                    );
                                case "RECHAZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_rejected">RECHAZADO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.servicio.revisado}
                                        </div>
                                        </React.Fragment> 
                                    )
                                default: 
                                    break;
                                }
                                })()}
                                <div>
                                    <strong>Fecha de Registro:</strong> {this.state.servicio.fechaRegistro}
                                </div>
                                <div >
                                    <strong>Semestre:</strong> {this.state.servicio.semestre}
                                </div>
                             <br/>
               
                            </div>          
                </div>
                );
            }else{
                return(
                    <div className="center">
                            <div id="sidebar" className="servicioCenter">
                            <strong>Constancia de créditos.</strong><br/>
                            <strong>Estado de Trámite: </strong>
                            {(() => {  
                                switch (this.state.servicio.estado){
                                case "NUEVO":
                                    return (
                                        <a id="state_new">NUEVO</a>
                                    );
                                break;
                                case "PROCESANDO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_processing">EN PROCESO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.servicio.revisado}
                                        </div>
                                        </React.Fragment>
                                    ); 
                                    break;  
                                case "FINALIZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_finished">TERMINADO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.servicio.revisado}
                                        </div>
                                        </React.Fragment>   
                                    );
                                case "RECHAZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_rejected">RECHAZADO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.servicio.revisado}
                                        </div>
                                        </React.Fragment> 
                                    )
                                default: 
                                    break;
                                }
                                })()}
                                <div>
                                    <strong>Fecha de Registro:</strong> {this.state.servicio.fechaRegistro}
                                </div>
                                <div >
                                    <strong>Soy Egresado</strong>
                                </div>
                                <br/>
                               
                            </div>
                </div>
                );
            }
        }else{ 
            return(
                <div className="center">
                        <div id="sidebar" className="servicioCenter">
                            <div >
                                <p style={{textAlign:'left'}}>Primero debes solicitar tu constancia de creditos 
                                para realizar el servicio social.<br/>
                                <strong> Requisitos.</strong> 
                                <br/><br/>
                                Para alumnos: <br/>
                                -Debes de haber cerrado tu inscripción.<br/>
                                -Tener mínimo 70% de créditos.<br/>
                                -Si tienes 68% de créditos, puedes tramitar dictamen de inicio.
                                </p>
                                <div style={{textAlign:'left',}}>  
                                <Link to='/user/CrearDictamen' className='link' >Solicitar Dictamen de menos del 70% de creditos.</Link>
                                </div>
                              
                                <p style={{textAlign:'left'}}>
                               
                                -Debes tener TODAS LAS MATERIAS CURSADAS del primer semestre al sexto 
                                sin ninguna reprobada.<br/><br/>
                                Para pasantes:<br/>
                                -Puedes solicitar constancia de créditos si eres egresado en un periodo menor 
                                de año y medio.
                                -O presentar carta de pasante (100% de créditos).
                                </p> <trong style={{textAlign:'left'}}  className='link'>Nota: </trong> 
                                <p style={{textAlign:'left'}}>
                                Debes tener un lugar asegurado para realizar el servicio social en alguna empresa, escuela, departamento o profesor.
                                Para lo cual necesitas ponerte en contacto para asegurar que tengan lugar en su programa a distancia 
                                (Ver apartado de vacantes en la página de ESIME Zacatenco/Estudiantes/Servicio Social o en la página servicio.social.ipn.mx)

                                  </p>
                            </div>
                        </div>          
            </div>
            );
        }//Fin de else status == 'success'
}//Fin de Render ()
}//Fin de Classs VerDatosServicio

export default VerDatosServicio;