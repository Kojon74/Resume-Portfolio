"use client";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

type Props = {
  name: string;
  title: string;
  items: string[];
  value: string;
  onSelect: any;
};

const Dropdown = ({ name, title, items, value, onSelect }: Props) => {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  return (
    <details className="dropdown" ref={dropdownRef}>
      <summary className="btn min-w-44 justify-between">
        {value === "" ? title : value}
        <FontAwesomeIcon className="" icon={faCaretDown} />
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box min-w-44">
        {items.map((item) => (
          <li
            key={item}
            onClick={() => {
              dropdownRef.current?.removeAttribute("open");
              onSelect(name, item);
            }}
          >
            <a>{item}</a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Dropdown;
