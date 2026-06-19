import { useEffect, useState } from "react";
import API from "../services/api";
import NoteForm from "../components/NoteForm";
import { useNavigate } from "react-router-dom";

function Home() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const userName = localStorage.getItem("name");

  const getNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
  if (window.confirm("Delete this note?")) {
    await API.delete(`/notes/${id}`);
    getNotes();
  }
};
const editNote = (note) => {
  setSelectedNote(note);
};
  

  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/");
  } else {
    getNotes();
  }
}, []);

const logout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  return (
    <div className="container">
  
  <div className="header">
  
    <h1>Notes App</h1>
<p className="welcome-text">
  Welcome, {userName} 👋
</p>
  <button
    className="logout-btn"
    onClick={logout}
  >
    Logout
  </button>
</div>

  <NoteForm getNotes={getNotes} selectedNote={selectedNote} />

  <div className="notes-grid">
    {notes.map((note) => (
      <div className="note-card" key={note._id}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>

        <div className="action-buttons">
  <button
    className="edit-btn"
    onClick={() => editNote(note)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteNote(note._id)}
  >
    Delete
  </button>
</div>
      </div>
    ))}
  </div>
</div>
  );
}

export default Home;