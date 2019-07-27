
import React, { Component } from 'react';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = { };
    }

    render() {
        return (
          <div class = "separator">
            <div class = "header">
              <a href = "#default" class = "logo">DollarWatt$</a>
              <div class = "header-right">
                <a class = "active" href = "#home">Home</a>
                <a href = "#about">About</a>
                <a href = "#contact">Contact</a>
              </div>
            </div>
            <link rel = "stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div class = "search-container">
            <form class = "searchbar" action="/action_page.php">
              <input type = "text" placeholder="Search.." name="search"></input>
              <button type = "submit"><i class="fa fa-search"></i></button>
            </form>
            </div>
          </div>
        )
    }

}

export default Header;
