import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import animalService from "../../services/animalServices";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function DispatchCreatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const handleNavigate = () => {
    navigate("/user/dispatchCenters");
  };
  const handleEdit = async (event) => {
    event.preventDefault();
    
      if (name.length >= 3 && city.length >= 3) {
        animalService.createAnimal(name, city).then((response) => {
          setError("");
          navigate("/user/dispatchCenters");
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
            <h2>Register dispatch center</h2>
          </div>
          <div className="pages-container-info-form">
            <Form>
              <Form.Group size="lg" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
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
