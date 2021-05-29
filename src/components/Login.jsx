import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { db } from "../firebase";
import SignUp from "./SignUp";

function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, logout } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      setError("");
      var admin = await db
        .collection("admin")
        .where("email", "==", emailRef.current.value)
        .get();
      if (admin.docs[0] === undefined) {
        setError("You are not admin!");
        setLoading(false);
      } else {
        console.log(admin.docs[0] === undefined);
        await login(emailRef.current.value, passwordRef.current.value);
        setLoading(false);
        return history.push("/");
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="w-80" style={{ minWidth: "400px" }}>
      <Card className="mt-5">
        <Card.Body>
          <h2>Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="passwrod">
              <Form.Label>Passwrod</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <p className="float-right">
              Forget Password? <Link to="/reset-password">Reset Password</Link>
            </p>
            <Button disabled={loading} type="submit" className="w-100">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      {/* <div className="w-100 text-center mt-2">
        Need and account? <Link to="/signup">Sign Up</Link>
      </div> */}
    </div>
  );
}

export default Login;
