import React, { useState, useEffect } from "react";
import "../../App.css";
import "./authPages.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../services/authServices";

export default function UserPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    authServices.register(username, password, email).then(
      (response) => {
        localStorage.setItem("navbarUpdate", true);
        navigate("/login");
      },
      (error) => {
        setError("Registration was not successful!");
      }
    );
  };

  return (
    <>
      <div className="container">
        <div className="form">
          <h1>Register form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={true}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </Form.Group>
            <p className="error-message">{error}</p>
            <Button type="submit">Register</Button>
            <Link className="form-help" to="/login">
              If you are registed, use this instead!
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
}
