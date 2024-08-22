import { FC, useEffect, useState } from "react";
import classes from "./UiSelect.module.scss";

interface SelectProps {
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export const UiSelect: FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
}: SelectProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [foundOptions, setFound] = useState(options);

  const handleSelect = (value: string) => {
    setIsOpen(false);
    setSelectedValue(value);
    setSearchValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (searchValue) {
      const found = foundOptions.filter((str) => str.startsWith(searchValue));
      if (found) {
        setFound(found);
        setIsOpen(true);
      }
      else setIsOpen(false);
    } else setFound(options);
  }, [searchValue]);

  return (
    <div className={classes.select__wrapper}>
      <div className={classes.select__box}>
        <input
          className={classes.selected}
          placeholder={placeholder}
          value={searchValue}
          maxLength={3}
          onChange={(e) => {
            setSearchValue(e.target.value.toUpperCase());
          }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <span className={classes.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <div className={classes.options__container}>
          {foundOptions.map((option) => (
            <div
              key={option}
              className={classes.option}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
