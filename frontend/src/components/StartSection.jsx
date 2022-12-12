import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import "../App.css";
import "./StartSection.css";
import InfoModal from "./Modal";

function StartSection() {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(localStorage.getItem("role"));
  }, []);
  return (
    <>
      <div className="hero-container">
        <h1>Dispatch center</h1>
        <p>
          Track your work and your workers
        </p>
        {user === undefined || user === null ? (
          <div className="hero-btns">
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              link="/sign-up"
            >
              GET STARTED
            </Button>
          </div>
        ) : null}
        <InfoModal />
      </div>
    </>
  );
}

export default StartSection;
