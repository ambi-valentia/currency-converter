import { useEffect, useState } from "react";
import classes from "./converter.module.scss";
import { UiInput, UiSelect } from "../components";
import { url } from "../constants/urls";
import { initRates } from "../constants/initRates";

export function Converter() {
  const [amount, setAmount] = useState<number>();
  const [result, setResult] = useState<number>();
  const [rates, setRates] = useState<{ [currency: string]: number }>(initRates);
  const [from, setFrom] = useState("RUB");
  const [to, setTo] = useState("USD");

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
    if (from && to && amount) {
      setResult((amount / rates[from]) * rates[to]);
    }
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
          value={amount?.toString()}
          onKeyDown={(e) =>
            ["E", "e", "-", "+"].includes(e.key) && e.preventDefault()
          }
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <UiSelect
          options={Object.keys(rates)}
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
          options={Object.keys(rates)}
          placeholder="To"
          onChange={(val: string) => {
            setTo(val);
          }}
        />
      </div>
      {result && (
        <div className={classes.result}>
          {result?.toFixed(5)} {to}
          <div className={classes.rate}>
            1 {from}={((1 / rates[from]) * rates[to]).toFixed(3)} {to}
          </div>
          <div className={classes.rate}>
            1 {to}={(rates[from] / rates[to]).toFixed(3)} {from}
          </div>
        </div>
      )}
    </div>
  );
}
