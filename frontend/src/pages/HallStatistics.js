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
                placeholder="Select floor"
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
