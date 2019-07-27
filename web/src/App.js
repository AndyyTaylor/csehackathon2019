import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import ApplianceInputForm from './components/ApplianceInputForm';
import ResultsRow from './components/ResultsRow';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            detail: false,
            screen: 'results'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        if (!data.detail) {
            // TODO find api
            this.setState({ detail: true });
        }
    }

    render() {
        const pageBody = [];
        if (this.state.screen == 'inputform') {
            pageBody.push(<ApplianceInputForm detail={ this.state.detail } handleSubmit={ this.handleSubmit } />);
        } else if (this.state.screen == 'results') {
            pageBody.push(<ResultsRow />);
        }

        return (
            <div className="App">
                <Header />

                { pageBody }

                {/* <ApplianceInputForm detail={ this.state.detail } handleSubmit={ this.handleSubmit } />
                <DetailView/> */}
                <Footer/>
            </div>
        );
    }
}

export default App;
