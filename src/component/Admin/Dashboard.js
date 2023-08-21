import React, { useEffect, useState } from "react";

const CartDashboard = () => {
  const [carthistory, setcarthistory] = useState([]);
  const [rented, setrented] = useState([]);
  useEffect(() => {
    // Fetch books data from the backend API

    fetch("http://localhost:4000/orders")
      .then((response) => response.json())

      .then((data) => setcarthistory(data))

      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    // Fetch books data from the backend API

    fetch("http://localhost:4000/library")
      .then((response) => response.json())

      .then((data) => setrented(data))

      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log("carthis", carthistory);
  console.log("carthis", rented);
  return <div>{/* <h2>hellloo!!@!!</h2> */}</div>;
};

export default CartDashboard;
