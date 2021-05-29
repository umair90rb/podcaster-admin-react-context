import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function UpdateProfile(props) {
  return (
    <div className="w-80" style={{ minWidth: "400px" }}>
      <Card className="mt-5">
        <Card.Body>
          <p>No profile update option available.</p>
          <Link to="/">Home</Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UpdateProfile;
