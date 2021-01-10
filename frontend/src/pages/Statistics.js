import React,{Component} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './Statistics.module.css'


class Statistics extends Component {

  constructor(props) {
    super(props)
    this.state = {configuration:"", values: [], selectedBuilding: "", date: new Date()};
    this.onSelect=this.onSelect.bind(this);
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
        configuration: json,
        values: names
      });
    });
  }

  handleSelectBuilding = (option)=> {
    const selectedBuilding = option.value
    this.setState({selectedBuilding});
  }

  setStartDate = (dateToSet) => {
    this.setState({
      date: dateToSet
    });
  };

  onSelect= (e) => {
    e.preventDefault();     
  }


  render(){
    return (
      <div>
        <div className={styles.dropdown}>
          <Dropdown onChange={this.handleSelectBuilding} value={this.state.selectedBuilding} options={this.state.values} placeholder="Select building" />
        </div>
        <div>
          <button type="submit" className={styles.btn}>Choose</button>
        </div>
        <div className={styles.datepicker}>
          <DatePicker selected={this.state.date}  
                      onChange={date => this.setStartDate(date)}/>
        </div>
      </div>
    );
  }
}

export default Statistics;
