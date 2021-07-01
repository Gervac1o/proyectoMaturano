import React from 'react';
import { PDFReader  } from 'reactjs-pdf-view';


class PdfBaja extends React.Component {


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
    render(){
        return(
            <div>
            <PDFReader 
               url ={"docBaja/getDoc/" + this.state.docBaja}
              showAllPage="true"
            >
            </PDFReader >
          
          </div>
        );
    }
}
export default PdfBaja;