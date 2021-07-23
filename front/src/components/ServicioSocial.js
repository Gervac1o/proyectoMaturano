import React from 'react';
import HeaderDEyAE from './HeaderDEyAE';
import axios from 'axios';
import DirectorioAlumno from './DirectorioAlumno';
import Footer from './Footer';
import Cookies from 'universal-cookie';
import SubirServicio from './SubirServicio';
import VerDatosServicio from './VerDatosServicio';
import Fechas from './Fechas';


const cookies = new Cookies();

class ServicioSocial extends React.Component {


    semestreRef = React.createRef();
    responsableDirectoRef = React.createRef();
    servicioRef = React.createRef();
    servicioRef = cookies.get('idAlumno');
    fechaRegistroRef = React.createRef();
    fechaRegistroRef = new Date().toLocaleDateString();
    lugarRef = React.createRef();
    responsableDirectoRef = React.createRef();
    nombreProgramaRef = React.createRef();


    state = {
        idAlumno: cookies.get('idAlumno'),
        statusResponsable: null,
        servicio: {
            semestre:null, 
            estado:null,
            responsableDirecto:"null",
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
                responsableDirecto: "null",
                estado: "NUEVO",
                fechaRegistro: this.fechaRegistroRef,
                revisado: "null",
                idAlumno: this.state.idAlumno,
                idServicio: this.state.idAlumno,
                cartaCompromiso:"false",
                documentos:"false",
                fechaFin: "false",
                fechaInicio:"false",
                lugar: "false",
                nombrePrograma:"false",
            }
        });
    }

    saveServicio = (e) => {
        //this.changeState();

       console.log( this.state.servicio.semestre)

       if(this.state.servicio.semestre !== undefined){

            axios.post( "servicioSocial/save", this.state.servicio)
            .then(res => {
                this.setState(
                    {
                        status: "true"
                    }
                );
            });
     }
        
    }//Fin de funcion saveServicio()

    render() {
        if(this.state.status === 'true'){
            window.location.reload(false);
        }
        if(this.state.servicio.estado !== "FINALIZADO" ){
        return (
            <div className="center">
            <HeaderDEyAE/>
                <DirectorioAlumno />
                <SubirServicio
                borrar = {this.state.servicio.estadoFechas}
                         />

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
                                            <br/><br/>
                                           
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
                                            <br/><br/>
                                            
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
                                            <br/><br/>
                                            
                                    </div>
                                    );
                                    default:
                                        break;
                                }
                            })()}
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
                <SubirServicio
                borrar = {this.state.servicio.estadoFechas}/>
                   <Fechas/>
                          <VerDatosServicio/>
                          <Footer/>
            </div>
        );
                              
    }
      
    
}
}
export default ServicioSocial;
