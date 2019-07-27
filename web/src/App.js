import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import ApplianceInputForm from './components/ApplianceInputForm';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            detail: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        if (!data.detail) {
            this.setState({ detail: true });
        }
    }

    render() {
        return (
            <div className="App">
                <Header />

                <ApplianceInputForm detail={ this.state.detail } handleSubmit={ this.handleSubmit } />
            </div>
        );
    }
}

export default App;
