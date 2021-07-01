import React from 'react';
import { PDFReader  } from 'reactjs-pdf-view';


class PdfLiberacion extends React.Component {

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
    }
    render(){
        return(
            <div>
            <PDFReader 
               url ={"docLiberacion/getDoc/" + this.state.docLiberacion}
              showAllPage="true"
            >
            </PDFReader >
          
          </div>
        );
    }
}
export default PdfLiberacion;