import React from 'react';
import axios from 'axios';
import jspdf, { jsPDF } from 'jspdf';



class PdfServicioAlumno extends React.Component{


      
        state={
            alumno: {},
            text:"",
            text2:""
        }

        componentWillMount = () =>{
            this.generarPdf();
        }

        generarPdf =  () =>{
            axios.get(this.url + "alumno/find/" + this.props.idAlumno)
                .then(res => {
                    this.setState({
                        alumno: res.data
                })
               console.log(this.state.alumno.nombre)
            })
            .then(res =>{
                this.setState({
                 text: ["Por este medio, el C." + this.state.alumno.nombre + " " + this.state.alumno.apellidoPaterno + " " + this.state.alumno.apellidoMaterno + " con número de boleta: " + this.state.alumno.boleta + 
                 "," + this.props.redaccion + "del programa acedémico de " + this.state.alumno.programaAcademico + 
                 ", de la Unidad Académica ESIME Zacatenco."]
                })
            })
            .then(res =>{
                this.setState({
                    text2:[
                        "Solicito de la manera mas atenta su autorización para tramitar la CONSTANCIA DE CREDITOS, para comenzar mi pre-registro de servicio social" + 
                        " ya que cuento con responsable directo: " + this.props.responsable +"."]
                })
            })
           
           //hacer todo mayusculas
           //var luis = this.state.nombre;
           //var l= luis.toUpperCase();
           //console.log(l);
          // console.log(this.state.text);
        }

    jspdfGenerator=()=>{
        var doc = new jsPDF('p', 'pt');
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var fecha = new Date().toLocaleDateString(undefined, options);
        

        doc.text( 300,125, "SOLICITUD DE CONSTANCIA DE CREDITOS", 'center');
        doc.setFontSize(11);
        doc.text(320,210,"Ciudad de México " + fecha)
        doc.setFontSize(12);
        doc.text(50,250, "COMISIÓN DE SERVICIO SOCIAL");
        doc.text(50,265, "PRESENTE.");
        doc.setFontSize(12);

        doc.text(this.state.text, 50,320 , {maxWidth: 500, align: "justify"});
        doc.text(this.state.text2, 50,380 , {maxWidth: 500, align: "justify"});
        doc.text("Sin otro en particular, aprovecho para mandar un cordial saludo.", 50, 460 , {maxWidth: 500, align: "justify"});

        doc.text("ATENTAMENTE", 295,550, 'center');
        doc.text(290 ,650, this.state.alumno.nombre+" "+this.state.alumno.apellidoPaterno+" "+this.state.alumno.apellidoMaterno, 'center');
        doc.setFontSize(10);
        doc.text(295,670, this.props.email,'center');
        doc.save("SolicitudConstanciaCreditos.pdf") 
    }
    render(){
        return(
            <div>
               <button className="btn" onClick = {this.jspdfGenerator} >generar pdf</button>
            </div>
        );
    }
}
export default PdfServicioAlumno;
