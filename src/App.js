import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Navbar from "./components/Navbar";
import Test from "./components/Test";
import Incompatible from "./components/Incompatible";
import TestOk from "./components/TestOk";
import TestBad from "./components/TestBad";
import PrivateRoute from "./components/PrivateRoute";
import { SquaresProviders } from "./provider/squareProvider";
import { FullScreenProviders } from "./provider/fullScreenProvider";
import { ModalProvider } from "./provider/modalProvider";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <ModalProvider>
            <FullScreenProviders>
              <SquaresProviders>
                <Route exact path='/'>
                  <PrivateRoute component={Test} />
                </Route>
                <Route exact path='/incompatible' component={Incompatible} />
                <PrivateRoute
                  exact
                  path='/test/:idTouch/:timestap'
                  component={Test}
                />
                <PrivateRoute exact path='/test-accept' component={TestOk} />
                <PrivateRoute exact path='/test-bad' component={TestBad} />
              </SquaresProviders>
            </FullScreenProviders>
          </ModalProvider>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
