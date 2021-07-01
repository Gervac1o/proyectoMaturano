import React, { Component } from 'react';

class DocDictamen extends Component{



    state = {
        docDictamen: "",
        status: null
    };
        componentWillMount = () => {
            const { match: { params } } = this.props;
            var doc = params.doc;
            this.setState({
                    docDictamen: doc,
                    status: "true"
            })
        }
    render() {
        if(this.state.status === "true"){
            return(
                <div>
                        <a download  href={"https://proyectofinal1986.herokuapp.com/docDictamen/getDoc/" + this.state.docDictamen}>*</a>
                </div>
            );
        }
    }//Fin de Render ()
}//Fin de Classs DocDictamen

export default DocDictamen;
