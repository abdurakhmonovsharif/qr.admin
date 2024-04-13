import { Switch, Route, Redirect } from "react-router-dom";
import Users from "./pages/Users";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Products from "./pages/Products";
import Themes from "./pages/Themes";
export const base_url = "http://localhost:8080/api/";
export const client_base_url = "http://localhost:5173/";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/users" component={Users} />
          <Route exact path="/themes" component={Themes} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/products/:id" component={Products} />
          <Redirect from="*" to="/users" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
