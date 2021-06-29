import React, { Component } from 'react';
import axios from 'axios';

import PdfServicioAlumno from './PdfServicioAlumno';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class VerDatosServicio extends React.Component{



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
            if(this.state.servicio.semestre != "EGRESADO")
            {
                return(
                    <div className="center">
                            <div id="sidebar" className="servicioCenter">
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
                                            <strong>Fecha de Registro:</strong> {this.state.servicio.revisado}
                                        </div>
                                        </React.Fragment>
                                    ); 
                                    break;  
                                case "FINALIZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_finished">TERMINADO</a>
                                        <div>
                                            <strong>Fecha de Registro:</strong> {this.state.servicio.revisado}
                                        </div>
                                        </React.Fragment>   
                                    );
                                case "RECHAZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_rejected">RECHAZADO</a>
                                        <div>
                                            <strong>Fecha de Registro:</strong> {this.state.servicio.revisado}
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
                                <strong>No tienes datos disponibles, registralos para empezar con tu documentación PRE SERVICIO SOCIAL.</strong>
                            </div>
                        </div>          
            </div>
            );
        }//Fin de else status == 'success'
}//Fin de Render ()
}//Fin de Classs VerDatosServicio

export default VerDatosServicio;