import React, {
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import "../style/note.css";

interface NoteProps {
  placeholder?: string;
  onDelete: (noteIndexToDelete: number) => void;
  noteId: number;
  initialTitle?: string;
}

function note({
  placeholder = "Click to edit note...",
  onDelete,
  noteId,
  initialTitle = new Date().toLocaleDateString("en-GB"),
}: NoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<string[]>([]);
  const [task, setTask] = useState("");
  const [title, setTitle] = useState(initialTitle);

  const todocontent = text;

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (
      popupRef.current &&
      e.relatedTarget &&
      popupRef.current.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const popupRef = useRef<HTMLDivElement>(null);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setText((prevList) => [...prevList, task]);
      setTask("");
    }
  };

  const handleDeleteTask = (indexToDelete: number) => {
    setText((prevList) => prevList.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <div className="note-outer">
      <div className="note-inner" onClick={handleClick}>
        <span className="title-note">
          <b>{title}</b>
        </span>
        <button onClick={() => onDelete(noteId)} className="delete-button">
          x
        </button>
        <p className="text-note">
          {!text.length && !title ? (
            <i>{placeholder}</i>
          ) : (
            <ul>
              {text.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
        </p>
        {isEditing && (
          <div className="popup-overlay">
            <div
              className="popup-content"
              ref={popupRef}
              tabIndex={-1}
              onBlur={handleBlur}
              onFocus={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
              autoFocus
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="close-button"
              >
                x
              </button>
              <label htmlFor="note-title">Title: </label>
              <input
                id="note-title"
                className="title-input"
                onChange={handleTitleChange}
                value={title}
                type="text"
              />
              <label htmlFor="note-content">Task: </label>
              <input
                type="text"
                id="note-content"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              ></input>
              <button onClick={handleAddTask}>+</button>
              <ul>
                {todocontent.map((item, index) => (
                  <li>
                    {item}
                    <button onClick={() => handleDeleteTask(index)}>-</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default note;
