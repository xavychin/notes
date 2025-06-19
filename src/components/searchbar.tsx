import React from "react";
import "../style/searchbar.css";

interface SearchBarProps {
  searchText: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function searchbar({ searchText, onSearch }: SearchBarProps) {
  return (
    <div>
      <input
        placeholder="Search Notes..."
        id="searchbar"
        type="text"
        onChange={onSearch}
        value={searchText}
      ></input>
    </div>
  );
}

export default searchbar;
