import React, { useState } from "react";
import styles from './AddBuilding.module.css';

function addBuildingHandler() {
  // TODO call php
}

function AddBuilding() {
  return (
    <div className={styles.container}>
      <h1>Add new Building</h1>

      <input type="text" placeholder="Enter Name" name="name" id="name" required />
      <div></div>
      <input type="number" min="0" placeholder="Enter capacity" name="cap" id="cap" required />
      <div></div>
      <button type="submit" className={styles.addBuildingBtn} onSubmit={addBuildingHandler}>Add</button>
    </div>
  );
}

export default AddBuilding;
