import { useEffect, useState } from "react";
import classes from "./converter.module.scss";
import { UiInput, UiSelect } from "../components";
import { url } from "../constants/urls";
import { currencies, initRates } from "../constants/currenciesRates";
import { getCountryCodeFromLocale } from "../lib/getCountryFromLocale";
import { countryToCurrency } from "../constants/countryToCurrency";
import { supportsInputTypeNumber } from "../lib/supportsNumberTypeInput";

const currencyOptions = Object.values(currencies).map((label, index) => ({
  label: label,
  value: Object.keys(currencies)[index],
}));

const userLocale = navigator.language || "en-US";
const countryCode = getCountryCodeFromLocale(userLocale);

export function Converter() {
  const [amount, setAmount] = useState<string>("");
  const [result, setResult] = useState<number | null>(0);
  const [rates, setRates] = useState<{ [currency: string]: number }>(initRates);
  const [from, setFrom] = useState<string>(
    countryCode ? countryToCurrency[countryCode] : ""
  );
  const [to, setTo] = useState("");
  const [retry, setRetry] = useState(0);

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
        if (json.rates) setRates(json.rates);
      } catch (error) {
        console.log((error as Error).message);
        if (retry < 1) {
          setTimeout(() => setRetry(retry + 1), 4000); // Retry once
        }
      }
    }

    getRates();
  }, [retry]);

  useEffect(() => {
    if (from && to && amount)
      setResult((Number(amount) / rates[from]) * rates[to]);
  }, [rates, from, to, amount]);

  return (
    <div className={classes.container}>
      <div className={classes.welcome}>
        Welcome to <span className={classes.name}>Currency Converter</span>
      </div>
      <div className={classes.converter__wrapper}>
        {supportsInputTypeNumber() ? (
          <UiInput
            placeholder="Amount"
            type="number"
            value={amount}
            onKeyDown={(e) =>
              ["E", "e", "-", "+"].includes(e.key) && e.preventDefault()
            }
            onChange={(e) => {
              setAmount(e.target.value.replace(/^0+(?=\d)/, ""));
            }}
          />
        ) : (
          <UiInput
            placeholder="Amount"
            type="text"
            value={amount}
            onChange={(e) => {
              const regex = /^(0|[1-9]\d+)(\.\d*)?$/g;
              const value = e.target.value;

              if (regex.test(value)) {
                setAmount(value);
              } else {
                setAmount(
                  value
                    .replace(/[^\d.]/g, "")
                    .replace(/^0+(?=\d)/, "")
                    .replace(/(\..*)\./g, "$1")
                );
              }
            }}
          />
        )}
        <UiSelect
          options={currencyOptions}
          selected={{
            value: from,
            label: `${from + " - " + currencies[from]}`,
          }}
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
          selected={{ value: to, label: `${to + " - " + currencies[to]}` }}
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
        {!!Number(amount) && result && (
          <>
            {result?.toFixed(6)} {to}
          </>
        )}
        <div className={classes.rate}>
          1 {from}={((1 / rates[from]) * rates[to])?.toFixed(5)} {to}
        </div>
        <div className={classes.rate}>
          1 {to}={(rates[from] / rates[to])?.toFixed(5)} {from}
        </div>
      </div>
    </div>
  );
}
