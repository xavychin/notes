import React, {
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import "../style/note.css";

interface NoteProps {
  placeholder?: string;
  noteId: number;
  content: string;
  title: string;
  onDelete: (noteIndexToDelete: number) => void;
  onContentChange: (newContent: string) => void;
  onTitleChange: (newTitle: string) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

function note({
  placeholder = "Click to edit note...",
  onDelete,
  noteId,
  content,
  title,
  onTitleChange,
  onContentChange,
  isEditing,
  setIsEditing,
}: NoteProps) {
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
        <button onClick={() => onDelete(noteId)} className="delete-button">
          x
        </button>
        <p className="title-note">
          <b>{title}</b>
        </p>
        <p className="text-note">
          {!content && !title ? <i>{placeholder}</i> : content}
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
              {
                //<label htmlFor="note-title">Title: </label>
              }
              <input
                maxLength={40}
                id="note-title"
                className="title-input"
                onChange={(e) => onTitleChange(e.target.value)}
                value={title}
                type="text"
                autoFocus={title === ""}
              />
              {
                //<label htmlFor="note-content">Content: </label>
              }
              <textarea
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
                autoFocus={title !== ""}
                id="note-content"
                className="note-input"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default note;
