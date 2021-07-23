import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class confirmarCarta extends React.Component {


    state = {
        idAlumno: cookies.get('idAlumno'),
        servicio:{},
        status:"false",
    };
    componentWillMount = () =>{
      this.searchServicio();
       
    }
    searchServicio = () => {
        if(this.state.idAlumno !== null ){
            axios.get("servicioSocial/findIdAlumno/"+ this.state.idAlumno)
            .then(res =>{
                this.setState({
                    servicio:{
                        idServicio:res.data.idServicio,
                        lugar:res.data.lugar,
                        responsableDirecto: res.data.responsableDirecto,
                        nombrePrograma: res.data.nombrePrograma,
                        estadoFechas:res.data.estadoFechas,
                        estado: res.data.estado,
                        fechaRegistro:res.datafechaRegistro,
                        fechaInicio: res.data.fechaInicio,
                        fechaFin: res.data.fechaFin,
                        revisado: res.data.revisado,
                        documentos:"ok",
                        cartaCompromiso:"ok"
                    }
                });
            })
        }
    }

    confirmarCarta = (e) => {
        if(this.state.servicio.idServicio !== null){
                    axios.patch( "servicioSocial/update", this.state.servicio)
        .then(res => {
            this.setState(
                {
                    status: "true"
                }
            );
        });
        }

        
        
    
     
}
    render() {
        if(this.state.status === 'true'){
            window.location.reload(false);
        }
        return(
           

                    
                        <div className="center">
                        <button className="btn" onClick = {this.confirmarCarta}>Confirmar Carta Compromiso</button>
                        </div>
                    
  
        );
        }
}
export default confirmarCarta;
