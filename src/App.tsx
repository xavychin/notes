import { useState } from "react";
import "./style/App.css";
import Header from "./components/header.tsx";
import Note from "./components/note.tsx";
import DropDown from "./components/dropdown.tsx";
import ToDoList from "./components/checklist.tsx";

interface NoteProps {
  uniqueNotes: string[];
}

function App() {
  const [list, setList] = useState<{ id: number; text: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const uniqueNotes = list;

  const handleAddNote = (item: string) => {
    const newNote = {
      id: Date.now(),
      text: item,
    };

    setList((prevList) => [...prevList, newNote]);
    setShowDropdown(false);
  };

  const handleDeleteNote = (idToDelete: number) => {
    setList((prevList) => prevList.filter((note) => note.id !== idToDelete));
  };

  return (
    <>
      <Header />
      <div className="grid-container">
        {uniqueNotes.map((note) =>
          note.text === "Note" ? (
            <Note
              key={note.id}
              noteId={note.id}
              onDelete={() => handleDeleteNote(note.id)}
            />
          ) : (
            <ToDoList
              key={note.id}
              noteId={note.id}
              onDelete={() => handleDeleteNote(note.id)}
            />
          )
        )}
      </div>
      <div
        className="dropdown-div"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="add-button"
        >
          +
        </button>
        {showDropdown && (
          <div className="dropdown-button-container">
            <DropDown addItem={handleAddNote} options={["Note", "ToDoList"]} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
