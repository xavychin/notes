import { useState, useEffect, useContext, type ReactHTMLElement } from "react";
import "./style/App.css";
import Header from "./components/header.tsx";
import Note from "./components/note.tsx";
import ThemeContext from "./context/theme-context.tsx";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [notes, setNotes] = useState<
    {
      id: number;
      content: string;
      title: string;
      isEditing: boolean;
    }[]
  >([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      content: "",
      title: "",
      isEditing: false,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDeleteNote = (idToDelete: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== idToDelete));
  };

  const anyEditing = notes.some((note) => note.isEditing);

  return (
    <>
      <Header searchText={search} onSearch={handleSearch} />
      <div className="grid-container">
        {notes.map((note) =>
          search === "" ? (
            <Note
              isEditing={note.isEditing}
              setIsEditing={(isEditing) =>
                setNotes((notes) =>
                  notes.map((n) => (n.id === note.id ? { ...n, isEditing } : n))
                )
              }
              key={note.id}
              noteId={note.id}
              title={note.title}
              onTitleChange={(newTitle) =>
                setNotes((notes) =>
                  notes.map((n) =>
                    n.id === note.id ? { ...n, title: newTitle } : n
                  )
                )
              }
              content={note.content}
              onContentChange={(newContent) =>
                setNotes((notes) =>
                  notes.map((n) =>
                    n.id === note.id ? { ...n, content: newContent } : n
                  )
                )
              }
              onDelete={() => handleDeleteNote(note.id)}
            />
          ) : note.content.includes(search.toLowerCase()) ||
            note.title.includes(search.toLowerCase()) ? (
            <Note
              isEditing={note.isEditing}
              setIsEditing={(isEditing) =>
                setNotes((notes) =>
                  notes.map((n) => (n.id === note.id ? { ...n, isEditing } : n))
                )
              }
              key={note.id}
              noteId={note.id}
              title={note.title}
              onTitleChange={(newTitle) =>
                setNotes((notes) =>
                  notes.map((n) =>
                    n.id === note.id ? { ...n, title: newTitle } : n
                  )
                )
              }
              content={note.content}
              onContentChange={(newContent) =>
                setNotes((notes) =>
                  notes.map((n) =>
                    n.id === note.id ? { ...n, content: newContent } : n
                  )
                )
              }
              onDelete={() => handleDeleteNote(note.id)}
            />
          ) : null
        )}
      </div>
      {!anyEditing && (
        <>
          <button className="toggle-button" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button onClick={() => handleAddNote()} className="add-button">
            +
          </button>
        </>
      )}
    </>
  );
}

export default App;
