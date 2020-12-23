import React, { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [jwt, setJWT] = useState("");

  useEffect(() => {
    setJWT(localStorage.getItem("token"));
  }, [jwt]);

  const handleSubmit = e => {
    e.preventDefault();
    const body = {
      auth: {
        email,
        password
      }
    };
    fetch("/api/v1/user_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        localStorage.setItem("token", response.jwt);
        setJWT(response.jwt);
      })
      .catch(error => console.log(error.message));
  };

  return (
    <div>
      {jwt ? (
        "Logged In"
      ) : (
        <form>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
