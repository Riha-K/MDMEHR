import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Selector from "./Selector";

export default function Main({
  setArchetype,
  archetypeLoaded,
  setArchetypeLoaded,
}) {

  // have all archetypes
  const [allArchetypes, setAllArchetypes] = useState({});


  // state of dropdown list
  const [availableRmTypes, setAvailableRmTypes] = useState([]);
  const [availableArchetypes, setAvailableArchetypes] = useState([]);

  // state of two input fields
  const [rmType, setRmType] = useState("");
  const [archetypeId, setArchetypeId] = useState("");

  // for url navigation
  const navigate = useNavigate();

  useEffect(() => {
    function fetchAvailableArchetypes() {
      fetch(`Archetypes.json`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((Archetypes) => {
          return Archetypes.json();
        })
        .then((Archetypes) => {
          setAvailableRmTypes(Object.keys(Archetypes));
          setRmType(Object.keys(Archetypes)[0]);
          setAvailableArchetypes(Archetypes[Object.keys(Archetypes)[0]]);
          setArchetypeId(Archetypes[Object.keys(Archetypes)[0]][0]);
          setAllArchetypes({ ...Archetypes });
        });
    }
    fetchAvailableArchetypes();
  }, []);

  

  function handleFileSubmission() {
    navigate(`/archetype/${rmType}/${archetypeId}`)
  }

  function onRmTypeChangeHandler(e) {
    setRmType(e.target.value);
    setAvailableArchetypes(allArchetypes[e.target.value]);
    setArchetypeId(allArchetypes[e.target.value][0]);
  }

  function onArchetypeChangeHandler(e) {
    setArchetypeId(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleFileSubmission();
    }
  }

  return (
    <>
      <div className="row border rounded m-2"  onKeyDown={handleKeyDown}>
        <div className="col-sm-5">
          <div className="input-group m-3">
            <span className="input-group-text" id="basic-addon1">
              Resource Type
            </span>

            <Selector
              value={rmType}
              onValueChangeHandler={onRmTypeChangeHandler}
              options={availableRmTypes}
            />
          </div>
        </div>
        <div className="col-sm-5">
          <div className="input-group m-3" onKeyDown={handleKeyDown}>
            <span className="input-group-text" id="basic-addon1">
              Archetype File
            </span>

            <Selector
              value={archetypeId}
              onValueChangeHandler={onArchetypeChangeHandler}
              options={availableArchetypes}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-10 text-center">
        <button
          className="btn btn-secondary"
          type="button"
          id="inputGroupFileAddon04"
          onClick={handleFileSubmission}
        >
          Submit
        </button>
      </div>
    </>
  );
}
