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

class SaveDictamen extends React.Component {


    semestreRef = React.createRef();
    semestreRef = "SEXTO"
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
            semestre:"SEXTO", 
            estado:null,
            responsableDirecto:"null",
        },

        status:"false",
        estado: null

    };

    componentWillMount = () =>{
       
        this.changeState();
       
    }

    changeState = () => {

        this.setState({
            servicio: {
                semestre: "SEXTO",
                responsableDirecto: "null",
                estado: "FINALIZADO",
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
        this.changeState();

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
        return (
            <div className="center">
            <button className="btn" onClick = {this.saveServicio}>Ya cuento con dictamen de menos de 70% de creditos</button>
            </div>
        );
   
      
    
}
}
export default SaveDictamen;
