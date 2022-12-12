import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import routesServices from "../../services/routesService";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

export default function RegisteredDispatchCenterPage() {
  const [routes, setRoutes] = useState([]);
  const [user, setUser] = useState();
  const [update, setUpdate] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getRoutes();
    return () => {
      getRoutes();
      setUpdate(false);
    };
  }, [update]);
  async function getRoutes() {
    var routes = await routesServices.getRoutes();
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
    
    setRoutes(routes);
  }
  const handleEdit = async (event) => {
    event.preventDefault();
    navigate("edit", {
      state: { routeId: event.target.value },
    });
  };
  const handleCreate = async (event) => {
    event.preventDefault();
    navigate("create");
  };
  const confirmWindow = (event) => {
    confirmAlert({
      title: "Confirm deletion",
      message: "This action can not be undone!",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(event),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleDelete = async (event) => {
    event.preventDefault();
    await routesServices.deleteRoute(event.target.value);
    setUpdate(true);
  };

  return (
    <>
      <div className="pages-container">
        <div className="pages-container-info">
          <div className="pages-container-info-header">
            <h2>Here you can find all registered route</h2>
            <button className="button-new" onClick={handleCreate}>
              {" "}
              Register new route
            </button>
          </div>
          {routes.length !== 0 ? (
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">From</div>
                <div className="col col-2">To</div>
                <div className="col col-3">Time</div>
                <div className="col col-4">Price</div>
                <div className="col col-5">Options</div>
              </li>
              {routes.map((route) => {
                return (
                  <li className="table-row" key={route.id}>
                    <div
                      className="col col-1"
                      data-label="From"
                      data-key={route.from}
                    >
                      {route.from}
                    </div>
                    <div
                      className="col col-2"
                      data-label="C"
                      data-key={route.to}
                    >
                      {route.to}
                    </div>
                    <div
                      className="col col-3"
                      data-label="C"
                      data-key={route.time}
                    >
                      {route.time}
                    </div>
                    <div
                      className="col col-4"
                      data-label="C"
                      data-key={route.price}
                    >
                      {route.price}
                    </div>
                    <div className="col col-5" data-label="Options">
                      <button
                        className="button-edit"
                        onClick={handleEdit}
                        value={route.id}
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        className="button-delete"
                        value={route.id}
                        onClick={confirmWindow}
                      >
                        {" "}
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h1>Sorry, we could not find any routes </h1>
          )}
        </div>
      </div>
    </>
  );
}
