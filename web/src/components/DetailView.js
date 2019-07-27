
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
                <img className="rounded detail-image" src="https://www.appliancesonline.com.au/public/images/product/ktb2302wa/external/Kelvinator-KTB2302WA-231L-Top-Mount-Fridge-Hero-Image-high.jpeg" />
              </div>
              <div className="detail-info">
                    <h3>My Epic Fridge Title</h3>
                    <div>$1,999</div>
                    <div>600mm x 546mm x 300mm (L x W x H)</div>

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
