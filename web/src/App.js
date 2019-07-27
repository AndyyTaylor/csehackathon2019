import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer';
import DetailView from './components/DetailView';
import ApplianceInputForm from './components/ApplianceInputForm';
import ResultsRow from './components/ResultsRow';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            detail: false,
            screen: 'inputform',
            selectedInd: 0,
            loading: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(data) {
        if (!data.detail) {
            // TODO find api
            // 200 + json
            // 4040
            this.setState({ loading: true });
            axios.post('http://localhost:5000/find', {
                type: data.type,
                model: data.model,
                company: data.company
            }).then((response) => {
                console.log(response);

                const fridge = response.data;
                fridge.type = data.type;
                axios.post('http://localhost:5000/suggest',
                    fridge
                ).then((response) => {
                    console.log('suggest');
                    console.log(response);

                    this.setState({ suggested: response.data[0], screen: 'results' });
                }).catch((error) => {
                    console.log('suggest');
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);

                this.setState({ detail: true });
            }).finally(() => {
                this.setState({ loading: false });
            });
        }
    }

    render() {
        const pageBody = [];
        if (this.state.screen == 'inputform') {
            pageBody.push(<ApplianceInputForm loading={ this.state.loading } detail={ this.state.detail } handleSubmit={ this.handleSubmit } />);
        } else if (this.state.screen == 'results') {
            console.log(this.state.suggested);
            pageBody.push(<DetailView appliance={ this.state.suggested[this.state.selectedInd] } />);
            pageBody.push(<ResultsRow onSelectAppliance={(i) => this.setState({ selectedInd: i }) } appliances={ this.state.suggested } />);
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
