import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loggedIn, login } from "../../services/authServices";

function Login() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [body, setBody] = useState({
    username: "",
    password: "",
  });

  if (loggedIn || success) {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await login(body);

    setErrorMessage(res.error);
    setBody(res.body);
    setLoading(res.loading);
    setSuccess(res.success);

    if (res.success) {
      window.location.reload();
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Link
        to="/"
        className="btn btn-secondary position-fixed top-0 start-0 m-2"
      >
        Home
      </Link>
      <form onSubmit={handleSubmit} className="p-4 bg-dark text-light rounded">
        <h2 className="text-center mb-3">Admin Login</h2>
        {errorMessage && (
          <div className="alert alert-danger p-2 mb-3" role="alert">
            {errorMessage}
          </div>
        )}
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
        <button
          type="submit"
          className="btn btn-primary d-block mx-auto"
          disabled={loading}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
