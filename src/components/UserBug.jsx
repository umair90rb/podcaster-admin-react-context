import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useData } from "../context/DataContext";

function UserBug(props) {
  console.log("abc");
  const { userAppBugs } = useData();
  const [bugs, setBugs] = useState(userAppBugs);
  const [error, setError] = useState("");

  return (
    <>
      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Bug Reported At</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug.id}>
              <td>{bug.data().email}</td>
              <td>
                {!bug.data().at ? "No time mention" : Date(bug.data().at)}
              </td>
              <td>{bug.data().bugDescription}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserBug;
