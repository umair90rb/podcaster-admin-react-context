import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { Table } from "react-bootstrap";

function PaymentRequests(props) {
  const { paymentRequests } = useData();
  const [payments, setPayments] = useState(paymentRequests);
  return (
    <>
      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Account</th>
            <th>Earning</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.data().email}</td>
              <td>{payment.data().name}</td>
              <td>{payment.data().account}</td>
              <td>${payment.data().earning}</td>
              <td>{payment.data().detail}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PaymentRequests;
