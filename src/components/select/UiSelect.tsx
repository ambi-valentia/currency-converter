import { FC, useEffect, useRef, useState } from "react";
import classes from "./UiSelect.module.scss";

interface option {
  value: string;
  label: string;
}

interface SelectProps {
  options: option[];
  selected: option;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const UiSelect: FC<SelectProps> = ({
  options,
  selected,
  placeholder = "Select an option",
  onChange,
}: SelectProps) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [foundOptions, setFound] = useState(options);

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (value: string) => {
    setIsOpen(false);
    setSearchValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (searchValue) {
      const foundSet = new Set();
      const found = options.filter((str) => {
        if (str.value.startsWith(searchValue)) {
          foundSet.add(str.value);
          return true;
        }
        return false;
      });
      found.push(
        ...options.filter((str) => {
          if (
            !foundSet.has(str.value) &&
            (str.label.toUpperCase().startsWith(searchValue) ||
              str.label.toUpperCase().includes(searchValue))
          ) {
            foundSet.add(str.value);
            return true;
          }
          return false;
        })
      );
      setFound(found);
    } else setFound(options);
  }, [searchValue]);

  useEffect(() => {
    setSearchValue(selected.value);
  }, [selected]);

  const handleInputClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setFound(options);
    }
  };

  return (
    <div className={classes.select__wrapper} ref={selectRef}>
      <div className={classes.select__box}>
        <input
          className={classes.selected}
          placeholder={placeholder}
          value={searchValue}
          maxLength={5}
          onChange={(e) => {
            setSearchValue(e.target.value.toUpperCase());
          }}
          onClick={handleInputClick}
        />
        <span className={classes.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <div className={classes.options__container}>
          {foundOptions.length > 0 ? (
            foundOptions.map((option) => (
              <div
                key={option.value}
                className={classes.option}
                onClick={() => handleSelect(option.value)}
              >
                {`${option.value + " - " + option.label}`}
              </div>
            ))
          ) : (
            <div className={classes.option}>No results available</div>
          )}
        </div>
      )}
    </div>
  );
};
