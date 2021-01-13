import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBuilding from './pages/AddBuilding';
import AddHall from './pages/AddHall';
import BuildingStatistics from './pages/BuilidngStatistics';
import FloorStatistics from './pages/FloorStatistics';
import HallStatistics from './pages/HallStatistics';
import Import from './pages/Import';
import Export from './pages/Export';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/buildings' component={AddBuilding} />
          <Route path='/halls' component={AddHall} />
          <Route path='/building-stats' component={BuildingStatistics} />
          <Route path='/floor-stats' component={FloorStatistics} />
          <Route path='/hall-stats' component={HallStatistics} />
          <Route path='/import' component={Import} />
          <Route path='/export' component={Export} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
