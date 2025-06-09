import { useState, type ChangeEvent } from "react";
import "../style/dropdown.css";

interface DropdownProps {
  options?: string[];
  addItem: (item: string) => void;
}

function dropdown({ options = [], addItem }: DropdownProps) {
  const uniqueOptions = options;

  const handleOptions = (item: string) => {
    addItem(item);
  };

  return (
    <div>
      <ul className="dropdown-list">
        {uniqueOptions.map((options, index) => (
          <li key={index}>
            <button
              className="dropdown-button"
              onClick={() => handleOptions(options)}
            >
              <b>{options}</b>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default dropdown;
