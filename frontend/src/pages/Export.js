import React, { Component } from "react";
import styles from "./Export.module.css";

class Export extends Component {
  constructor(props) {
    super(props)
    this.state = {jsonfile: {}}
  }
  componentDidMount() {
    fetch('http://localhost:8888/web-project-2020-FMI/backend/services/export.php')
    .then(response => response.json())
    .then(json => {
      this.setState({
        jsonfile: json
      });
    })
  }

  deleteDB = () => {
    fetch('http://localhost:8888/web-project-2020-FMI/backend/services/dropDB.php', {
      method: 'DELETE'
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Export Configuration</h1>
        <a href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify(this.state.jsonfile)
              )}`} 
            download="export.json">
          <button className={styles.exportButton}>Export</button>
          <button className={styles.exportButton} onClick={this.deleteDB}>Export with delete</button>
        </a>
      </div>
    );
  }
}

export default Export;
