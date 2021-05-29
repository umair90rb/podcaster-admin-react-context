import React, { useContext, useState, useEffect } from "react";
import { db } from "../firebase";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [earning, setEarning] = useState(0);
  const [mentors, setMentors] = useState([]);
  const [mentorAppBugs, setMentorAppBugs] = useState([]);
  const [userAppBugs, setUserAppBugs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection("profile")
      .get()
      .then((users) => {
        const mentors = users.docs.filter(
          (user) => user.data().type === "podcaster"
        );
        setMentors(mentors);
        setUsers(users.docs);
      });
    db.collection("paymentRequests")
      .get()
      .then((payments) => {
        setPaymentRequests(payments.docs);
      });
    db.collection("bugs")
      .get()
      .then((bugs) => {
        var mentorBugs = [];
        var userBugs = [];
        bugs.docs.map((bug) => {
          if (bug.data().app === "mentor") {
            mentorBugs.push(bug);
          } else if (bug.data().app === "user") {
            userBugs.push(bug);
          }
        });
        setUserAppBugs(userBugs);
        setMentorAppBugs(mentorBugs);
      });
    db.collection("transaction")
      .get()
      .then((trans) => {
        var earning = 0;
        trans.docs.map((transaction) => {
          earning += parseFloat(transaction.data().amount);
        });
        setTransactions(trans.docs);
        setEarning(earning);
        setLoading(false);
      });
  }, []);

  const value = {
    users,
    mentors,
    userAppBugs,
    mentorAppBugs,
    paymentRequests,
    transactions,
    earning,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
}
