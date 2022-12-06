import "./App.css";
import { Fragment, useEffect, useState } from "react";
import CurrencyModule from "./CurrencyModule";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  
  const URL = "https://api.apilayer.com/exchangerates_data/latest";

  var myHeaders = new Headers();
  myHeaders.append("apikey", "nS9xRtJMdd55lWaOpkQdDC3uVKjDS1Mt");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  useEffect(() => {
    fetch(URL, requestOptions)
      .then((res) => res.json())
      .then((data) => setCurrencyOptions([Object.keys(data.rates)]))
      .catch((error) => console.log("error", error));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Fragment>
      <h1>Conversor monetário</h1>
      <div className="container">
        <CurrencyModule currencyOptions={currencyOptions}/>
        <div className="igual">=</div>
        <CurrencyModule currencyOptions={currencyOptions}/>
      </div>
    </Fragment>
  );
}

export default App;
