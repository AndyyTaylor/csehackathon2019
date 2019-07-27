import React, { Component } from 'react';

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
              <div>
                  <h3>My Epic Fridge Title</h3>
                  <div>$1,999</div>
                  <div>600mm x 546mm x 300mm (L x W x H)</div>

                  <a href="#" className="btn btn-primary">Buy Appliance</a>
              </div>
          </div>
      )
    }
}
export default DetailView;
