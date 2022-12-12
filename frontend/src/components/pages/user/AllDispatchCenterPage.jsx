import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import dispatchService from "../../services/dispatchServices";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

export default function AllDispatchCenterPage() {
  const [dispatchCenters, setDispatchCenters] = useState([]);
  const [user, setUser] = useState();
  const [update, setUpdate] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getDispatchCenters();
    return () => {
      getDispatchCenters();
      setUpdate(false);
    };
  }, [update]);
  async function getDispatchCenters() {
    var dispatchCenters = await dispatchService.getDispatchCenters();
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser);
    
    setDispatchCenters(dispatchCenters);
  }
  const handleEdit = async (event) => {
    event.preventDefault();
    navigate("edit", {
      state: { dispatchCenterId: event.target.value },
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
    await dispatchService.deleteDispatchCenter(event.target.value);
    setUpdate(true);
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
          {dispatchCenters.length !== 0 ? (
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1">Dispatch Center Name</div>
                <div className="col col-2">City</div>
                <div className="col col-5">Options</div>
              </li>
              {dispatchCenters.map((dispatchCenter) => {
                return (
                  <li className="table-row" key={dispatchCenter.id}>
                    <div
                      className="col col-1"
                      data-label="Name"
                      data-key={dispatchCenter.name}
                    >
                      {dispatchCenter.name}
                    </div>
                    <div
                      className="col col-2"
                      data-label="City"
                      data-key={dispatchCenter.city}
                    >
                      {dispatchCenter.city}
                    </div>
                    <div className="col col-5" data-label="Options">
                      <button
                        className="button-edit"
                        onClick={handleEdit}
                        value={dispatchCenter.id}
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        className="button-delete"
                        value={dispatchCenter.id}
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
