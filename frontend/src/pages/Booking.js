import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import TimeRange from 'react-time-range';
import moment from 'moment';
import styles from './Booking.module.css';

class Booking extends React.Component {

  buildings = ['FMI', 'FXF', 'Rektorat'];
  halls = ['100', '204', '600']; //TODO this can be map <building> => List(halls)

  onSelectBuilding = () => {
    console.log('Implement on click')
  }

  onSelectHall = () => {
    console.log('Implement on click')
  }

  state = {
    date: new Date(),
    startTime: moment(),
    endTime: moment()
  };

  returnFunctionStart = event => {
    this.setState({
      startTime: event.startTime
    });
  };

  returnFunctionEnd = event => {
    this.setState({
      endTime: event.endTime
    });
  };

  setStartDate = (dateToSet) => {
    this.setState({
      date: dateToSet
    });
  };

  addBookingHandler = () => {
    //TODO call php
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Add Hall Booking</h1>
        <div className={styles.date}>
          <label for="datepicker">Choose Date:</label>
          <DatePicker id="datepicker" selected={this.state.date} onChange={date => this.setStartDate(date)} />
        </div>
        <div className={styles.my}>
          <Dropdown className={styles.dropdown} options={this.buildings} onChange={this.onSelectBuilding} placeholder="Select building" />
          <Dropdown options={this.halls} onChange={this.onSelectHall} placeholder="Select Hall" />
        </div>
        <div className={styles.picker}>
          <TimeRange onStartTimeChange={this.returnFunctionStart} onEndTimeChange={this.returnFunctionEnd}
            startMoment={this.state.startTime} endMoment={this.state.endTime} />
        </div>
        <button className={styles.addButton} onClick={this.addBookingHandler}>Add Booking</button>
      </div>
    );
  }
}

export default Booking;