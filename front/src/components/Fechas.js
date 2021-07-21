import React from 'react';
import HeaderDEyAE from './HeaderDEyAE';
import axios from 'axios';
import DirectorioAlumno from './DirectorioAlumno';
import Footer from './Footer';
import Cookies from 'universal-cookie';
import SubirServicio from './SubirServicio';
import VerDatosServicio from './VerDatosServicio';

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
                revisado: "null",
            }
        });
    }
   

    saveServicio = (e) => {
       // this.changeState();
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
                        <strong>Solicitar fecha de inicio y termino para el servicio social</strong>

                            {(() => {
                                switch(this.state.estado){
                                    case "null":
                                    return (
                                        <div>
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
                                    default:
                                    return(
                                            <div></div>
                                    );
                                }
                                
                            })()}
                           {/* <button className="btn" onClick = {this.saveServicio}>Solicitar Constancia de Creditos</button>*/}
                          </div>
            </div>
        );
    
}
}
export default Fechas;
