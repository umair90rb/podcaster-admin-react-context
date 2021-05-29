import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  FormControl,
  NavDropdown,
  Form,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { NavLink, Link, useHistory } from "react-router-dom";

function Navigation(props) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Comrade Admin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {currentUser !== null && (
          <Nav className="mr-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <NavLink className="nav-link" to="/transactions">
              Transactions
            </NavLink>
            <NavLink className="nav-link" to="/mentors">
              Mentors
            </NavLink>
            <NavLink className="nav-link" to="/users">
              Users
            </NavLink>
            <NavLink className="nav-link" to="/payment-requests">
              Payment Requests
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              Admin Profile
            </NavLink>
            <NavLink className="nav-link" to="/user-app-bugs">
              User App Bugs
            </NavLink>
            <NavLink className="nav-link" to="/mentor-app-bugs">
              Mentor App Bug
            </NavLink>
          </Nav>
        )}
        {currentUser !== null && (
          <Button onClick={handleLogout} variant="outline-success">
            Logout
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;

{
  /* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */
}
