import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import ApplianceInputForm from './components/ApplianceInputForm';

function App() {
    return (
        <div className="App">
            <Header />

            <ApplianceInputForm detail />
        </div>
    );
}

export default App;
