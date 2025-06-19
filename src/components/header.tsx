import SearchBar from "./searchbar.tsx";
import "../style/header.css";

interface HeaderProps {
  searchText: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function header({ searchText, onSearch }: HeaderProps) {
  return (
    <div className="header-container">
      <SearchBar searchText={searchText} onSearch={onSearch} />
    </div>
  );
}

export default header;
