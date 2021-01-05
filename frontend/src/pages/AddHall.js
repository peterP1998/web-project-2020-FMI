import React, { Component } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styles from './AddHall.module.css';

class AddHall extends Component {
  
  constructor(props) {
    super(props)
    this.state = {values: [],
      selectedCity: ""}
    this.onSelect=this.onSelect.bind(this)
  }
  componentDidMount() {
    fetch('http://localhost:80/buildings.php')
    .then(response => response.json())
    .then(json => {
      console.log(json);
      var names=[]
      for(var k in json) {
        names.push(json[k]["name"]);
      }
      this.setState({
        values: names
      });
    });
  }
  handleSelectCity = (option)=> {
    const selectedCity = option.value
    this.setState({selectedCity});
  }
  onSelect(e) {
    e.preventDefault();
    console.log(this.state.selectedCity);
    console.log(e.target[0].value);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hall_name: e.target[0].value, capacity: e.target[1].value,building_name: this.state.selectedCity})
    };
    fetch('http://localhost:80/halls.php', requestOptions)
      .then(response => console.log(response));
  }
  render() {
    return (
      <div className={styles.container}>
        <h1>Add new Hall</h1>
      <form onSubmit={this.onSelect}>
        <Dropdown onChange={this.handleSelectCity} value={this.state.selectedCity} options={this.state.values}  placeholder="Select building" />
        <input type="text" placeholder="Enter Name" name="name" id="name" required />
        <div></div>
        <input type="number" min="0" placeholder="Enter capacity" name="cap" id="cap" required />
        <div></div>
        <button type="submit" className={styles.registerbtn} >Add</button>
      </form>
      </div>
    );
  }
}

export default AddHall;
