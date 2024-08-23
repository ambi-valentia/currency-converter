import { useEffect, useState } from "react";
import classes from "./converter.module.scss";
import { UiInput, UiSelect } from "../components";
import { url } from "../constants/urls";
import { currencies, initRates } from "../constants/currenciesRates";

const currencyOptions = Object.values(currencies).map((label, index) => ({
  label: `${Object.keys(currencies)[index] + " - " + label}`,
  value: Object.keys(currencies)[index],
}));

export function Converter() {
  const [amount, setAmount] = useState<number>(1);
  const [result, setResult] = useState<number>();
  const [rates, setRates] = useState<{ [currency: string]: number }>(initRates);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getRates() {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("error");
        }
        const json = await response.json();
        setRates(json.rates);
      } catch (error) {
        alert((error as Error).message);
      }
    }

    getRates();
  }, []);

  useEffect(() => {
    if (from && to && amount) setResult((amount / rates[from]) * rates[to]);
  }, [rates, from, to, amount]);

  return (
    <div className={classes.container}>
      <div className={classes.welcome}>
        Welcome to <span className={classes.name}>Currency Converter</span>
      </div>
      <div className={classes.converter__wrapper}>
        <UiInput
          placeholder="Amount"
          type="number"
          error={error}
          value={amount?.toString()}
          onKeyDown={(e) =>
            ["E", "e", "-", "+"].includes(e.key) && e.preventDefault()
          }
          onChange={(e) => {
            setAmount(Number(e.target.value));
            if (!e.target.value) setError(true);
            else setError(false);
          }}
        />
        <UiSelect
          options={currencyOptions}
          selected={{value: from, label: `${from + ' - ' + currencies[from]}`}}
          placeholder="From"
          onChange={(val: string) => {
            setFrom(val);
          }}
        />
        <button
          className={classes.button}
          onClick={() => {
            const temp = from;
            setFrom(to);
            setTo(temp);
          }}
        >
          <span className={classes.arrow}>⇆</span>
        </button>
        <UiSelect
          options={currencyOptions}
          selected={{value: to, label: `${to + ' - ' + currencies[to]}`}}
          placeholder="To"
          onChange={(val: string) => {
            setTo(val);
          }}
        />
      </div>
      <div
        className={`${classes.result} ${
          !!amount && result ? classes.result_shown : ""
        }`}
      >
        {result?.toFixed(6)} {to}
        <div className={classes.rate}>
          1 {from}={((1 / rates[from]) * rates[to]).toFixed(5)} {to}
        </div>
        <div className={classes.rate}>
          1 {to}={(rates[from] / rates[to]).toFixed(5)} {from}
        </div>
      </div>
    </div>
  );
}
