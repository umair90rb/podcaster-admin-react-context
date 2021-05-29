import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile(props) {
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const { currentUser, resetPassword } = useAuth();
  const history = useHistory();

  async function handlePasswordReset() {
    try {
      await resetPassword(currentUser.email);
      setStatus("Password link send to your email");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  }

  return (
    <div className="w-80" style={{ minWidth: "400px" }}>
      <Card className="mt-5">
        <Card.Body>
          <h2>Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {status && <Alert variant="success">{status}</Alert>}
          <div>Email : {currentUser.email}</div>
          <Link to="/update-profile" className="btn btn-primary w-100">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button varient="link" onClick={handlePasswordReset}>
          Reset Password
        </Button>
      </div>
    </div>
  );
}

export default Profile;
