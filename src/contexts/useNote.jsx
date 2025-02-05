import { createContext, useState, useEffect, useContext } from "react";
import hostUrl, { endpoints } from "../endpoints";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    getNotes();
  }, []);

  const addNote = async (newNote) => {
    try {
      setLoading(true);
      const response = await fetch(`${hostUrl}${endpoints.addNote}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: newNote,
      });
      const data = await response.json();
      setNotes([...notes, data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      setLoading(true);
      await fetch(`${hostUrl}${endpoints.deleteNote}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (id, updatedNote) => {
    try {
      setLoading(true);
      const response = await fetch(`${hostUrl}${endpoints.updateNote}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: updatedNote,
      });
      const data = await response.json();
      setNotes(notes.map((note) => (note.id === id ? data : note)));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getNotes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${hostUrl}${endpoints.getNotes}`, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNote,
        getNotes,
        loading,
        error,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

const useNote = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }
  return context;
};

export { NoteProvider, useNote };
