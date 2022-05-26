
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import DayPass from './components/DayPass';
import Items from './components/Items';
import Missions from './components/Missions';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/about'}>
          <About />
        </Route>
        <Route path={'/day-pass'}>
          <DayPass />
        </Route>
        <Route path={'/items'}>
          <Items />
        </Route>
        <Route path={'/missions'}>
          <Missions />
        </Route>
        <Route path={'/play'}>
          <Missions />
        </Route>
        <Route path={'/'}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
  