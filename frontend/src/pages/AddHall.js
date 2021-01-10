import React, { Component } from "react";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styles from './AddHall.module.css';

class AddHall extends Component {
  
  constructor(props) {
    super(props)
    this.state = {values: [], selectedBuilding: "",cmessg:""}
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
        values: names
      });
    });
  }
  handleSelectBuilding = (option)=> {
    const selectedBuilding = option.value
    this.setState({selectedBuilding});
  }
  onSelect= (e) => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hall_name: e.target[0].value,
                            capacity: e.target[1].value,
                            building_name: this.state.selectedBuilding,
                            floor: e.target[2].value})
    };
    fetch('http://localhost:8888/web-project-2020-FMI/backend/services/halls.php', requestOptions)
      .then(response=>{
        if (!response.ok) {
          this.setState({messg:"Hall with this name alredy exists or capacity is too big."});
        }else{
          this.setState({messg:"Hall added!"});
        }
      });
  }
  render() {
    return (
      <div className={styles.container}>
        <h1>{this.state.messg}</h1>
        <h1>Add new Hall</h1>
      <form onSubmit={this.onSelect}>
        <Dropdown onChange={this.handleSelectBuilding} value={this.state.selectedBuilding} options={this.state.values}  placeholder="Select building" />
        <input type="text" placeholder="Enter Name" name="name" id="name" required />
        <div></div>
        <input type="number" min="0" placeholder="Enter capacity" name="cap" id="cap" required />
        <div></div>
        <input type="number" placeholder="Enter floor" name="floor" id="floor" required />
        <div></div>
        <button type="submit" className={styles.registerbtn} >Add</button>
      </form>
      </div>
    );
  }
}

export default AddHall;
