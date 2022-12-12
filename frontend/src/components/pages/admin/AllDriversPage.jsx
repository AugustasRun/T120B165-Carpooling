import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import driversService from "../../services/driversService";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

export default function AllDriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [user, setUser] = useState();
  const [update, setUpdate] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getDrivers();
    return () => {
      getDrivers();
      setUpdate(false);
    };
  }, [update]);
  async function getDrivers() {
    var drivers = await driversService.getDrivers();
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
    
    setDrivers(drivers);
  }
  const handleEdit = async (event) => {
    event.preventDefault();
    navigate("edit", {
      state: { driverId: event.target.value },
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
    await driversService.deleteDriver(event.target.value);
    setDrivers(true);
  };
  return (
    <>
      <div className="pages-container">
        <div className="pages-container-info">
          <div className="pages-container-info-header">
            <h2>Here you can find all registered Drivers</h2>
            <button className="button-new" onClick={handleCreate}>
              {" "}
              Register new Driver
            </button>
          </div>
          {drivers.length !== 0 ? (
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">First name</div>
                <div className="col col-2">Last name</div>
                <div className="col col-3">Started driving</div>
                <div className="col col-4">Started working</div>
                <div className="col col-5">Options</div>
              </li>
              {drivers.map((driver) => {
                return (
                  <li className="table-row" key={driver.id}>
                    <div
                      className="col col-1"
                      data-label="Name"
                      data-key={driver.firstName}
                    >
                      {driver.firstName}
                    </div>
                    <div
                      className="col col-2"
                      data-label="C"
                      data-key={driver.lastName}
                    >
                      {driver.lastName}
                    </div>
                    <div
                      className="col col-3"
                      data-label="C"
                      data-key={driver.startedDriving}
                    >
                      {driver.startedDriving}
                    </div>
                    <div
                      className="col col-4"
                      data-label="C"
                      data-key={driver.startedWorking}
                    >
                      {driver.startedWorking}
                    </div>
                    <div className="col col-5" data-label="Options">
                      <button
                        className="button-edit"
                        onClick={handleEdit}
                        value={driver.id}
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        className="button-delete"
                        value={driver.id}
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
            <h1>Sorry, we could not find any registered drivers </h1>
          )}
        </div>
      </div>
    </>
  );
}
