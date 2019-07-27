
import React, { Component } from 'react';


class ApplianceInputForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            energyCost: undefined,
            company: undefined,
            model: undefined,
            type: "fridge",
            stars: 0,
            length: 0,
            width: 0,
            height: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    handleChange(e, key) {
        const newState = JSON.parse(JSON.stringify(this.state));

        newState[key] = e.target.value;

        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('submitted');
        console.log(this.state);

        this.setState({ detail: this.props.detail });

        this.props.handleSubmit(this.state);
    }

    isFormValid() {
        if (!this.detail) {
            return this.state.type && this.state.model && this.state.company;
        }

        return true;
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>

              <div className="appliance_deets">
                <h1>Please enter your appliance details:</h1>
                <div className="blankspace">
                </div>
                <div className="appliance_container">
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label text-justify">Energy Cost</label>
                        <div className="col-sm-8">
                            <input type="number" className="form-control" value={ this.state.energyCost } onChange={ (e) => this.handleChange(e, 'energyCost') } />
                            <small className="form-text text-muted">If you don't know it, leave it blank :))</small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label text-justify">Type</label>
                        <div className="col-sm-8">
                            <select className="form-control" value={ this.state.type }>
                                <option value="fridge">Fridge</option>
                                <option value="dishwasher">Dishwasher</option>
                                <option value="microwave">Microwave</option>
                                <option value="airconditioner">Air Conditioner</option>
                                <option value="dryer">Dryer</option>
                                <option value="tv">Television</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label text-justify">Residing State</label>
                      <div className="col-sm-8">
                          <select className="form-control" value={ this.state.type }>
                              <option value="nsw">NSW</option>
                              <option value="qld">QLD</option>
                              <option value="nt">NT</option>
                              <option value="wa">WA</option>
                              <option value="sa">SA</option>
                              <option value="vic">VIC</option>
                              <option value="act">ACT</option>
                              <option value="tas">TAS</option>
                          </select>
                        </div>
                    </div>

                    {   !this.props.detail &&
                        <>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Company</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" value={ this.state.company } onChange={ (e) => this.handleChange(e, 'company') } />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Model</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" value={ this.state.model } onChange={ (e) => this.handleChange(e, 'model') } />
                            </div>
                        </div>
                        </>
                    }

                    { this.props.detail &&
                        <>
                        <div className="alert">
                          <span className="closebtn" onclick="alert.style.display='none';">
                          </span>
                          <strong>Sorry!</strong> Your appliance could not be identified. Please enter more information.
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Energy Stars</label>
                            <div className="col-sm-8">
                                <select className="form-control">
                                    <option value="5.0">5.0</option>
                                    <option value="4.5">4.5</option>
                                    <option value="4.0">4.0</option>
                                    <option value="3.5">3.5</option>
                                    <option value="3.0">3.0</option>
                                    <option value="2.5">2.5</option>
                                    <option value="2.0">2.0</option>
                                    <option value="1.5">1.5</option>
                                    <option value="1.0">1.0</option>
                                    <option value="0.5">0.5</option>
                                    <option value="0">0</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Length (mm)</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" value={ this.state.length } onChange={ (e) => this.handleChange(e, 'length') } />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Width (mm)</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" value={ this.state.width } onChange={ (e) => this.handleChange(e, 'width') } />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Height (mm)</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" value={ this.state.height } onChange={ (e) => this.handleChange(e, 'height') } />
                            </div>
                        </div>
                        </>
                    }

                    {/* <p className="text-justify">Type </p>
                    <select value={ this.state.form.appliances[0].type } onChange={ (e) => this.handleApplianceChange(e, 0, 'type') }>
                        <option value="fridge">Fridge</option>
                        <option value="dishwasher">Dishwasher</option>
                    </select> */}

                    <div className="float-right">
                        { this.props.loading &&
                            <div class="spinner-border text-primary mr-4" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        }
                        <input type="submit" value="Submit" disabled={ !this.isFormValid() } className="btn btn-primary float-right"/>
                    </div>
                </div>
              </div>
            </form>
        )
    }

}


export default ApplianceInputForm;
