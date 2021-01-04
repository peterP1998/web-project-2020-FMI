import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styles from './AddHall.module.css';


const options = [
  'first', 'second', 'third'
];

const onSelect = () => {
  console.log('Implement on click')
}

const addHallHandler = () => {
  console.log('Implement on click')
}

function AddHall() {
  return (
    <div className={styles.container}>
      <h1>Add new Hall</h1>
      <Dropdown options={options} onChange={onSelect} placeholder="Select building" />
      <input type="text" placeholder="Enter Name" name="name" id="name" required />
      <div></div>
      <input type="number" min="0" placeholder="Enter capacity" name="cap" id="cap" required />
      <div></div>
      <button type="submit" className={styles.registerbtn} onSubmit={addHallHandler}>Add</button>
    </div>
  );
}

export default AddHall;
