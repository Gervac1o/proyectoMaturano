import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Route, Switch, HashRouter} from 'react-router-dom';

import Error from './components/Error';
import ListaAlumnos from './components/ListaAlumnos';
import BuscarAlumno from './components/BuscarAlumno';
import CrearAdmin from './components/CrearAdmin';
import Dictamen from './components/Dictamen';
import Liberacion from './components/Liberacion';
import Baja from './components/Baja';
import ServicioSocial from './components/ServicioSocial';
import DatosAlumno from './components/DatosAlumno';
import MisDatosAlumno from './components/MisDatosAlumno';
import MisDatosAdmin from './components/MisDatosAdmin';
import DocDictamen from './components/DocDictamen';
import PdfDictamen from './components/PdfDictamen';
import DocBaja from './components/DocBaja';
import PdfBaja from './components/PdfBaja';
import DocLiberacion from './components/DocLiberacion';
import PdfLiberacion from './components/PdfLiberacion';
import DocServicio from './components/DocServicio';
import PdfServicio from './components/PdfServicio';
import BuscarICE from './components/BuscarICE';
import BuscarICA from './components/BuscarICA';
import BuscarIE from './components/BuscarIE';
import BuscarIF from './components/BuscarIF';
import BuscarISISA from './components/BuscarISISA';
import ValidacionAlumno from './components/ValidacionAlumno';
import DirectorioArchivosAlumno from './components/DirectorioArchivosAlumno';
import BuscarBoleta from './components/BuscarBoleta';
import BuscarDictamenAlumnos from './components/BuscarDictamenAlumnos';
import BuscarBajaAlumnos from './components/BuscarBajaAlumnos';
import BuscarLiberacionAlumnos from './components/BuscarLiberacionAlumnos';
import BuscarServicioAlumnos from './components/BuscarServicioAlumnos';
import Default from "./components/Default";
import ListaStatus from './components/ListaStatus';
import ListaAdministradores from './components/ListaAdministradoes';

ReactDOM.render(
    <React.StrictMode>
        <HashRouter basename={'/'}>

            <Switch>
                {/**RUTA DEFAULT QUE EVALUA HACIA DONDE SE REDIRIGE  */}
                <Route exact path="/" component={Default}/>

                {/**RUTAS ADMINISTRADOR  */}

                {/**RUTA PRINCIPAL  */}<Route exact path="/admin/MisDatosAdmin" component={MisDatosAdmin}/>
                <Route exact path="/admin/Lista" component={ListaAlumnos}/>
                <Route exact path="/admin/Validar" component={ListaStatus}/>
                <Route exact path="/admin/Admins" component={ListaAdministradores}/>
                <Route exact path="/admin/BuscarNombre" component={BuscarAlumno}/>
                <Route exact path="/admin/BuscarBoleta" component={BuscarBoleta}/>
                <Route exact path="/admin/Crearadmin" component={CrearAdmin}/>
                <Route exact path="/admin/BuscarICE" component={BuscarICE}/>
                <Route exact path="/admin/BuscarICA" component={BuscarICA}/>
                <Route exact path="/admin/BuscarIE" component={BuscarIE}/>
                <Route exact path="/admin/BuscarIF" component={BuscarIF}/>
                <Route exact path='/admin/BuscarISISA' component={BuscarISISA}/>
                <Route exact path="/admin/BuscarDictamen" component={BuscarDictamenAlumnos}/>
                <Route exact path="/admin/BuscarBaja" component={BuscarBajaAlumnos}/>
                <Route exact path="/admin/BuscarLiberacion" component={BuscarLiberacionAlumnos}/>
                <Route exact path="/admin/BuscarServicio" component={BuscarServicioAlumnos}/>
                <Route exact path="/admin/DirectorioArchivosAlumno/:id" component={DirectorioArchivosAlumno}/>


                {/**RUTAS USUARIO  */}

           
                <Route exact path="/user/MisDatosAlumno" component={MisDatosAlumno}/>

                <Route exact path="/user/CrearDictamen" component={Dictamen}/>
                <Route exact path="/user/CrearLiberacion" component={Liberacion}/>
                <Route exact path="/user/CrearBaja" component={Baja}/>
                <Route exact path="/user/CrearServicio" component={ServicioSocial}/>

                {/**esta ruta lleva a llenar un frmulario de nuevo usuario */}
                <Route exact path="/user/DatosAlumno" component={DatosAlumno}/>


                {/**RUTAS PARA LOS DOCUMENTOS, LAS COMPARTEN AMBAS PARTES  */}

                <Route exact path="/doc/DocDictamen/:doc" component={DocDictamen}/>
                <Route exact path="/doc/DocLiberacion/:doc" component={DocLiberacion}/>
                <Route exact path="/doc/DocBaja/:doc" component={DocBaja}/>
                <Route exact path="/doc/DocServicio/:doc" component={DocServicio}/>

                <Route exact path="/doc/PdfDictamen/:doc" component={PdfDictamen}/>
                <Route exact path="/doc/PdfBaja/:doc" component={PdfBaja}/>
                <Route exact path="/doc/PdfLiberacion/:doc" component={PdfLiberacion}/>
                <Route exact path="/doc/PdfServicio/:doc" component={PdfServicio}/>

                {/**esta ruta lleva a llenar un frmulario de nuevo usuario */}
                <Route exact path="/user/ValidacionAlumno" component={ValidacionAlumno}/>
                <Route component={Error}/>
                

            </Switch>


        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();