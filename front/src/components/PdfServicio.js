import React from 'react';
import {PDFReader} from 'reactjs-pdf-view';

class PdfServicio extends React.Component {

    state = {
        docServicio: "",
        status: null
    };
    componentWillMount = () => {
        const {match: {params}} = this.props;
        var doc = params.doc;
        this.setState({
            docServicio: doc,
            status: "true"
        })
    }

    render() {
        return (
            <div>
                <PDFReader
                    url={"docServicio/getDoc/" + this.state.docServicio}
                    showAllPage="true">
                </PDFReader>
            </div>
        );
    }
}

export default PdfServicio;