import React, { Component } from 'react';

class DocLiberacion extends Component{



    state = {
        docLiberacion: "",
        status: null
    };
        componentWillMount = () => {
            const { match: { params } } = this.props;
            var doc = params.doc;
            this.setState({
                    docLiberacion: doc,
                    status: "true"
            })
            console.log("VALOR DE DOC LIBERACION" + this.state.docLiberacion)
        }
    render() {
        if(this.state.status === "true"){
            return(
                <div>
                        <iframe  src={"http://localhost:8080/docLiberacion/getDoc/" + this.state.docLiberacion}></iframe>
                </div>
            );
        }
    }//Fin de Render ()
}//Fin de Classs DocLiberacion

export default DocLiberacion;