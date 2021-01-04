import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import styles from './Statistics.module.css'

const options = [
  'first', 'second', 'third'
];

const onSelect = () => {
  console.log('Implement on click')
}


function Statistics() {
  return (
    <div>
      <div className={styles.dropdown}>
        <Dropdown options={options} onChange={onSelect} placeholder="Select building" />
      </div>
      <div className={styles.dropdown}>
        <button type="submit" className={styles.btn}>Choose</button>
      </div>
    </div>
  );
}

export default Statistics;
