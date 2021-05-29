import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function SignUp(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      passwordRef.current.value === "" ||
      confirmPasswordRef.current.value === "" ||
      emailRef.current.value === ""
    ) {
      return setError("All field required!");
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Password do not match!");
    }
    setLoading(true);
    try {
      setError("");
      await signUp(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="w-80" style={{ minWidth: "400px" }}>
      <Card className="mt-5">
        <Card.Body>
          <h2>Sign Up</h2>
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
            <Form.Group id="confirmPassword">
              <Form.Label>confirmPassword</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default SignUp;
