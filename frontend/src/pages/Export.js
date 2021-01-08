import axios from "axios";

import React, { Component } from "react";
import styles from "./Export.module.css";

class Export extends Component {
  constructor(props) {
    super(props)
    this.state = {jsonfile: {}}
  }
  componentDidMount() {
    fetch('http://localhost:80/export.php')
    .then(response => response.json())
    .then(json => {
      this.setState({
        jsonfile: json
      });
    })
    
  }
  render() {
    return (
      <div className={styles.container}>
        <h1>Export Configuration</h1>
        <a href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(this.state.jsonfile)
              )}`} 
            download="samoLevski.json">
            <button className={styles.exportButton} >
              Export
        </button>
        </a>
      </div>
    );
  }
}

export default Export;
