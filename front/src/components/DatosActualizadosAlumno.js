import React from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

class DatosActualizadosAlumno extends React.Component {


    nombreRef = React.createRef();
    apellidoPaternoRef = React.createRef();
    apellidoMaternoRef = React.createRef();
    boletaRef = React.createRef();
    programaAcademicoRef = React.createRef();
    sexoRef = React.createRef();
    idUsuarioRef = React.createRef();
    cookiesBoletaRef = React.createRef();
    cookiesBoletaRef = cookies.get('boleta');

    state = {
        alumno: {},
        idUsuario: cookies.get('idUsuario'),
        idAlumno: cookies.get('idAlumno'),
        statusNombre: null,
        statusBoleta: this.props.statusBoleta, 
        statusBtnCancel: this.props.statusBtnCancel,    
        statusApellidoPaterno: null,
        statusApellidoMaterno: null,
        status: "null",
        boletaExiste: null,
        existe: false
    };

    changeState = () => {
        this.setState({
            alumno: {
                nombre: this.nombreRef.current.value.toUpperCase(),
                apellidoPaterno: this.apellidoPaternoRef.current.value.toUpperCase(),
                apellidoMaterno: this.apellidoMaternoRef.current.value.toUpperCase(),
                boleta: this.boletaRef.current.value,
                programaAcademico: this.programaAcademicoRef.current.value,
                sexo: this.sexoRef.current.value,
                idUsuario: this.state.idUsuario,
                idAlumno: this.state.idAlumno
            }
        });
    }

    saveAlumno = async (e) => {
        this.changeState();
        if (this.state.alumno.nombre && this.state.alumno.nombre !== null && this.state.alumno.nombre !== undefined) {
            if (this.state.alumno.apellidoPaterno && this.state.alumno.apellidoPaterno !== null && this.state.alumno.apellidoPaterno !== undefined) {
                if (this.state.alumno.apellidoMaterno && this.state.alumno.apellidoMaterno !== null && this.state.alumno.apellidoMaterno !== undefined) {
                    if (this.state.alumno.boleta.length === 10) {
                       
                        axios.patch("alumno/update", this.state.alumno)
                            .then(res => {
                                this.setState({
                                    status: "true"
                                });
                            });

                    } else {
                        this.setState(
                            {
                                statusBoleta: "false",
                                statusApellidoMaterno: "true",
                                statusApellidoPaterno: "true",
                                statusNombre: "true",
                                boletaExiste: "false"

                            }
                        );
                    }//Fin de else Boleta
                } else {
                    this.setState(
                        {
                            statusApellidoMaterno: "false",
                            statusApellidoPaterno: "true",
                            statusNombre: "true"
                        }
                    );
                }//Fin de else Apellido Materno
            } else {
                this.setState(
                    {
                        statusApellidoPaterno: "false",
                        statusNombre: "true"
                    }
                );
            }//Fin de else Apellido Paterno
        } else {
            this.setState(
                {
                    statusNombre: "false"
                }
            );
        }//Fin de else NOMBRE
    }//Fin de funcion saveAlumno()

    render() {
        const {cancel} = this.props
        if (this.state.status === 'true') {
            window.location.reload(false);

        }

        return (
            <div className="center">
                <div id="sidebar" className={this.props.clase}>
                <br/>
                <strong>Actualizar información personal </strong>
                    <div>
                        <label htmlFor="nombre" className="text_login">Nombre(s)</label>
                        <input type="text" className="input_login" name="nombre" ref={this.nombreRef}
                               placeholder="Nombre(s)" onChange={this.changeState}/>
                        {(() => {
                            switch (this.state.statusNombre) {
                                case "false":
                                    return (
                                        <a className="warning">¡Ingresa tu nombre!</a>
                                    );
                                    break;
                                default:
                                    break;
                            }
                        })()}
                    </div>
                    <div>
                        <label htmlFor="apellidoPaterno" className="text_login">Apellido Paterno</label>
                        <input type="text" className="input_login" name="apellidoPaterno" ref={this.apellidoPaternoRef}
                               placeholder="Apellido Paterno" onChange={this.changeState}/>
                        {(() => {
                            switch (this.state.statusApellidoPaterno) {
                                case "false":
                                    return (
                                        <a className="warning">¡Ingresa tu Apellido Paterno!</a>
                                    );
                                    break;
                                default:
                                    break;
                            }
                        })()}
                    </div>
                    <div>
                        <label htmlFor="apellidoMaterno" className="text_login">Apellido Materno</label>
                        <input type="text" className="input_login" name="apellidoMaterno" ref={this.apellidoMaternoRef}
                               placeholder="Apellido Materno" onChange={this.changeState}/>
                        {(() => {
                            switch (this.state.statusApellidoMaterno) {
                                case "false":
                                    return (
                                        <a className="warning">¡Ingresa tu Apellido Materno!</a>
                                    );
                                    break;
                                default:
                                    break;
                            }
                        })()}
                    </div>
                    <div>

                        {(() => {
                            switch (this.state.statusBoleta) {
                                case "false":
                                    return (
                                        <div>
                                        <label htmlFor="boleta" className="text_login">Boleta</label>
                                        <input type="text" className="input_login" name="boleta" ref={this.boletaRef}
                                               placeholder="Número de Boleta" onChange={this.changeState}/>
                                        <a className="warning">¡Ingresa tu boleta con solo 10 números!</a>
                                        </div>
                                    );
                                    break;
                                default:
                                    break;
                            }
                        })()}
                        {(() => {
                            switch (this.state.boletaExiste) {
                                case "true":
                                    return (
                                        <a className="warning">¡Esta boleta ya fue registrada!</a>
                                    );
                                    break;
                                default:
                                    break;
                            }
                        })()}
                    </div>
                    <div>
                        <label htmlFor="programa" className="text_login">Programa Academico</label>
                        <select name="programa" className="input_login" ref={this.programaAcademicoRef}
                                onChange={this.changeState}>
                            <option value="INGENIERÍA EN CONTROL Y AUTOMATIZACIÓN">INGENIERÍA EN CONTROL Y
                                AUTOMATIZACIÓN
                            </option>
                            <option value="INGENIERÍA EN COMUNICACIONES Y ELECTRÓNICA">INGENIERÍA EN COMUNICACIONES Y
                                ELECTRÓNICA
                            </option>
                            <option value="INGENIERÍA ELÉCTRICA">INGENIERÍA ELÉCTRICA</option>
                            <option value="INGENIERÍA FOTÓNICA">INGENIERÍA FOTÓNICA</option>
                            <option value="INGENIERÍA EN SISTEMAS AUTOMOTRICES">INGENIERÍA EN SISTEMAS AUTOMOTRICES
                            </option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sexo" className="text_login">Sexo</label>
                        <select name="sexo" className="input_login" ref={this.sexoRef} onChange={this.changeState}>
                            <option value="MASCULINO">MASCULINO</option>
                            <option value="FEMENINO">FEMENINO</option>
                        </select>
                    </div>
                    <br/>
                    <button className="btn" onClick={this.saveAlumno}>Aceptar</button>
                    {(() => {
                        switch (this.state.statusBtnCancel) {
                            case "true" :
                                return (
                                     <button  className ="btnCancel" onClick={cancel} >Cancelar</button>
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

export default DatosActualizadosAlumno;
