
import React, { Component } from 'react';

class Header extends Component {

		constructor(props) {
			super(props);

			this.state = { };
		}

		render() {
			const appliances = [];
			for (let i = 0; i < 20; i++) {
				appliances.push(
					<div className="card results-item">
						<img className="card-img-top results-image" src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?v=1530129081" />
						<div className="card-body">
							<h5 className="card-title">Appliance Title</h5>
							<p className="card-text">$1,999</p>
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
