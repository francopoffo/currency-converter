import React from "react";

export default function CurrencyModule(props) {
    const { currencyOptions } = props;

  return (
    <div>
      <input type="number"></input>
      <select>
        {currencyOptions.map(option =>(
            <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
