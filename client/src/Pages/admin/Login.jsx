import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Login({ setShowNavbar }) {
  const [success, setSuccess] = useState(false);
  const [body, setBody] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    setShowNavbar(false);
  });

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (body.username === "abdullahadel" && body.password === "admin123") {
      console.log(body);
      setSuccess(true);
    }

    setBody({
      username: "",
      password: "",
    });
  };

  return success ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <form onSubmit={handleSubmit} className="p-4 bg-dark text-light rounded">
        <h2 className="text-center mb-3">Admin Login</h2>
        <div className="mb-3">
          <label htmlFor="username" className="form-label mb-1">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            id="username"
            onChange={handleChange}
            value={body.username}
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label mb-1">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={handleChange}
            value={body.password}
            placeholder="Password"
            required
            autoComplete="on"
          />
        </div>
        <button type="submit" className="btn btn-primary d-block mx-auto">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
