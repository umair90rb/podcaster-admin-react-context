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
          console.log(doc.data().docs);
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
            <th>Id</th>
            <th>Docs</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {podcasters.map((podcaster) => (
            <tr key={podcaster.id}>
              <td>{podcaster.data().email}</td>
              <td>{podcaster.data().experties}</td>
              <td>
                <a target="_blank" href={podcaster.data().id}>
                  Id
                </a>
              </td>
              <td>
                {podcaster.data().docs != undefined &&
                  podcaster.data().docs.map((d) => (
                    <ul>
                      <li>
                        <a target="_blank" href={d}>
                          Doc
                        </a>
                      </li>
                    </ul>
                  ))}
              </td>
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
