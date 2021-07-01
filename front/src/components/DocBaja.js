import React, { Component } from 'react';

class DocBaja extends Component{



    state = {
        docBaja: "",
        status: null
    };
        componentWillMount = () => {
            const { match: { params } } = this.props;
            var doc = params.doc;
            this.setState({
                    docBaja: doc,
                    status: "true"
            })
        }
    render() {
        if(this.state.status === "true"){
            return(
                <div>
                        <iframe  src={ "http://localhost:8080/docBaja/getDoc/" + this.state.docBaja}></iframe>
                </div>
            );
        }
    }//Fin de Render ()
}//Fin de Classs DocBaja

export default DocBaja;