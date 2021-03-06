import React, { useState } from "react";
import "../css/SearchBox.css";
import { Link, navigate } from "gatsby";

import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { BiMicrophone } from "@react-icons/all-files/bi/BiMicrophone";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import Typing from "react-typing-animation";
import ReactTooltip from "react-tooltip";

// component containing typing animation
const WelcomeMessage = React.memo(() => {
  return (
    <Typing className="welcome-message">
      <span>Welcome to Terry's website!</span>
      <Typing.Delay ms={1000} />
      <Typing.Backspace count={43} />
      <span>Search about me here!</span>
      <Typing.Delay ms={1000} />
      <Typing.Backspace count={45} />
    </Typing>
  );
});

// component containing search icon, input, and mic icon
const SearchBoxInput = ({
  setFocused,
  pages,
  setPageSuggestions,
  handleSubmit,
  searchString,
  setSearchString,
}) => {
  return (
    <div className="input-container" id="search-tour">
      <AiOutlineSearch size={23} color="rgba(0,0,0,0.4)" />
      <input
        className="input"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(event) => {
          setPageSuggestions(
            pages.filter((page) =>
              page.toLowerCase().includes(event.target.value.toLowerCase())
            )
          );
          setSearchString(event.target.value);
        }}
        onKeyPress={handleSubmit}
        value={searchString}
      />
      <Link to="/voice-search">
        <BiMicrophone
          size={20}
          color="rgba(0,0,0,0.4)"
          data-tip="Search by voice"
        />
        <ReactTooltip place="bottom" effect="solid" />
      </Link>
    </div>
  );
};

// main component
const SearchBox = ({ stepsEnabled, setStepsEnabled, onHome = true }) => {
  const pages = ["About Me", "Adventure", "Project", "Resume"];

  const [pageSuggestions, setPageSuggestions] = useState(pages);
  const [typing, setTyping] = useState(true);
  const [focused, setFocused] = useState(false);
  const [searchString, setSearchString] = useState("");

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      if (pageSuggestions[0])
        navigate(`/${pageSuggestions[0].toLowerCase().replace(" ", "-")}`);
      else
        navigate("/404", {
          state: { searchString },
        });
    }
  };

  return (
    <>
      <div
        className="search-box-container"
        onClick={() => setTyping(false)}
        onKeyDown={() => setTyping(false)}
        role="button"
        tabIndex="0"
      >
        <SearchBoxInput
          setFocused={setFocused}
          setPageSuggestions={setPageSuggestions}
          handleSubmit={handleSubmit}
          pages={pages}
          searchString={searchString}
          setSearchString={setSearchString}
        />
        {typing && onHome ? <WelcomeMessage /> : null}
        <div className="history-container">
          {pageSuggestions.length ? (
            <div className="horizontal-rule"></div>
          ) : null}
          {pageSuggestions.map((page, i) => (
            <Link
              className="history"
              key={i}
              to={`/${page.toLowerCase().replace(" ", "-")}`}
            >
              <AiOutlineClockCircle color="grey" />{" "}
              <span className="history-text">{page}</span>
            </Link>
          ))}
        </div>
      </div>
      {!focused && onHome ? (
        <div
          className="instruction-button"
          onClick={() => setStepsEnabled(!stepsEnabled)}
          onKeyDown={() => setStepsEnabled(!stepsEnabled)}
          tabIndex="0"
          role="button"
        >
          How to Use
        </div>
      ) : null}
    </>
  );
};

export default SearchBox;
