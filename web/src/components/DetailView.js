
import React, { Component } from 'react';

import { Bar } from 'react-chartjs-2';

class DetailView extends Component {

  constructor(props) {
      super(props);

      this.state = {};
  }

  render() {
      return (
          <div className="detail_container container-fluid">
              <div className="detail-img-container">
                <img className="rounded detail-image" src={this.props.appliance.image} />
              </div>
              <div className="detail-info">
                    <h3>{this.props.appliance.title}</h3>
                    <div>${this.props.appliance.price}</div>
                    <div>{this.props.appliance.length}mm x {this.props.appliance.width}mm x {this.props.appliance.height}mm (L x W x H)</div>

                    {/* https://www.chartjs.org/docs/latest/ */}
                    {/* https://www.npmjs.com/package/react-chartjs-2 */}
                    <Bar width={100} height={50} data={{
                            labels: ['Old kwh', 'Old co2', 'New kwh', 'New co2'],
                            datasets: [{
                                label: 'Energy',
                                data: [40, 50, 10, 20]
                            }]
                        }} options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }}/>

                  <a href="#" className="btn btn-primary">Buy Appliance</a>
              </div>
          </div>
      )
    }
}
export default DetailView;
