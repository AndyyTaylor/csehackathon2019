
import React, { Component } from 'react';

class Header extends Component {

		constructor(props) {
			super(props);

			this.state = { };
		}

		render() {
			const appliances = [];
			for (let i = 0; i < this.props.appliances.length; i++) {
				const appliance = this.props.appliances[i];
				appliances.push(
					<div className="card results-item">
						<img className="card-img-top results-image" src={appliance.image} />
						<div className="card-body">
							<h5 className="card-title">{appliance.title}</h5>
							<p className="card-text">${appliance.price}</p>
							<a href="#" className="btn btn-primary">Show Details</a>
						</div>
					</div>
				);
			}
			return (
				<div className="results-row container-fluid overflow-hidden">
					<h2 className="text-justify row-header">SUGGESTED FOR YOU</h2>
					<div className="overflow-auto"> { appliances } </div>
				</div>
			)
		}
}

export default Header;
