import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  name: string;
  title: string;
  values: string[];
  items: string[];
  onSelect: (name: string, value: string) => void;
};

const MultiDropdown = ({ name, title, values, items, onSelect }: Props) => {
  return (
    <details className="dropdown">
      <summary className="btn min-w-44 justify-between">
        {title}
        <FontAwesomeIcon className="" icon={faCaretDown} />
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box min-w-44">
        {items.map((item) => (
          <li
            key={item}
            onClick={() => {
              onSelect(name, item);
            }}
          >
            <FontAwesomeIcon
              className={`${!(item in values) && "hidden"}`}
              icon={faCaretDown}
            />
            <a>{item}</a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default MultiDropdown;
