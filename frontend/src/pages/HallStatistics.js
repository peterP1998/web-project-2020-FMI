import styles from "./HallStatistics.module.css";

import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DoughnutChart from "../components/DoughnutChart";
import LineChart from "../components/LineChart";
class HallStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
          configuration: "",
          buildings: [],
          halls: [],
          selectedBuilding: "",
          selectedHall: "",
          date: new Date(),
          chartData: [],
          lineChartData:{},
          show: false,
          data:"",
        };
      }
    onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
    componentDidMount() {
        fetch('http://localhost:8888/web-project-2020-FMI/backend/services/export.php')
        .then((response) => response.json())
        .then((json) => {
          var names = []
          for (var k in json) {
            names.push(json[k]["building_name"]);
          }
          this.setState({
            configuration: json,
            buildings: names.filter(this.onlyUnique)
          });
      });
        
    }
    setStartDate = (dateToSet) => {
      this.setState({
        date: dateToSet,
      });
    };
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
  
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
  
      return [year, month, day].join("-");
    }
    handleSelectBuilding = (option)=> {
      const selectedBuilding = option.value
      this.setState({ selectedBuilding });
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
    handleOnClick = () => {
      this.setState({ show: true });
      let buidlingName = this.state.selectedBuilding;
      let hallName = this.state.selectedHall;
      let selectedDate = this.formatDate(this.state.date);
      var fetchedData = this.state.configuration;

      var info=this.statisticsForHallForDay(buidlingName,hallName, selectedDate, fetchedData)
      var data=this.lineChartForHallForDay(buidlingName,hallName, selectedDate, fetchedData)
      let current = [];
      current.push({
        data: info,
      });
     
      this.setState({chartData:current,lineChartData:data});
    }
    lineChartForHallForDay(buidlingName,hallName, selectedDate, fetchedData){
      let data = { labels: [], datasets: [] };
      let info = [];
      for(let i=8; i<20;i++){
        info.push(0);
      }
      data.labels = ["8-9","9-10","10-11","11-12","12-13","13-14","14-15","15-16","16-17","17-18","18-19","19-20"];
      for (var record in fetchedData) {
        let currentBuildingName = fetchedData[record]["building_name"];
        let currentDuration = fetchedData[record]["duration"];
        let currentDateAsArray = fetchedData[record]["start_time"].split(" ");
        let currenthallName = fetchedData[record]["hall_name"];
        if(currentDateAsArray[0]===selectedDate &&currenthallName===hallName &&currentBuildingName===buidlingName){
          let currentHour = currentDateAsArray[1].split(":")[0];
          for(let i=0;i<parseInt(currentDuration);i++){
             info[parseInt(currentHour)+i-8]=100;
          }
        }
      }
      data.datasets.push({
        data: info,
        label: "Заетост по часове за зала "+hallName,
        borderColor: this.getRandomColor(),
        fill: false,
      });
      return data
    }
    statisticsForHallForDay(buidlingName,hallName, selectedDate, fetchedData){
      var timeBoked=0;
      let info = [];

      for (var record in fetchedData) {
        let currentBuildingName = fetchedData[record]["building_name"];
        let currentDuration = fetchedData[record]["duration"];
        let currentDateAsArray = fetchedData[record]["start_time"].split(" ");
        let currenthallName = fetchedData[record]["hall_name"];
        if(currentDateAsArray[0]===selectedDate &&currenthallName===hallName &&currentBuildingName===buidlingName){
          timeBoked+=parseInt(currentDuration)
        }
      }
      let booked = (timeBoked/12)*100;
       info.push({
        label: "Заета "+ booked.toFixed(2) +"%",
        value: timeBoked,
        backgroundColor: "#70CAD1",
      });
      var timeLeft=12-timeBoked
      let free = (timeLeft/12)*100;
      info.push({
        label: "Свободна "+ free.toFixed(2) +"%",
        value: timeLeft,
        backgroundColor: "#70CAD1",
      });
      return info
    }
    getRandomColor = () => {
      return (
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
      );
    };
    render() {
        return (
          <div>
            <div className={styles.dropdown}>
              <Dropdown
                onChange={this.handleSelectBuilding}
                value={this.state.selectedBuilding}
                options={this.state.buildings}
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
            {this.state.show && (
            <div className={styles.chart1}>
              <DoughnutChart
                data={this.state.chartData[0].data}
                colors={['#d40b1f','#343deb']}
              />
          </div>
        )}
           {this.state.show && (
          <div className={styles.chart2}>
            <LineChart data={this.state.lineChartData}/>
          </div>
        )}
          </div>
        );
      }
}

export default HallStatistics;
