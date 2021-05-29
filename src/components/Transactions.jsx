import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Table, Button } from "react-bootstrap";
import { useData } from "../context/DataContext";

function Transactions(props) {
  const { transactions } = useData();

  const [trans, setTrans] = useState(transactions);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   async function getPaymentRequests() {
  //     try {
  //       const result = await db.collection("transaction").limit(10).get();
  //       const data = [];
  //       result.docs.map((doc) => data.push(doc.data()));
  //       setTransactions(data);
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
            <th>Amount</th>
            <th>At</th>
            <th>User Id</th>
          </tr>
        </thead>
        <tbody>
          {trans.map((transaction) => (
            <tr key={transaction.data().at.seconds}>
              <td>${transaction.data().amount}</td>
              <td>{Date(transaction.data().at)}</td>
              <td>{transaction.data().by}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Transactions;
