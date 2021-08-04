import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DirectorioAdmin from './DirectorioAdmin';
import ObtenerAlumnoPorIdAlumno from './ObtenerAlumnoPorIdAlumno';
class BuscarServicioAlumnos extends Component {

    estadoRef = React.createRef();

    state = {
        servicios: [],
        status: null,
        statusEstado: null,
        estado: null
    };

    componentWillMount() {
        this.getServicios();
    }

    getServicios = () => {
        axios.get("servicioSocial/findAll")
            .then(response => {
                this.setState({
                    servicios: response.data,
                    status: 'success',
                    statusEstado: "TODOS"
                });
            });
    }//Fin de getServicios

    changeState = () => {
        this.setState({
            estado: this.estadoRef.current.value
        });
    }

    cambiarEstado = () => {
        if (this.state.estado === "NUEVO") {
            this.getNew();
        } else if (this.state.estado === "PROCESANDO") {
            this.getProcessing();
        } else if (this.state.estado === "FINALIZADO") {
            this.getFinished();
        } else if (this.state.estado === "RECHAZADO") {
            this.getRejected();
        } else if (this.state.estado === "TODOS") {
            this.getServicios();
        }
    }



    render() {

        return (
            <React.Fragment>
                <DirectorioAdmin />
                <h1 className="text-center"><strong >Registro para realizar el Servicio Social</strong></h1>
                <br></br>
                <a download href={"/alumno/export/NUEVO"} id="btn_downLoad">Exportar CSV para constancias de créditos</a>
                <br /><br />
                <table>
                    <tbody>
                        <tr>
                            <th className="table_lista, table_title">Nombre</th>
                            <th className="table_lista, table_title">Boleta</th>
                            <th className="table_lista, table_title">Programa Académico</th>
                            <th className="table_lista, table_title">Semestre</th>
                            <th className="table_lista, table_title">1</th>
                            <th className="table_lista, table_title">2</th>
                            <th className="table_lista, table_title">3</th>
                            <th className="table_lista, table_title">4</th>
                            <th className="table_lista, table_title">Revisado por</th>
                        </tr>
                    </tbody>
                    <React.Fragment>
                        {this.state.servicios.map((servicio, i) =>
                            <tbody key={i}>
                                <tr>
                                    <ObtenerAlumnoPorIdAlumno
                                        idAlumno={servicio.idAlumno}
                                    />
                                    <td className="table_lista">{servicio.semestre}</td>
                                    <td className="table_lista" style={{ maxWidth: '60px' }}>
                                        {(() => {
                                            switch (servicio.estado) {
                                                case "NUEVO":
                                                    return (
                                                        <a id="state_new">----</a>
                                                    );
                                                    break;
                                                case "PROCESANDO":
                                                    return (
                                                        <a id="state_processing">----</a>
                                                    );
                                                    break;
                                                case "FINALIZADO":
                                                    return (
                                                        <a id="state_finished">OK</a>
                                                    );
                                                case "RECHAZADO":
                                                    return (
                                                        <a id="state_rejected">XX</a>
                                                    )

                                            }
                                        })()}</td>
                                    <td className="table_lista" style={{ maxWidth: '60px' }}>
                                        {(() => {
                                            switch (servicio.estadoFechas) {
                                                case "NUEVO":
                                                    return (
                                                        <a id="state_new">----</a>
                                                    );
                                                case "FINALIZADO":
                                                    return (
                                                        <a id="state_finished">OK</a>
                                                    )

                                            }
                                        })()}
                                    </td>
                                    <td className="table_lista" style={{ maxWidth: '60px' }}>
                                        {(() => {
                                            switch (servicio.documentos) {
                                                case "ok":
                                                    return (
                                                        <a id="state_finished">OK</a>
                                                    );
                                                case "flase":
                                                    return (
                                                        <a id="state_rejected">XX</a>
                                                    )
                                            }
                                        })()}
                                    </td>
                                    <td className="table_lista" style={{ maxWidth: '60px' }}>
                                        {(() => {
                                            switch (servicio.cartaCompromiso) {
                                                case "ok":
                                                    return (
                                                        <a id="state_finished">OK</a>
                                                    );
                                                case "flase":
                                                    return (
                                                        <a id="state_rejected">XX</a>
                                                    )
                                            }
                                        })()}
                                    </td>
                                    {(() => {
                                        switch (servicio.estado) {
                                            case "NUEVO":
                                                return (
                                                    <th className="table_lista">NO REVISADO</th>
                                                );
                                                break;
                                            default:
                                                return (
                                                    <th className="table_lista">{servicio.revisado}</th>
                                                );
                                                break;
                                        }
                                    })()}

                                </tr>
                            </tbody>
                        )
                        }
                    </React.Fragment>



                </table>
            </React.Fragment>
        );

    }//Fin de Render
}//Fin de Class BuscarServicioAlumnos
export default BuscarServicioAlumnos;