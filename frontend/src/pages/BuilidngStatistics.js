import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import BarChart from "../components/BarChart";
import styles from "./BuildingStatistics.module.css";



class BuildingStatistics extends Component {
  constructor(props) {
    super(props);

    let nameToSet = this.props.match.params.name;
    let dateToSet = this.props.match.params.date;

    let calledAsAPI = true;

    if (!(nameToSet && dateToSet)){
      nameToSet = "";
      dateToSet = new Date().toDateString();     
      calledAsAPI = false;
    }

    this.state = {
      calledAsAPI: calledAsAPI,
      configuration: "",
      values: [],
      selectedBuilding: nameToSet,
      date: new Date(dateToSet),
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

        if(this.state.calledAsAPI){     
          let date = this.state.date.setDate(this.state.date.getDate() + 1);
          this.func(this.state.selectedBuilding,this.formatDate(date),json);
          this.setState({show:true, date:date});
        }
        
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
   
  statisticPercentOfBookedHalls = (buidlingName, selectedDate, fetchedData) => {
    let bookings = new Map();
    let halls = new Set();

    for (var record in fetchedData) {
      let currentBuildingName = fetchedData[record]["building_name"];
      let currentDuration = fetchedData[record]["duration"];
      let currentDateAsArray = fetchedData[record]["start_time"].split(" ");

      if (currentBuildingName === buidlingName) {
        halls.add(fetchedData[record]["hall_name"]);
      }

      if (
        currentBuildingName === buidlingName &&
        currentDateAsArray[0] === selectedDate
      ) {
        let currentHour = currentDateAsArray[1].split(":")[0];
        for (let i = 0; i < currentDuration; i++) {
          if (bookings.has(parseInt(currentHour) + i)) {
            bookings.set(
              parseInt(currentHour) + i,
              bookings.get(parseInt(currentHour) + i) + 1
            );
          } else {
            bookings.set(parseInt(currentHour) + i, 1);
          }
        }
      }
    }
    let info = [];
    let size = halls.size;
    for (let [k, v] of bookings) {
      info.push({
        label: k + " - " + (k + 1) + " часа",
        value: (v / size) * 100,
      });
    }
    return info;
  };

  statisticsPercentOfBookedBuilding(buidlingName, selectedDate, fetchedData) {
    let bookings = new Map();
    let buildingSize = 0;
    for (var record in fetchedData) {
      let currentBuildingName = fetchedData[record]["building_name"];
      let currentDuration = fetchedData[record]["duration"];
      let currentDateAsArray = fetchedData[record]["start_time"].split(" ");
      let capacity = fetchedData[record]["hall_capacity"];

      if (
        currentBuildingName === buidlingName &&
        currentDateAsArray[0] === selectedDate
      ) {
        buildingSize = fetchedData[record]["building_capacity"];

        let currentHour = currentDateAsArray[1].split(":")[0];
        for (let i = 0; i < currentDuration; i++) {
          if (bookings.has(parseInt(currentHour) + i)) {
            bookings.set(
              parseInt(currentHour) + i,
              bookings.get(parseInt(currentHour) + i) + parseInt(capacity)
            );
          } else {
            bookings.set(parseInt(currentHour) + i, parseInt(capacity));
          }
        }
      }
    }
    let info = [];
    for (let [k, v] of bookings) {
      info.push({
        label: k + " - " + (k + 1) + " часа",
        value: (v / buildingSize) * 100,
      });
    }
    return info;
  }

  func = (buidlingName,selectedDate,fetchedData) =>{
    let percentBookedHalls = this.statisticPercentOfBookedHalls(
      buidlingName,
      selectedDate,
      fetchedData
    );
    let percentBookedBuilding = this.statisticsPercentOfBookedBuilding(
      buidlingName,
      selectedDate,
      fetchedData
    );

    let current = [];
    current.push({
      title: "Процент на заети зали",
      data: percentBookedHalls,
    });
    current.push({
      title: "Процентна заетост по часове на сградата",
      data: percentBookedBuilding,
    });
    this.setState({ chartData: current });
  }

  handleOnClick = () => {
    this.setState({ show: true });
    let buidlingName = this.state.selectedBuilding;
    let selectedDate = this.formatDate(this.state.date);
    var fetchedData = this.state.configuration;

    this.func(buidlingName,selectedDate,fetchedData);
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
            <BarChart
              data={this.state.chartData[0].data}
              title={this.state.chartData[0].title}
              color="#70CAD1"
            />
          </div>
        )}
        {this.state.show && (
          <div className={styles.chart2}>
            <BarChart
              data={this.state.chartData[1].data}
              title={this.state.chartData[1].title}
              color="#59124d"
            />
          </div>
        )}
      </div>
    );
  }
}

export default BuildingStatistics;
