import React from 'react';
import axios from 'axios';
import HeaderDEyAE from './HeaderDEyAE';
import DirectorioAlumno from './DirectorioAlumno';
import Footer from './Footer';
import SubirDictamen from './SubirDictamen';
import VerDatosDictamen from './VerDatosDictamen';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Dictamen extends React.Component {



    creditosRef = React.createRef();
    dictamenRef = React.createRef();
    dictamenRef = cookies.get('idAlumno');
    fechaRegistroRef = React.createRef();
    fechaRegistroRef = new Date().toLocaleDateString();

    state = {
        idAlumno: cookies.get('idAlumno'),
        statusCreditos: "false",
        dictamen: {},
        status: "null",
        estado: null
    };

    componentWillMount = () =>{
        this.searchDictamen();
    }

    searchDictamen = () => {
        axios.get("user/dictamen/findIdAlumno/" + this.dictamenRef)
        .then(res =>{
            this.setState({
                dictamen: res.data
            });
        })
        .then(res => {
            this.setState({
                estado: this.state.dictamen.estado,
                dictamen:{
                    porcentajeCreditos: null,
                    semestre: "SEPTIMO",
                    estado: "NUEVO",
                    fechaRegistro: null,
                    revisado: null,
                    idAlumno: null,
                    idDictamen: null
                }
            });
        });
    }//Fin de search Dictamen
    changeState = () => {
        this.setState({
            dictamen: {
                porcentajeCreditos: this.creditosRef.current.value,
                semestre: "SEPTIMO",
                estado: "NUEVO",
                fechaRegistro: this.fechaRegistroRef,
                revisado: null,
                idAlumno: this.state.idAlumno,
                idDictamen: this.state.idAlumno
            }
        });
    }

    saveDictamen = async (e) => {
        this.changeState();
        //alert(this.state.idAlumno)
        if(this.state.dictamen.porcentajeCreditos > 67 && this.state.dictamen.porcentajeCreditos < 70){
         await axios.post("user/dictamen/save", this.state.dictamen)
            .then(res => {
                this.setState(
                    {
                        statusCreditos: "true"
                    }
                );
               
            })
        }else{
            this.setState(
                {
                    statusCreditos: "false"
                }
            );
        }//Fin de else % de Creditos
    }//Fin de funcion saveDictamen()
    render() {
       
            
        if (this.state.statusCreditos === "true") {
            window.location.reload();
       
        }
        return (
            <div className="center">
            <HeaderDEyAE />
                <DirectorioAlumno />
                        <div id="sidebar" className="servicioLeft">
                            <div>
                                <label htmlFor="creditos" className="text_login">Porcentaje de Creditos</label>
                                <input type="text" className="input_login" name="creditos" placeholder="Ingresa el % de creditos sin decimales" ref={this.creditosRef} onChange={this.changeState}/>
                                     
                            </div>
                            <br></br>
                            {(() => {
                                switch(this.state.estado){
                                    case "NUEVO":
                                    return (
                                        <button className="btn" onClick = {this.saveDictamen}>Aceptar</button>
                                    );
                                    case undefined:
                                    return (
                                        <button className="btn" onClick = {this.saveDictamen}>Aceptar</button>
                                    );
                                    case null:
                                    return (
                                        <button className="btn" onClick = {this.saveDictamen}>Aceptar</button>
                                    );
                                    default:
                                        break;
                                }
                            })()} 
                          </div>
                          <SubirDictamen/>
                          <VerDatosDictamen/>
                          <Footer/>
              
            </div>
           
           
        );
         
        
     
      
                        
    }
}
export default Dictamen;
