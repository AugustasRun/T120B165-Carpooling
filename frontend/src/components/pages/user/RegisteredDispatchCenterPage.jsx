import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import animalService from "../../services/animalServices";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

export default function RegisteredDispatchCenterPage() {
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
    var animals = await animalService.getAnimals();
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
            <h2>Here you can find all registered dispatch centers</h2>
            <button className="button-new" onClick={handleCreate}>
              {" "}
              Register new Dispatch center
            </button>
          </div>
          {animals.length !== 0 ? (
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Dispatch Center Name</div>
                <div className="col col-2">City</div>
                <div className="col col-5">Options</div>
              </li>
              {animals.map((animal) => {
                return (
                  <li className="table-row" key={animal.id}>
                    <div
                      className="col col-1"
                      data-label="Name"
                      data-key={animal.name}
                    >
                      {animal.name}
                    </div>
                    <div
                      className="col col-2"
                      data-label="City"
                      data-key={animal.city}
                    >
                      {animal.city}
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
            <h1>Sorry, we could not find any registered dispatch centers </h1>
          )}
        </div>
      </div>
    </>
  );
}
