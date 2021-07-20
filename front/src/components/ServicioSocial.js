import React from 'react';
import HeaderDEyAE from './HeaderDEyAE';
import axios from 'axios';
import DirectorioAlumno from './DirectorioAlumno';
import Footer from './Footer';
import Cookies from 'universal-cookie';
import SubirServicio from './SubirServicio';
import VerDatosServicio from './VerDatosServicio';

const cookies = new Cookies();

class ServicioSocial extends React.Component {


    semestreRef = React.createRef();
    responsableDirectoRef = React.createRef();
    servicioRef = React.createRef();
    servicioRef = cookies.get('idAlumno');
    fechaRegistroRef = React.createRef();
    fechaRegistroRef = new Date().toLocaleDateString();


    state = {
        idAlumno: cookies.get('idAlumno'),
        statusResponsable: null,
        servicio: {
            semestre:"SEPTIMO", 
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
                estado: res.data.estado
            });
        })

       
       
    }//Fin de search Servicio

    changeState = () => {
        this.setState({
            servicio: {
                semestre: this.semestreRef.current.value,
                responsableDirecto: "",
                estado: "NUEVO",
                fechaRegistro: this.fechaRegistroRef,
                revisado: "null",
                idAlumno: this.state.idAlumno,
                idServicio: this.state.idAlumno
            }
        });

    }

    saveServicio = (e) => {
       // this.changeState();
            axios.post( "servicioSocial/save", this.state.servicio)
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
        if(this.state.servicio.estado !== "FINALIZADO"){
        return (
            <div className="center">
            <HeaderDEyAE/>
                <DirectorioAlumno />
                <SubirServicio/>
               
                        <div id="sidebar" className="servicioLeft">
                            <br/><strong>Constancia de créditos</strong>
                            {(() => {
                                switch(this.state.estado){
                                    case "NUEVO":
                                    return (
                                       
                                    <div>
                                        <label htmlFor="semestre" className="text_login">Semestre</label>
                                        <select name="semestre" className="input_login" ref={this.semestreRef} onChange={this.changeState}>
                                        <option label="" ></option>
                                            <option value="SEPTIMO">SEPTIMO</option>
                                            <option value="OCTAVO">OCTAVO</option>
                                            <option value="NOVENO">NOVENO</option>
                                            <option value="EGRESADO">EGRESADO</option>
                                            </select>
                                            <br/><br/>
                                            <button className="btn" onClick = {this.saveServicio}>Solicitar Constancia de Creditos</button>
                                    </div>
                                    );
                                    case undefined:
                                    return (
                                        <div>
                                        <label htmlFor="semestre" className="text_login">Semestre</label>
                                        <select name="semestre" className="input_login" ref={this.semestreRef} onChange={this.changeState}>
                                        <option label="" ></option>
                                            <option value="SEPTIMO">SEPTIMO</option>
                                            <option value="OCTAVO">OCTAVO</option>
                                            <option value="NOVENO">NOVENO</option>
                                            <option value="EGRESADO">EGRESADO</option>
                                            </select><br/><br/>
                                            <button className="btn" onClick = {this.saveServicio}>Solicitar Constancia de Creditos</button>
                                    </div>
                                    );
                                    case null:
                                    return (
                                        <div>
                                        <label htmlFor="semestre" className="text_login">Semestre</label>
                                        <select name="semestre" className="input_login" ref={this.semestreRef} onChange={this.changeState}>
                                        <option label="" ></option>
                                            <option value="SEPTIMO">SEPTIMO</option>
                                            <option value="OCTAVO">OCTAVO</option>
                                            <option value="NOVENO">NOVENO</option>
                                            <option value="EGRESADO">EGRESADO</option>
                                            </select>
                                            <br/><br/>
                                            <button className="btn" onClick = {this.saveServicio}>Solicitar Constancia de Creditos</button>
                                    </div>
                                    );
                                    default:
                                        break;
                                }
                            })()}
                           {/* <button className="btn" onClick = {this.saveServicio}>Solicitar Constancia de Creditos</button>*/}
                          </div>
                        
                          <VerDatosServicio/>
                          
                          <Footer/>
            </div>
        );
    }
    else{
        return (
            <div className="center">
            <HeaderDEyAE/>
                <DirectorioAlumno />
                <SubirServicio/>
                   
                        <div id="sidebar" className="servicioLeft" >
                            <div > 
                                <strong>Solicitar fecha de inicio y termino para el servicio social</strong>
                                <label htmlFor="semestre" className="text_login">Lugar donde se realizará SS.</label>
                                <input type="text" className="input_login" name="creditos" placeholder="Ingresa lugar donde se realiza el servicio " />
                                <label htmlFor="semestre" className="text_login">Responsable directo</label>
                                <input type="text" className="input_login" name="creditos" placeholder="Ingresa el nombre del responsable"/>
                                <label htmlFor="semestre" className="text_login">Nombre del programa</label>
                                <input type="text" className="input_login" name="creditos" placeholder="Ingresa el nombre del programa de servicio social"/>            
                                <label htmlFor="semestre" className="text_login">Se realizará dentro de ESIMEZ?</label>
                                <select name="semestre" className="input_login" >
                                <option label="" ></option>
                                    <option value="SEPTIMO">Si</option>
                                    <option value="OCTAVO">No</option>
                                    </select>
                                </div>
                            <br/>
                            {(() => {
                                switch(this.state.estado){
                                    case "FINALIZADO":
                                    return (
                                        <button className="btn" onClick = {this.saveServicio}>Solicitar fechas</button>
                                    );
                                }
                            })()}
                           {/* <button className="btn" onClick = {this.saveServicio}>Solicitar Constancia de Creditos</button>*/}
                          </div>
                        
                          <VerDatosServicio/>
                          
                          <Footer/>
            </div>
        );
                              
    }
      
    
}
}
export default ServicioSocial;
