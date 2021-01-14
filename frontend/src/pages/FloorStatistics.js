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
      chartData: {},
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

  handleOnClick = () => {
    this.setState({ show: true });
    let buidlingName = this.state.selectedBuilding;
    let selectedDate = this.formatDate(this.state.date);
    var fetchedData = this.state.configuration;

    let data = this.getChart(
      buidlingName,
      selectedDate,
      fetchedData
    );

    this.setState({chartData: data});
  };

  getRandomColor = () => {
    return (
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  };

  getChart = (buidlingName, selectedDate, fetchedData) => {
    let graphics = new Map();
    let floorRooms = new Map();
    let floorCapacity = new Map();
    let roomCapacity = new Map();

    for (var record in fetchedData) {
      var currentBuildingName = fetchedData[record]["building_name"];
      var currentHallName = fetchedData[record]["hall_name"];
      var capacity = parseInt(fetchedData[record]["hall_capacity"]);
      var floor = parseInt(fetchedData[record]["floor"]);
      var currentDate = fetchedData[record]["start_time"].split(" ")[0];

      if (
        currentBuildingName === buidlingName &&
        selectedDate === currentDate
      ) {
        roomCapacity.set(currentHallName, capacity);
        graphics.set(floor, new Map());

        if (floorRooms.has(floor)) {
          let currentRoomsSet = floorRooms.get(floor);
          currentRoomsSet.add(currentHallName);
          floorRooms.set(floor, currentRoomsSet);
        } else {
          let currentRoomsSet = new Set();
          currentRoomsSet.add(currentHallName);
          floorRooms.set(floor, currentRoomsSet);
        }
      }
    }

    for (let [floorNumber, roomsSet] of floorRooms) {
      let floorCap = 0;
      for (let element of roomsSet) {
        floorCap += roomCapacity.get(element);
      }
      floorCapacity.set(floorNumber, floorCap);
    }

    for (var record in fetchedData) {
      let currentBuildingName = fetchedData[record]["building_name"];
      let currentHour = parseInt(
        fetchedData[record]["start_time"].split(" ")[1].split(":")[0]
      );
      let floor = parseInt(fetchedData[record]["floor"]);
      let capacity = parseInt(fetchedData[record]["hall_capacity"]);
      let duration = parseInt(fetchedData[record]["duration"]);
      var currentDate = fetchedData[record]["start_time"].split(" ")[0];

      if (
        currentBuildingName === buidlingName &&
        selectedDate === currentDate
      ) {
        let zaetostMap = graphics.get(floor);
        for (let i = 0; i < duration; i++) {
          if (zaetostMap.has(currentHour + i)) {
            let zaetost = zaetostMap.get(currentHour + i);
            zaetostMap.set(currentHour + i, zaetost + capacity);
          } else {
            zaetostMap.set(currentHour + i, capacity);
          }
        }
        graphics.set(floor, zaetostMap);
      }
    }

    let data = { labels: [], datasets: [] };
    data.labels = ["8-9","9-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20"];

    for (let [floorNum, zaetostMap] of graphics) {
      let info = [];
      for(let i=8; i<20;i++){
        info.push(0);
      }
      for (let [hour, zaetost] of zaetostMap) {
        info[hour-8] = (zaetost/floorCapacity.get(floorNum) * 100);
      }
      data.datasets.push({
        data: info,
        label: "етаж " + floorNum.toString(),
        borderColor: this.getRandomColor(),
        fill: false,
      });
    }
    return data;
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
          <div className={styles.chart1}>
            <LineChart data={this.state.chartData}/>
          </div>
        )}
      </div>
    );
  }
}

export default FloorStatistics;
