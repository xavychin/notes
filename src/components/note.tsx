import React, {
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import "../style/note.css";

interface NoteProps {
  initialText?: string;
  placeholder?: string;
  onDelete: (noteIndexToDelete: number) => void;
  noteId: number;
  initialTitle?: string;
  title_placeholder?: string;
}

function note({
  initialText = "",
  placeholder = "Click to edit note...",
  onDelete,
  noteId,
  initialTitle = "",
  title_placeholder = "Click to edit title...",
}: NoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [title, setTitle] = useState(initialTitle);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

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
          {!text && !title ? <i>{placeholder}</i> : text}
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
              <label htmlFor="note-content">Content: </label>
              <textarea
                id="note-content"
                className="note-input"
                value={text}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default note;
