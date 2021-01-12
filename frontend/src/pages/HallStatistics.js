import styles from "./HallStatistics.module.css";

import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import BarChart from "../components/BarChart";

class HallStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
          configuration: "",
          builidings: [],
          halls: [],
          selectedBuilding: "",
          selectedHall: "",
          date: new Date(),
          chartData: [],
          show: false,
        };
      }
    componentDidMount() {
        fetch('http://localhost:8888/web-project-2020-FMI/backend/services/buildings.php')
        .then(response => response.json())
        .then(json => {
          var names=[]
          for(var k in json) {
            names.push(json[k]["name"]);
          }
          this.setState({
            builidings: names
          });
        });
      }
    handleSelectBuilding = (option)=> {
      const selectedBuilding = option.value
      this.setState({selectedHall:""});
      fetch('http://localhost:8888/web-project-2020-FMI/backend/services/halls.php?name='+selectedBuilding)
      .then(response => response.json())
      .then(json => {
        var names=[]
        for(var k in json) {
          names.push(json[k]["name"]);
        }
        this.setState({
          halls: names
        });
      });
    }
    handleSelectHall = (option)=> {
      const selectedHall = option.value
      this.setState({selectedHall});
    }
    render() {
        return (
          <div>
            <div className={styles.dropdown}>
              <Dropdown
                onChange={this.handleSelectBuilding}
                value={this.state.selectedBuilding}
                options={this.state.builidings}
                placeholder="Select building"
              />
            </div>
            <div className={styles.dropdownhall}>
              <Dropdown
                onChange={this.handleSelectHall}
                value={this.state.selectedHall}
                options={this.state.halls}
                placeholder="Select Hall"
              />
            </div>
            <div>
              <button
                type="submit"
                className={styles.btn}
                onClick={this.handleOnClick}
              >
                Choose
              </button>
            </div>
            <div className={styles.datepicker}>
              <DatePicker
                selected={this.state.date}
                onChange={(date) => this.setStartDate(date)}
              />
            </div>
          </div>
        );
      }
}

export default HallStatistics;
