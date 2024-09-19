import React, { useEffect, useState } from "react";
import Selector from "./Selector";


function Plaintext({input, value, setValue, enabled}) {
  input.value = ""

  async function onValueChangeHandler(e) {
    await setValue(e.target.value);
    input.value = e.target.value;
  }
  
  return (
    <input
      type="text"
      className="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      disabled = {!enabled}
      value={value}
      onChange={onValueChangeHandler}
    />
  );
}

function CodedText({ ln, input, value, setValue, enabled }) {
  let options = input.list.map((ele) =>
    ele.localizedLabels ? ele.localizedLabels[ln] : ele.label
  )
  options = ["", ...options]
  async function onValueChangeHandler(e) {
    await setValue(e.target.value);
    input.value = e.target.value;
  }
  return (
    <Selector
      value={value}
      onValueChangeHandler={onValueChangeHandler}
      enabled = {enabled}
      options={options}
    />
  );
}

function DateTime({input, value, setValue, enabled}) {
  input.value = ""
  async function onValueChangeHandler(e) {
    await setValue(e.target.value);
    input.value = e.target.value;
  }
  return (
    <input
      type="datetime-local"
      className="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      disabled = {!enabled}
      value={value}
      onChange={onValueChangeHandler}
    />
  );
}

function Decimal({input, value, setValue, enabled}) {
  input.value = value
  async function onValueChangeHandler(e) {
    await setValue(e.target.value);
    input.value = e.target.value;
  }
  return (
    <input
      type="number"
      className="form-control"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-sm"
      disabled = {!enabled}
      value={value}
      onChange={onValueChangeHandler}
    />
  );
}

function SubInput({ index, ln, input, enabled }) {
  const [value, setValue] = useState("")
  useEffect(()=>{
    (async () => {
      if (!enabled){
        await setValue("")
        input.value = ""
      }
    })()
  }, [enabled, input, setValue])

  const fieldTypes = {
    "DECIMAL": <Decimal key={index} index={index} input={input} ln={ln} enabled={enabled} value = {value} setValue = {setValue}/>,
    "CODED_TEXT": input.list ? <CodedText key={index} index={index} input={input} ln={ln} enabled={enabled} value={value} setValue={setValue}/> 
                      : <Plaintext key={index} input={input} ln={ln} enabled={enabled} value = {value} setValue = {setValue}/>,
    "TEXT": <Plaintext key={index} index={index} input={input} ln={ln} enabled={enabled} value = {value} setValue = {setValue}/>,
    "DATETIME": <DateTime key={index} index={index} input={input} ln={ln} enabled={enabled} value = {value} setValue = {setValue}/>

  };
  return (
    <>
  {/* <div className="col-sm-2"> */}
    {fieldTypes[input.type] ? fieldTypes[input.type] : <Plaintext index={index} input={input} ln={ln} value = {value} setValue = {setValue} enabled={enabled}/>}
   {/* </div> */}
  </>
  );

  // return 
}
export default function InputComp({ child, ln }) {
  const [enabled, setEnabled] = useState(true)

  async function handleButtonToggle(e) {
    await setEnabled(prev=>!prev)
  }


  if (child.children !== undefined)
   {
    return (
      <>
        <div key={child.id} className="row py-2">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title pb-2">
                  {child.localizedNames && child.localizedNames[ln]
                    ? child.localizedNames[ln]
                    : child.name
                    ? child.name
                    : child.id}
                </h5>
                <div className="card-text">
                  <ul className="list-group list-group-flush">
                    {child.children.map((child) => {
                      return <InputComp key={child.id} ln={ln} child={child} />;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div key={child.id} className="input-group input-group-sm mb-3">
        <button 
        className="input-group-text"
        id="inputGroup-sizing-sm"
        aria-disabled={!enabled}
        onClick={handleButtonToggle}
        >
          {child.localizedNames && child.localizedNames[ln]
            ? child.localizedNames[ln]
            : child.name
            ? child.name
            : child.id}
        </button>
        {child.inputs ? child.inputs.map((input, index) => 
          <SubInput key={index} input={input} enabled = {enabled} ln={ln} />
          ) : <SubInput ln={ln} input = {child} enabled = {enabled}/>
        }
      </div>
    </>
  );
}
