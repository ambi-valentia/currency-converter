import { useState } from "react";
import classes from "./converter.module.scss";
import { UiInput, UiSelect } from "../components";

export function Converter() {
  const [amount, setAmount] = useState<number>();
  const [result, setResult] = useState<number>(100);

  const currencyOptions = [
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    // Add more currencies as needed
  ];

  return (
    <div className={classes.container}>
      <div className={classes.welcome}>
        Welcome to <span className={classes.name}>Currency Converter</span>
      </div>
      <div className={classes.converter__wrapper}>
        <UiInput
          placeholder="Amount"
          type="number"
          value={amount?.toString()}
          onKeyDown={(e) =>
            ["E", "e", "-", "+"].includes(e.key) && e.preventDefault()
          }
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <UiSelect
          options={currencyOptions}
          placeholder="From"
          onChange={(val: string) => {
            console.log("Selected currency:", val);
          }}
        />
        <button className={classes.button}>
          <span className={classes.arrow}>⇆</span>
        </button>
        <UiSelect
          options={currencyOptions}
          placeholder="To"
          onChange={(val: string) => {
            console.log("Selected currency:", val);
          }}
        />
      </div>
      <div className={classes.result}>
        {result.toFixed(5)}
        <div className={classes.rate}>USD=1,000</div>
        <div className={classes.rate}>RUB=1,000</div>
      </div>
    </div>
  );
}
