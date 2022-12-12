import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import routesServices from "../../services/routesService";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function EditDriverPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    getRoute();
  }, []);
  async function getRoute() {
    var route = await routesServices.getRoute(location.state.routeId);
    setFrom(route.from);
    setTo(route.to);
    setTime(route.time);
    setPrice(route.price);
  }
  const handleNavigate = () => {
    navigate("/admin/routes");
  };
  const handleEdit = async (event) => {
    event.preventDefault();
    
      if (from.length >= 3 && to.length >= 3) {
        routesServices
          .updateRoute(from, to,time,price,location.state.routeId)
          .then((response) => {
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
            <h2>Edit route</h2>
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
