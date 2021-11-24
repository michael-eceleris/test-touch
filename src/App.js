import Navbar from "./components/Navbar";
import Test from "./components/Test";
import Incompatible from "./components/Incompatible";
import TestOk from "./components/TestOk";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <PrivateRoute component={Test} />
        </Route>
        <Route exact path='/incompatible' component={Incompatible} />
        <PrivateRoute exact path='/test' component={Test} />
        <PrivateRoute exact path='/test/ok' component={TestOk} />
      </Switch>
    </Router>
  );
}

export default App;
