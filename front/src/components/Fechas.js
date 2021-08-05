import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import ConfirmarDocs from './ConfirmarDocs'
import ConfirmarCarta from './ConfirmarCarta'

const cookies = new Cookies();

class Fechas extends React.Component {


  
    responsableDirectoRef = React.createRef();
    servicioRef = React.createRef();
    servicioRef = cookies.get('idAlumno');
    fechaRegistroRef = React.createRef();
    fechaRegistroRef = new Date().toLocaleDateString();
    lugarRef = React.createRef();
    responsableDirectoRef = React.createRef();
    nombreProgramaRef = React.createRef();
    revisadoRef =  React.createRef();


    state = {
       
        statusResponsable: null,
        servicio: {
            estado:null,
        },
        status:"false",
        estado: null

    };

    componentWillMount = () =>{
        this.searchServicio();
    }

    searchServicio = () => {
        axios.get("servicioSocial/findIdAlumno/"+ this.servicioRef)
        .then(res =>{
            this.setState({
                servicio: res.data,
                estado: res.data.responsableDirecto,
            });
            this.revisadoRef = this.state.servicio.revisado
        })
    }//Fin de search Servicio

    changeState = () => {
        this.setState({
            servicio: {
                idServicio:cookies.get('idAlumno'),
                lugar: this.lugarRef.current.value,
                responsableDirecto: this.responsableDirectoRef.current.value,
                nombrePrograma:this.nombreProgramaRef.current.value,
                estadoFechas: "NUEVO",
                estado:"FINALIZADO",
                fechaRegistro: this.fechaRegistroRef,
                fechaInicio: "null",
                revisado: this.revisadoRef,
            }
        });
    }

    saveServicio = (e) => {
        this.changeState();
            axios.patch( "servicioSocial/update", this.state.servicio)
            .then(res => {
                this.setState(
                    {
                        status: "true"
                    }
                );
            });

    }//Fin de funcion saveServicio()
    render() {
        if(this.state.status === 'true'){
            window.location.reload(false);
        }
        return (
            <div className="center">
                    <div id="sidebar" className="servicioLeft" >
                        

                            {(() => {
                                switch(this.state.estado){
                                    case "null":
                                    return (
                                        <div>
                                        <strong>Solicitar fecha de inicio y termino para el servicio social</strong>
                                        <label htmlFor="lugar" className="text_login">Lugar donde se realizará SS.</label>
                                        <input type="text" className="input_login" name="lugar" placeholder="Ingresa lugar donde se realiza el servicio " ref={this.lugarRef} onChange={this.changeState}/>
                                        <label htmlFor="responsable" className="text_login">Responsable directo</label>
                                        <input type="text" className="input_login" name="responsable" placeholder="Ingresa el nombre del responsable"ref = {this.responsableDirectoRef} onChange={this.changeState}/>
                                        <label htmlFor="programa" className="text_login">Nombre del programa</label>
                                        <input type="text" className="input_login" name="programa" placeholder="Ingresa el nombre del programa de servicio social" ref= {this.nombreProgramaRef} onChange={this.changeState}/>               
                                          <br/><br/>
                                      <button className="btn" onClick = {this.saveServicio}>Solicitar fechas</button>
                                           </div>
                                    );

                                }
                                switch(this.state.servicio.estadoFechas){
                                    case "FINALIZADO":
                                        return(
                                            <div>
                                            <strong>Debes subir los siguientes documentos en el apartado "Documentación Servicio Social".</strong>
                                            <p style={{textAlign:'left'}}>
                                            Adjuntar en un solo PDF en el orden siguiente:<br/>
                                            1. Constancia de créditos.<br/>
                                            2. Acta de nacimiento y CURP.<br/>
                                            3. Constancia de vigencia de derechos del IMSS.
                                            </p>
                                            <strong>Una vez que subas tu documentación en el formato solicitado, da click en el siguiente botón.</strong>
                                            <br/><br/>
                                            <ConfirmarDocs/>
                                            </div>
                                        );
                                        default:
                                            return(
                                                
                                                <strong>Solicitar fecha de inicio y termino para el servicio social</strong> 
                                            );
                                }
                                
                            })()}
                            {(() => {
                            switch(this.state.servicio.documentos){
                                case "ok":
                                    return(
                                        <div><br/>
                                            <strong>Carta Compromiso</strong>
                                            <p style={{textAlign:'left'}}>
                                            1. Debes imprimir carta compromiso del SISS.<br/>
                                            2. Revisa que tus datos sean los correctos. Firma la carta 
                                            compromiso en la primer y segunda página donde se requiere. <br/>
                                            3. Escaneala y subela en formato PDF en el apartado "Documentación Servicio Social".
                                            </p>
                                            <strong>Una vez que subas tu Carta Compromiso, da click en el siguiente botón.</strong>
                                            <br/><br/>
                                            <ConfirmarCarta/>
                                        </div>
                                    );
                                    default:
                                    break;
                            }
                        })()}
                          </div>
            </div>
        );
    
}
}
export default Fechas;
