import React, { useState, useEffect } from "react";
import Login from "./Login";

const App = () => {
  const [jwt, setJWT] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    setJWT(localStorage.getItem("token"));
    fetchData();
  }, [jwt]);

  const fetchData = () => {
    fetch("/api/v1/locations/1", {
      method: "GET",
      headers: {
        Authorization: `Bearer: ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setData(response);
      })
      .catch(error => console.log(error.message));
  };

  return (
    <>
      <Login />
      {jwt ? data.name : ""}
    </>
  );
};

export default App;
