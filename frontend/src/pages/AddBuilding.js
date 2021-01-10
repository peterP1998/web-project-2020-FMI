import React, { Component } from "react";
import styles from './AddBuilding.module.css';


class AddBuilding extends Component {
  constructor(props) {
    super(props);
    this.state = {messg:""}
    this.addBuildingHandler=this.addBuildingHandler.bind(this)
  }

  addBuildingHandler(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: event.target[0].value, capacity: event.target[1].value })
    };
    fetch('http://localhost:8888/web-project-2020-FMI/backend/services/buildings.php', requestOptions)
      .then(response=>{
        if (!response.ok) {
          this.setState({messg:"Building with this name already exists."});
        }else{
          this.setState({messg:"Building added!"});
        }
      });
  }
  

  render(){
  return (
    <div className={styles.container}>
      <h1>{this.state.messg}</h1>
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
