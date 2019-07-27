
import React, { Component } from 'react';

import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

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
                    <div className="price">$1,999
                      <a href="#" className="btn btn-primary float-right">Buy Appliance</a>
                    </div>
                    <div className="size">600mm x 546mm x 300mm (L x W x H)</div>

                    {/* https://www.chartjs.org/docs/latest/ */}
                    {/* https://www.npmjs.com/package/react-chartjs-2 */}
                    <div className="bargraph">
                      <Bar width={100} height={50} data={{
                              labels: ['Old kWh', 'Old CO2', 'New kWh', 'New CO2'],
                              datasets: [{
                                  label: 'Efficiency and Emission Comparison',
                                  data: [40, 50, 10, 20],
                                  backgroundColor: [
                                      'rgba(0,0,0,0.7)',
                                      'rgba(242,204,0,0.85)',
                                      'rgba(0,0,0,0.7)',
                                      'rgba(242,204,0,0.85)'
                                  ]
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
                    </div>
                    <div className="linegraph">
                      <Line width={100} height={50} data={{
                              labels: ['Now', 'In 1 yr', 'In 5 yrs', 'In 10 yrs'],
                              datasets: [{
                                  label: 'Cost Savings???',
                                  data: [0, 12, 40, 90],
                                  borderColor: [
                                      'rgba(0,0,0,0.7)'
                                  ],
                                  pointBackgroundColor:'rgba(0, 0, 0, 0.7)'
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
                    </div>
              </div>
              <div className="refine">
                <button onclick="myFunction()" className="dropbtn">REFINE SEARCH</button>
                <div id="myDropdown" class="dropdown-content">
                  <div className="form-group row">
                      <label className="col-sm-4 col-form-label text-justify">Budget</label>
                      <div className="col-sm-8">
                          <input type="number" className="form-control" value={ this.state.budget } onChange={ (e) => this.handleChange(e, 'energyCost') } />
                      </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label text-justify">Size</label>
                    <div className="col-sm-8">
                        <select className="form-control" value={ this.state.size }>
                            <option value="notspecified">Not Specified</option>
                            <option value="small">S</option>
                            <option value="medium">M</option>
                            <option value="large">L</option>
                        </select>
                      </div>
                  </div>

                </div>
              </div>
          </div>

      )
    }
}
export default DetailView;
