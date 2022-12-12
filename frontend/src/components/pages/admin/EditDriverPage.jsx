import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import driversService from "../../services/driversService";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function EditDriverPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startedDriving, setStartedDriving] = useState("");
  const [startedWorking, setStartedWorking] = useState("");
  useEffect(() => {
    getDriver();
  }, []);
  async function getDriver() {
    var driver = await driversService.getDriver(location.state.driverId);
    setFirstName(driver.firstName);
    setLastName(driver.lastName);
    setStartedDriving(driver.startedDriving);
    setStartedWorking(driver.startedWorking);
  }
  const handleNavigate = () => {
    navigate("/admin/drivers");
  };
  const handleEdit = async (event) => {
    event.preventDefault();
    
      if (firstName.length >= 3 && lastName.length >= 3) {
        driversService
          .updateDriver(firstName, lastName,startedDriving,startedWorking,location.state.driverId)
          .then((response) => {
            setError("");
            navigate("/admin/drivers");
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
            <h2>Edit Driver</h2>
          </div>
          <div className="pages-container-info-form">
          <Form>
              <Form.Group size="lg" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="startedDriving">
                <Form.Label>Started driving</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={startedDriving}
                  onChange={(e) => setStartedDriving(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="startedWorking">
                <Form.Label>Started working</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={startedWorking}
                  onChange={(e) => setStartedWorking(e.target.value)}
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
