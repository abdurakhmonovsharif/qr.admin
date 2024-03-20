/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Products from "./pages/Products";
import Themes from "./pages/Themes";
import { useEffect } from "react";
export const base_url = "http://localhost:8080/api/";
export const client_base_url = "http://localhost:5173/";
// https://qr-me-backend.onrender.com/api/
function App() {
  return (
    <div className="App">
      <Switch>
        {/* <Route path="/sign-up" exact component={SignUp} /> */}
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
