import API from "../services/api";
import { useState, useEffect } from "react";

function NoteForm({ getNotes, selectedNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  useEffect(() => {
  if (selectedNote) {
    setTitle(selectedNote.title);
    setContent(selectedNote.content);
    setEditId(selectedNote._id);
  }
}, [selectedNote]);

  const submitHandler = async (e) => {
  e.preventDefault();

  if (editId) {
    await API.put(`/notes/${editId}`, {
      title,
      content,
    });
  } else {
    await API.post("/notes", {
      title,
      content,
    });
  }

  setTitle("");
  setContent("");
  setEditId(null);

  getNotes();
};

  return (
  <form className="note-form" onSubmit={submitHandler}>
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <textarea
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />

    <button type="submit">
      {editId ? "Update Note" : "Add Note"}
    </button>
    
  </form>
);
}

export default NoteForm;
