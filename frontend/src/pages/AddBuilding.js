import React, { Component } from "react";
import styles from './AddBuilding.module.css';


class AddBuilding extends Component {
  constructor(props) {
    super(props);
    this.state = {messg:"", latitude: 0.0, longtitude: 0.0}
    this.addBuildingHandler=this.addBuildingHandler.bind(this)
  }

  addBuildingHandler(event) {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: event.target[0].value,
                          capacity: event.target[1].value,
                          latitude: event.target[2].value,
                          longtitude: event.target[3].value })
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
  
  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
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
      <input type='number' maxLength={10} onInput={this.maxLengthCheck} step="0.0000001" min='0' max='20' placeholder="GPS latitude"
                onChange= {(evt) => this.setState({latitude: evt.target.value})} required/>
              <div></div>
      <input type='number' maxLength={10} step="0.0000001" onInput={this.maxLengthCheck} min='0' max='20' placeholder="GPS longtitude"
                onChange= {(evt) => this.setState({longtitude: evt.target.value})} required />
        <div></div>
      <button type="submit" className={styles.addBuildingBtn}>Add</button>
    </form>
    </div>
  );
  }
}

export default AddBuilding;
