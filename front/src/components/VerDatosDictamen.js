import React, { Component } from 'react';
import axios from 'axios';

import Cookies from 'universal-cookie';
import PdfDictamenAlumno from './PdfDictamenAlumno';

const cookies = new Cookies();

class VerDatosDictamen extends React.Component{



    state = {
        dictamen: {},
        idAlumno: cookies.get('idAlumno'),
        email: cookies.get('email'),
        status: false
    };
        componentWillMount() {
            this.getDictamen();
        }

        getDictamen = () => {
            console.log("entrando al get dictamen con el idAlumno" + this.state.idAlumno)
            axios.get("user/dictamen/findIdAlumno/" + this.state.idAlumno)
            .then(res => {
                    this.setState({
                        dictamen: res.data,
                        status: true
                       });
                       console.log("respuesta " + this.state.dictamen.porcentajeCreditos)
            });
            //alert(this.state.dictamen.porcentajeCreditos)
        }//Fin de funcion getDictamen()
        
    render() {
        if(this.state.dictamen.porcentajeCreditos){
           
            return(
                <div className="center">
                        <div id="sidebar" className="dictamenCenter">
                            
                        {(() => {  
                        switch (this.state.dictamen.estado){
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
                                            <strong>Seguimiento:</strong> {this.state.dictamen.revisado}
                                        </div>
                                        </React.Fragment>
                                    ); 
                                    break;  
                                case "FINALIZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_finished">TERMINADO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.dictamen.revisado}
                                        </div>
                                        </React.Fragment>   
                                    );
                                case "RECHAZADO":
                                    return(
                                        <React.Fragment>
                                        <a id="state_rejected">RECHAZADO</a>
                                        <div>
                                            <strong>Seguimiento:</strong> {this.state.dictamen.revisado}
                                        </div>
                                        </React.Fragment> 
                                    )
                                default: 
                                    break;
                                }
                                })()}
                                <div>
                                    <strong>Fecha de Registro:</strong> {this.state.dictamen.fechaRegistro}
                                </div>
                            <div>
                                <strong>Procentaje de creditos:</strong> {this.state.dictamen.porcentajeCreditos}%
                            </div>
                            <div>
                                <strong>Semestre:</strong> {this.state.dictamen.semestre}
                            </div>
                            <br/>
                         <PdfDictamenAlumno
                            creditos={this.state.dictamen.porcentajeCreditos}
                            semestre={this.state.dictamen.semestre}
                            email={this.state.email}
                            idAlumno={this.state.idAlumno}
                            />
                        </div>          
            </div>
            );
        }else{
            return(
                <div className="center">
                        <div id="sidebar" className="dictamenCenter">
                            <div>
                                <strong>No tienes datos disponibles, registralos para empezar con tu documentación DICTAMEN DE MENOS DE 70% DE CREDITOS</strong>
                            </div>
                        </div>          
            </div>
            );
        }//Fin de else status == 'success'
}//Fin de Render ()
}//Fin de Classs VerDatosDictamen

export default VerDatosDictamen;