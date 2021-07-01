import React from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';



class PdfBajaAlumno extends React.Component{


      
        state={
            alumno: {},
            tipoBaja: {},
            text:"",
            text2:""
        }

        componentWillMount = () =>{
            this.generarPdf();
        }

        generarPdf =  () =>{
            axios.get("alumno/find/" + this.props.idAlumno)
                .then(res => {
                    this.setState({
                        alumno: res.data
                })
               console.log(this.state.alumno.nombre)
            })
            .then(res =>{
                this.setState({
                 text: ["Por este medio, el C." + this.state.alumno.nombre + " " + this.state.alumno.apellidoPaterno + " " + this.state.alumno.apellidoMaterno + " con número de boleta: " + this.state.alumno.boleta + 
                 "," + this.props.redaccion + "del programa acedémico de " + this.state.alumno.programaAcademico + ", de la Unidad Académica ESIME Zacatenco."],
                 text2:[
                    "Solicito de la manera mas atenta su autorización para tramitar la " + this.props.tipoDeBaja + " ("+ this.props.horas +" Horas) " +
                    "de mi servicio social por motivos personales, el cual se lleva a cabo con el prestatario: " + this.props.prestatario + ", en el programa: " + this.props.programaSS + ", durante el periodo del " +
                    this.props.fechaInicio + " al " + this.props.fechaTermino + ", con número de registro: " + this.props.registroSS + "."]
                })
            })
            /* 
            .then(res =>{
                this.setState({
                    text2:[
                        "Solicito de la manera mas atenta su autorización para tramitar la " + this.state.tipoBaja.tipoDeBaja + " ("+ this.state.tipoBaja.horas +" Horas) " +
               "de mi servicio social por motivos personales, el cual se lleva a cabo con el prestatario: " + this.state.tipoBaja.prestatario + ", en el programa: " + this.state.tipoBaja.programaSS + ", durante el periodo del " +
               this.state.tipoBaja.fechaInicio + " al " + this.state.tipoBaja.fechaTermino + ", con número de registro: " + this.state.tipoBaja.registroSS + "."]
                })
            })
            */
           
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

        doc.text( 300,125, "SOLICITUD DE BAJA", 'center');
        doc.setFontSize(11);
        doc.text(320,210,"Ciudad de México " + fecha)
        doc.setFontSize(12);
        doc.text(50,250, "COMISIÓN DE SERVICIO SOCIAL");
        doc.text(50,265, "PRESENTE.");
        doc.setFontSize(12);

        doc.text(this.state.text, 50,320 , {maxWidth: 500, align: "justify"});
        doc.text("Solicito de la manera mas atenta su autorización para tramitar la " + this.props.baja + " ("+ this.props.horas +" Horas) " +
        "de mi servicio social por motivos personales, el cual se lleva a cabo con el prestatario: " + this.props.prestatario + ", en el programa: " + this.props.programaSS + ", durante el periodo del " +
        this.props.fechaInicio + " al " + this.props.fechaTermino + ", con número de registro: " + this.props.registroSS + ".", 50,380 , {maxWidth: 500, align: "justify"});
        //doc.text(this.state.text2, 50,380 , {maxWidth: 500, align: "justify"});
        doc.text("Sin otro en particular, aprovecho para mandar un cordial saludo.", 50, 480 , {maxWidth: 500, align: "justify"});

        doc.text("ATENTAMENTE", 295,550, 'center');
        doc.text(290 ,650, this.state.alumno.nombre+" "+this.state.alumno.apellidoPaterno+" "+this.state.alumno.apellidoMaterno, 'center');
        doc.setFontSize(10);
        doc.text(295,670, this.props.email,'center');
        doc.save("Baja.pdf") 
    }
    render(){
        return(
            <div>
               <button className="btn" onClick = {this.jspdfGenerator} >generar pdf</button>
            </div>
        );
    }
}
export default PdfBajaAlumno;
