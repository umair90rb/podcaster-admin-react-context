import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Table, Button } from "react-bootstrap";
import { useData } from "../context/DataContext";

function Podcasters(props) {
  const { mentors } = useData();
  const [podcasters, setPodcasters] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = db
      .collection("profile")
      .where("type", "==", "podcaster")
      .onSnapshot((querySnapshot) => {
        var mentors = [];
        querySnapshot.forEach((doc) => {
          mentors.push(doc);
        });
        setPodcasters(mentors);
      });
    return () => {
      unsubscribe();
    };
  }, [podcasters]);

  async function handlePodcasterApprovel(docId) {
    try {
      await db.collection("profile").doc(docId).set(
        {
          approved: true,
        },
        { merge: true }
      );
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Experties</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {podcasters.map((podcaster) => (
            <tr key={podcaster.id}>
              <td>{podcaster.data().email}</td>
              <td>{podcaster.data().experties}</td>
              <td>
                <Button
                  disabled={
                    "approved" in podcaster.data() &&
                    podcaster.data().approved === true
                      ? true
                      : false
                  }
                  onClick={async () => {
                    console.log(podcaster.status);
                    await handlePodcasterApprovel(podcaster.id);
                  }}
                >
                  {"approved" in podcaster.data() &&
                  podcaster.data().approved === true
                    ? "Approved"
                    : "Approve"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Podcasters;
