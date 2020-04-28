import React, { Component } from 'react'
import Character from './Character.js'
import firebase from './firebase.js'

class App extends Component {
  constructor(props){
      super(props);
  }

  getInitialState(){
    return {"showHideSidenav":"hidden"};
  }

  render() {
      return (
          <div className="header">
              <i className="border hide-on-small-and-down"></i>
              <div className="container">
                  <a ref="btn" onClick={this.toggleSidenav.bind(this)} href="#" className="btn-menu show-on-small"><i></i></a>
                  <Menu className="menu hide-on-small-and-down"/>
                  <Sidenav className={this.props.showHideSidenav}/>
              </div>
          </div>
      )
  }

  toggleSidenav() {
      var css = (this.props.showHideSidenav === "hidden") ? "show" : "hidden";
      this.setState({"showHideSidenav":css});
  }
}