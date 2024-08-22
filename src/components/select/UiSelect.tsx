import { FC, useState } from "react";
import classes from "./UiSelect.module.scss";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export const UiSelect: FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={classes.select__wrapper}>
      <div className={classes.select__box} onClick={() => setIsOpen(!isOpen)}>
        <span className={`${selectedValue ? classes.selected : classes.placeholder}`}>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </span>
        <span className={classes.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <div className={classes.options__container}>
          {options.map((option) => (
            <div
              key={option.value}
              className={classes.option}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
