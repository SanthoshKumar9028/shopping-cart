import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Honors from "./components/Honors";
import Products from "./features/products/Products";
import CartProducts from "./features/cart/Cart";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Banner />
          <Honors />
        </Route>

        <Route path="/products" component={Products} />
        <Route path="/cart" component={CartProducts} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
