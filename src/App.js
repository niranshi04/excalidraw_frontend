import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DrawPage from './drawpage';
import ViewAndDownload from './download';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={DrawPage} />
          <Route exact path="/viewAndDownload" component={ViewAndDownload} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

