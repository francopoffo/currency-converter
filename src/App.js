import "./App.css";
import { Fragment, useEffect, useState } from "react";
import CurrencyModule from "./CurrencyModule";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

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
      .then((data) => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      })
      .catch((error) => console.log("error", error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurrency}&base=${fromCurrency}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]))
        .catch((error) => console.log("error", error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCurrency, fromCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <Fragment>
      <div className="container">
        <h1>Conversor monetário</h1>
        <CurrencyModule
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className="igual">=</div>
        <CurrencyModule
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </Fragment>
  );
}

export default App;
