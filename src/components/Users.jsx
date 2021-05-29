import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Table, Button, Badge } from "react-bootstrap";

import { useData } from "../context/DataContext";

function Users(props) {
  const { users } = useData();
  const [usrs, setUsrs] = useState(users);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   async function getPaymentRequests() {
  //     try {
  //       const result = await db.collection("profile").get();
  //       setUsers(result.docs);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   }
  //   getPaymentRequests();
  // }, []);

  return (
    <>
      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Package Bought At</th>
            <th>Remaining Talktime</th>
            <th>Age</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {usrs.map((podcaster) => (
            <tr key={podcaster.id}>
              <td>{podcaster.data().email}</td>
              <td>
                {!podcaster.data().packageBoughtAt
                  ? "No package bought"
                  : Date(podcaster.data().packageBoughtAt)}
              </td>
              <td>
                {!podcaster.data().talkTime ? 0 : podcaster.data().talkTime}
              </td>
              <td>{podcaster.data().age}</td>
              <td>
                {"type" in podcaster.data() &&
                podcaster.data().type === "podcaster" ? (
                  <Badge variant="success">Mentors</Badge>
                ) : (
                  <Badge variant="primary">User</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Users;
