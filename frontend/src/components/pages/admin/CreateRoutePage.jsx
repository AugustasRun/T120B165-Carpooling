import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import animalService from "../../services/routesService";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function CreateDriverPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");

  const handleNavigate = () => {
    navigate("/admin/routes");
  };
  const handleEdit = async (event) => {
    event.preventDefault();
    
      if (from.length >= 3 && to.length >= 3) {
        animalService.createAnimal(from, to,time,price).then((response) => {
          setError("");
          navigate("/admin/routes");
        });
      } else {
        setError("Write atleast 3 letters!");
      }
    
  };

  return (
    <>
      <div className="pages-container">
        <div className="pages-container-info">
          <div className="pages-container-info-header">
            <Button
              type="submit"
              className="button-back"
              onClick={handleNavigate}
            >
              Back
            </Button>
            <h2>Register driver</h2>
          </div>
          <div className="pages-container-info-form">
            <Form>
              <Form.Group size="lg" controlId="from">
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="to">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="time">
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <p className="error-message">{error}</p>
              <br />
              <Button
                type="submit"
                className="button-confirm"
                onClick={handleEdit}
              >
                Confirm
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
