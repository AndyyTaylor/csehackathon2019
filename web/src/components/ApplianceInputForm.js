
import React, { Component } from 'react';


class ApplianceInputForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            energyCost: undefined,
            company: undefined,
            model: undefined,
            type: undefined,
            consumption: undefined,
            length: 0,
            width: 0,
            height: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>

                <div className="appliance_container">
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label text-justify">Energy Cost</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" value={ this.state.energyCost } onChange={ (e) => this.handleChange(e, 'energyCost') } />
                            <small className="form-text text-muted">If you don't know it, leave it blank :))</small>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label text-justify">Type</label>
                        <div className="col-sm-8">
                            <select className="form-control">
                                <option value="fridge">Fridge</option>
                                <option value="dishwasher">Dishwasher</option>
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
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Consumption</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" value={ this.state.consumption } onChange={ (e) => this.handleChange(e, 'consumption') } />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Length</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" value={ this.state.length } onChange={ (e) => this.handleChange(e, 'length') } />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Width</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" value={ this.state.width } onChange={ (e) => this.handleChange(e, 'width') } />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-justify">Height</label>
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

                    <input type="submit" value="Submit" className="btn btn-primary float-right"/>
                </div>
            </form>
        )
    }

}

export default ApplianceInputForm;
