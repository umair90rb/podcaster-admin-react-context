import React, { useContext } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

function Dashboard(props) {
  const {
    users,
    mentors,
    earning,
    transactions,
    userAppBugs,
    mentorAppBugs,
    paymentRequests,
    calls,
    chats,
  } = useData();
  return (
    <div className="w-100">
      <Row className="mt-5 w-100">
        <Col>
          <Link to="/users">
            <Card bg="success">
              <Card.Body>
                <p className="text-white">Users({users.length}) </p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/podcasters">
            <Card bg="primary">
              <Card.Body>
                <p className="text-white">Mentors({mentors.length})</p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/transactions">
            <Card bg="dark">
              <Card.Body>
                <p className="text-white">
                  Transactions({transactions.length})
                </p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>

      <Row className="mt-5 w-100">
        <Col>
          <Card bg="info">
            <Card.Body>
              <p className="text-white">
                Total Earning(${Math.floor(earning)}){" "}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Link to="/user-app-bugs">
            <Card bg="danger">
              <Card.Body>
                <p className="text-white">
                  User App Bugs({userAppBugs.length})
                </p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/mentor-app-bugs">
            <Card bg="danger">
              <Card.Body>
                <p className="text-white">
                  Mentor App Bug({mentorAppBugs.length})
                </p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
      <Row className="mt-5 w-100">
        <Col>
          <Link to="/payment-requests">
            <Card bg="secondary">
              <Card.Body>
                <p className="text-white">
                  Payment Requests by Menntors({paymentRequests.length})
                </p>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          {/* <Link to="/payment-requests"> */}
          <Card bg="secondary">
            <Card.Body>
              <p className="text-white">Total Call Sessions ({calls.length})</p>
            </Card.Body>
          </Card>
          {/* </Link> */}
        </Col>

        <Col>
          {/* <Link to="/payment-requests"> */}
          <Card bg="secondary">
            <Card.Body>
              <p className="text-white">Total Chat Session ({chats.length})</p>
            </Card.Body>
          </Card>
          {/* </Link> */}
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
