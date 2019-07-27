import React, { Component } from 'react';

class DetailView extends Component {

  constructor(props) {
      super(props);

      this.state = {};
  }

  render() {
    return (
      <div class = "details">
        <div class = "app_image">
          <img src = "https://www.appliancesonline.com.au/public/images/product/cnef4315/extrnl/Liebherr-CNEF4315-350L-Bottom-Mount-Fridge-Hero-high.jpeg"></img>
        </div>
      </div>
    )

  }
}
export default DetailView;
