
import React, { Component } from 'react';


class Header extends Component {

    constructor(props) {
        super(props);

        this.state = { };
    }

    render() {
        return (
          <div class = "header">
            <a href = "#default" class = "logo">DollarWatt$</a>
            <div class = "header-right">
              <a class = "active" href = "#home">Home</a>
              <a href = "#about">About</a>
              <a href = "#contact">Contact</a>
            </div>
          </div>
        )
    }

}

export default Header;
