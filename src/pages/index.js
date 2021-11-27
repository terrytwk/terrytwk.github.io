import React, { useState } from "react";
import "../css/index.css";
import terry_logo from "../images/terry_logo.png";

import OutsideClickHandler from "react-outside-click-handler";
import "intro.js/introjs.css";
import { Steps } from "intro.js-react";

import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import DropdownMenu from "../components/DropdownMenu";

const IndexPage = () => {
  const [dropdownShow, setDropdownShow] = useState(false);

  // for guided tour
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const [initialStep, setInitialStep] = useState(0);
  const [steps, setSteps] = useState([
    { element: "#tmail-tour", intro: "Send email to Terry using Tmail." },
    { element: "#links-tour", intro: "Checkout Terry's links." },
    {
      element: "#signin-tour",
      intro: "Let Terry know you visited his website.",
    },
    { element: "#search-tour", intro: "Search about Terry." },
  ]);

  return (
    <div className="index-container">
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={() => setStepsEnabled(false)}
      />
      <OutsideClickHandler onOutsideClick={() => setDropdownShow(false)}>
        <Header dropdownShow={dropdownShow} setDropdownShow={setDropdownShow} />
        {dropdownShow ? <DropdownMenu /> : null}
      </OutsideClickHandler>
      <img src={terry_logo} alt="terry_logo" height="15%" className="logo" />
      <SearchBox
        stepsEnabled={stepsEnabled}
        setStepsEnabled={setStepsEnabled}
      />
    </div>
  );
};

export default IndexPage;
