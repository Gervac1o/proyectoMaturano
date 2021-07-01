import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import MisDatosAlumno from './MisDatosAlumno';
import ValidacionAlumno from './ValidacionAlumno';

const cookies = new Cookies();

class Default extends React.Component {

  state = {
    status: 'false',
    idUsuario: cookies.get('idUsuario')
  }


  componentDidMount= () =>{

    }

    componentWillMount=()=>{
      this.getUsuario()

    }

    
    getUsuario = () => {
      axios.get("usuario/find/" + this.state.idUsuario)
      .then(res => {
          this.setState({
              status: res.data.status,
              
          });
      });
      console.log(this.state.status)
  }

    render() {

      if (cookies.get('tipoUsuario') === 'true') {
        
         
        return <Redirect to="/admin/MisDatosAdmin"></Redirect>
          

      
      }
      else{
        return(
         
          <div>
                      {(() => {
            switch (this.state.status) {
              case true:
                return(
               <div>
                <MisDatosAlumno/>
              </div>
               );
              break;
              case false:
               return(
               <div>
               <ValidacionAlumno/>
               </div>
               );
              break;
              case null:
                return(
                <div>
                <ValidacionAlumno/>
                </div>             
               );
               break;
               default:
                 break;
        
            }

          })()}
          </div>
         
        
        );
    
      }
      
    }
}
export default Default;
