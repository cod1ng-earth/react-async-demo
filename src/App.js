import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PageOne from './PageOne';
import PageTwo from './PageTwo';

function App() {
  return (
    <Router>
      <nav><Link to="/">Page 1</Link></nav>
      <nav><Link to="/page2">Page 2</Link></nav>
      <Switch>
        <Route path="/page2"><PageTwo /></Route>
        <Route path="/"><PageOne /></Route>
      </Switch>
    </Router>
  );
}

export default App;
