import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage/HomePage';
import { Container } from 'react-bootstrap';
import './Style/Style.css';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Router>
          <Switch>
            <Route path='/' exact component={HomePage} />
            {/* <Route path='/' exact component={HomePage} /> */}
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
