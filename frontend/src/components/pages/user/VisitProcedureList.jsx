import React, { useEffect, useState } from "react";
import "../registeredPages.scss";
import { useLocation, useNavigate } from "react-router-dom";
import procedureServices from "../../services/procedureServices";

export default function VisitProcedureListEmployee() {
  const location = useLocation();
  const [procedures, setProcedures] = useState([]);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getProcedures();
  }, []);

  async function getProcedures() {
    var procedures = await procedureServices.getProcedures(
      location.state.animalId,
      location.state.visitId
    );
    setProcedures(procedures);
    let temp = 0;
    procedures.map((procedure) => {
      temp += parseInt(procedure.cost);
    });
    setPrice(temp);
  }
  const handleNavigate = () => {
    navigate("/user/useranimals/visits", {
      state: { animalId: location.state.animalId },
    });
  };

  return (
    <>
      <div className="pages-container">
        <div className="pages-container-info">
          <div className="pages-container-info-header">
            <button className="button-new" onClick={handleNavigate}>
              {" "}
              Back
            </button>
            <h2>Here you can find procedure history for the selected animal</h2>
          </div>
          {price !== 0 ? (
            <h3>
              Total visit cost - <b>{price}</b> €
            </h3>
          ) : null}
          {procedures.length !== 0 ? (
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-1-visit">Procedure</div>
                <div className="col col-2-visit">Description</div>
                <div className="col col-3-visit">Price</div>
              </li>
              {procedures.map((procedure) => {
                //
                return (
                  <li className="table-row" key={procedure.id}>
                    <div
                      className="col col-1-visit"
                      data-label="Name"
                      data-key={procedure.name}
                    >
                      {procedure.name}
                    </div>
                    <div
                      className="col col-2-visit"
                      data-label="Description"
                      data-key={procedure.description}
                    >
                      {procedure.description}
                    </div>
                    <div
                      className="col col-3-visit"
                      data-label="Price"
                      data-key={procedure.cost}
                    >
                      {procedure.cost} €
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h1>Sorry, we could not find any procedure history </h1>
          )}
        </div>
      </div>
    </>
  );
}
