import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";

import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import { DataProvider } from "../context/DataContext";
import Login from "./Login";
import Navigation from "./Navigation";
import Profile from "./Profile";
import Transactions from "./Transactions";
import Podcasters from "./Podcasters";
import Users from "./Users";
import PaymentRequests from "./PaymentRequests";
import UserBug from "./UserBug";
import MentorBug from "./MentorBug";

function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <Navigation />
          <Container className="d-flex align-item-center justify-content-center">
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/mentors" component={Podcasters} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute exact path="/user-app-bugs" component={UserBug} />
              <PrivateRoute
                exact
                path="/mentor-app-bugs"
                component={MentorBug}
              />
              <PrivateRoute
                exact
                path="/payment-requests"
                component={PaymentRequests}
              />
              <PrivateRoute
                exact
                path="/transactions"
                component={Transactions}
              />
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
            </Switch>
          </Container>
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
