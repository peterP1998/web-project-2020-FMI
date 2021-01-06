import React, { Component } from "react";
import styles from './AddBuilding.module.css';


class AddBuilding extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value)
    console.log(event.target[1].value)
    alert('A name was submitted: ' + this.state.name);
    event.preventDefault();
  }

  addBuildingHandler(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: event.target[0].value, capacity: event.target[1].value })
    };
    fetch('http://localhost:80/buildings.php', requestOptions)
      .then(response => console.log(response));
  }
  

  render(){
  return (
    <div className={styles.container}>
      <h1>Add new Building</h1>
    <form onSubmit={this.addBuildingHandler}>
      <input type="text"   placeholder="Enter Name" name="name" id="name" required/>
      <div></div>
      <input type="number"  min="0" placeholder="Enter capacity" name="capacity" id="capacity"  required/>
      <div></div>
      <button type="submit" className={styles.addBuildingBtn}>Add</button>
    </form>
    </div>
  );
  }
}

export default AddBuilding;
