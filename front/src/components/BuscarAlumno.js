import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DirectorioAdmin from './DirectorioAdmin';
class BuscarAlumno extends React.Component {



    nombreRef = React.createRef();

    state = {
        alumnos: [],
        nombre: "",
        status: null,
        statusAlumno: null
    };

    changeState = () => {
        this.setState({
                nombre: this.nombreRef.current.value.toUpperCase()
        });
    }

    searchAlumno = (e) => {
        this.changeState();
        if(this.nombreRef.current.value && this.nombreRef.current.value !== null && this.nombreRef.current.value !== undefined)
        {
            axios.get( "alumno/findNombre/" + this.state.nombre)
            .then(res => {
                this.setState(
                    {
                        alumnos:res.data,   
                    });
            })
            .then(res => {
                if(this.state.alumnos.length >=1){
                    this.setState(
                        {
                            status: 'success',
                            statusAlumno: "true"
                        });
                }else{
                    this.setState(
                        {
                            status: null,
                            statusAlumno: "false"
                        });
                }
            })
            .catch(error => {
                this.setState({
                    statusAlumno: "false",
                    status:null
                    });
            });
        }else{
            this.setState({
                    statusAlumno: "false",
                    status: "false"     
                });
        }
        
    }//Fin de searchAlumno

    render() {
        
        if(this.state.status === 'success'){
            return (
                <div className="center">
                    <DirectorioAdmin />
                            <div className="form-group" >
                                <h1><strong>Buscar Alumno por Nombre</strong></h1>
                                <br></br>
                                <input type="text"  className="input_login" name="nombre" placeholder="Ingresa aquí el nombre" ref={this.nombreRef} onChange={this.changeState} />
                            </div>
                            {(() => {
                                    switch (this.state.statusAlumno) {
                                   case "false":
                                       return (
                                           <a className="warning_search">¡Nombre incorrecto!</a>
                                       );
                                       break;
                                    default:
                                        break;
                                    }
                            })()}
                            <br/>
                           <button className="btn" onClick = {this.searchAlumno}>BUSCAR</button>
                           <br/><br/>
                                <table>
                                    <tbody >
                                        <tr >
                                            <th className="table_lista, table_title">Alumno</th>
                                            <th className="table_lista, table_title">Boleta</th>
                                            <th className="table_lista, table_title">Programa Académico</th>
                                        </tr>
                                    </tbody>
                                {this.state.alumnos.map((alumno, i) =>
                                    <tbody key={i}>
                                        <tr>
                                            <td className="table_lista">{alumno.apellidoPaterno} {alumno.apellidoMaterno} {alumno.nombre}</td>
                                            <td className="table_lista">{alumno.boleta}</td>
                                            <td className="table_lista">{alumno.programaAcademico}</td>
                                            <td><Link to={'/admin/DirectorioArchivosAlumno/' + alumno.idAlumno} id="btn_watch">Ver Archivos</Link></td>
     
                                        </tr>
                                    </tbody>
                                )}
                                </table>
                </div>
            );
        }
        return (
            <div className="center">
                <DirectorioAdmin />
                        <div className="form-group" >
                            <h1><strong>Buscar Alumno por Nombre</strong></h1>
                            <br></br>
                            <input type="text"  className="input_login" name="nombre" placeholder="Ingresa aquí el nombre" ref={this.nombreRef} onChange={this.changeState} />
                        </div>
                        {(() => {
                                switch (this.state.statusAlumno) {
                               case "false":
                                   return (
                                       <a className="warning_search">¡Nombre incorrecto!</a>
                                   );
                                }
                        })()}
                        <br/>
                       <button className="btn" onClick = {this.searchAlumno}>BUSCAR</button>
            </div>
        );
    }//Fin de Render
    
}//Fin de Buscar Alumno
export default BuscarAlumno;