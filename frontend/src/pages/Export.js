import axios from "axios";

import React, { Component } from "react";
import styles from "./Export.module.css";

class Export extends Component {
  export = () => {
    // TODO export configuration to fixed directory, ex. C:\Users\<username>\BuildingsApp\
    // filename can be specified??
  };

  render() {
    return (
      <div className={styles.container}>
        <h1>Export Configuration</h1>
        <button className={styles.exportButton} onClick={this.export}>
          Export
        </button>
      </div>
    );
  }
}

export default Export;
