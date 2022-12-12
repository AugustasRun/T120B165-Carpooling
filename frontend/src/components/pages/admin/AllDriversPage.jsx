import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import animalService from "../../services/driversService";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

export default function AllDriversPage() {
  const [animals, setAnimals] = useState([]);
  const [user, setUser] = useState();
  const [update, setUpdate] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getAnimals();
    return () => {
      getAnimals();
      setUpdate(false);
    };
  }, [update]);
  async function getAnimals() {
    var animals = await animalService.getDrivers();
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
    
    setAnimals(animals);
  }
  const handleEdit = async (event) => {
    event.preventDefault();
    navigate("edit", {
      state: { animalId: event.target.value },
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
    await animalService.deleteAnimal(event.target.value);
    setUpdate(true);
  };
  const handleVisits = async (event) => {
    event.preventDefault();
    navigate("visits", {
      state: { animalId: event.target.value },
    });
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
          {animals.length !== 0 ? (
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">First name</div>
                <div className="col col-2">Last name</div>
                <div className="col col-3">Started driving</div>
                <div className="col col-4">Started working</div>
                <div className="col col-5">Options</div>
              </li>
              {animals.map((animal) => {
                return (
                  <li className="table-row" key={animal.id}>
                    <div
                      className="col col-1"
                      data-label="Name"
                      data-key={animal.firstName}
                    >
                      {animal.firstName}
                    </div>
                    <div
                      className="col col-2"
                      data-label="C"
                      data-key={animal.lastName}
                    >
                      {animal.lastName}
                    </div>
                    <div
                      className="col col-3"
                      data-label="C"
                      data-key={animal.startedDriving}
                    >
                      {animal.startedDriving}
                    </div>
                    <div
                      className="col col-4"
                      data-label="C"
                      data-key={animal.startedWorking}
                    >
                      {animal.startedWorking}
                    </div>
                    <div className="col col-5" data-label="Options">
                      <button
                        className="button-edit"
                        onClick={handleEdit}
                        value={animal.id}
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        className="button-delete"
                        value={animal.id}
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
