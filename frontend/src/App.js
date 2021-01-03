import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBuilding from './pages/AddBuilding';
import AddHall from './pages/AddHall';
import Statistics from './pages/Statistics';
import Import from './pages/Import';
import Export from './pages/Export';
import Booking from './pages/Booking';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/buildings' component={AddBuilding} />
          <Route path='/halls' component={AddHall} />
          <Route path='/booking' component={Booking} />
          <Route path='/statistics' component={Statistics} />
          <Route path='/import' component={Import} />
          <Route path='/export' component={Export} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
