import React, { useState } from "react";
import styles from './AddBuilding.module.css';
import axios from 'axios';
function addBuildingHandler() {
  axios({
    method: 'post',
    url: 'https://cors-anywhere.herokuapp.com/http://localhost:80/buildings.php',
    data: {
      name: 'Finn',
      capacity: 3
    },
    headers: {
      crossDomain: true,
      'Access-Control-Allow-Origin': '*'
     }
  });
}

function  AddBuilding() {
  const handleSubmit = event => {
   event.preventDefault();
   axios({
     method: 'post',
     url: 'http://localhost:80/buildings.php',
     data: {
       name: 'Finn',
       capacity: 3
     },
     headers: {
       crossDomain: true,
       'Access-Control-Allow-Origin': '*'
      }
   });

 }
  return (
    <div className={styles.container}>
      <h1>Add new Building</h1>

       <input type="text" placeholder="Enter Name" name="name" id="name" required />
       <div></div>
       <input type="number" min="0" placeholder="Enter capacity" name="cap" id="cap" required />
       <div></div>
       <button type="submit" className={styles.addBuildingBtn} onClick={handleSubmit}>Add</button>

    </div>
  );
}

export default AddBuilding;
