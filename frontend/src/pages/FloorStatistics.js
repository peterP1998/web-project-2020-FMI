import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import LineChart from "../components/LineChart";
import styles from "./FloorStatistics.module.css";

class FloorStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configuration: "",
      values: [],
      selectedBuilding: "",
      date: new Date(),
      chartData: [],
      show: false,
    };
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  componentDidMount() {
    fetch(
      "http://localhost:8888/web-project-2020-FMI/backend/services/export.php"
    )
      .then((response) => response.json())
      .then((json) => {
        var names = [];
        for (var k in json) {
          names.push(json[k]["building_name"]);
        }

        this.setState({
          configuration: json,
          values: names.filter(this.onlyUnique),
        });
      });
  }

  handleSelectBuilding = (option) => {
    const selectedBuilding = option.value;
    this.setState({ selectedBuilding });
  };

  setStartDate = (dateToSet) => {
    this.setState({
      date: dateToSet,
    });
  };

  onSelect = (e) => {
    e.preventDefault();
  };

  getChart = (buidlingName, selectedDate, fetchedData) => {
    let floors = new Map();
    let floorRooms = new Map();
    let floorCapacity = new Map();
    let roomCapacity = new Map();

    for (var record in fetchedData) {
        let currentBuildingName = fetchedData[record]["building_name"];
        let currentHallName = fetchedData[record]["hall_name"];
        let capacity = parseInt(fetchedData[record]["hall_capacity"]);
        let floor = parseInt(fetchedData[record]["floor"]);
        
        roomCapacity.set(currentHallName, capacity);
        if(currentBuildingName === buidlingName){
            if(floorRooms.has(floor)){
                let currentRoomsSet = floorCapacity.get(floor);
                currentRoomsSet.add(currentHallName);
                floorRooms.set(floor, currentRoomsSet);
            }else{
                let currentRoomsSet = new Set();
                currentRoomsSet.add(currentHallName);
                floorRooms.set(floor, currentRoomsSet);
            }   
        }
    }

    for (let [floorNumber, roomsSet] of floorRooms) {
      let floorCap = roomsSet.reduce((a, b) => a + b, 0);
      floorCapacity.set(floorNumber, floorCap);
    }
  }

  handleOnClick = () => {
    this.setState({ show: true });
    let buidlingName = this.state.selectedBuilding;
    let selectedDate = this.formatDate(this.state.date);
    var fetchedData = this.state.configuration;

    let percentBookedHalls = this.getChart(
        buidlingName,
        selectedDate,
        fetchedData
      );

    let current = [];
    current.push({
      title: "Процент на заети зали",
      data: percentBookedHalls,
    });
    this.setState({ chartData: current });
  };

  render() {
    return (
      <div>
        <div className={styles.dropdown}>
          <Dropdown
            onChange={this.handleSelectBuilding}
            value={this.state.selectedBuilding}
            options={this.state.values}
            placeholder="Select building"
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
        {this.state.show && (
          <div>
            <LineChart
              data={this.state.chartData[0].data}
              title={this.state.chartData[0].title}
              color="#59124d"
            />
          </div>
        )}
      </div>
    );
  }
}

export default FloorStatistics;
