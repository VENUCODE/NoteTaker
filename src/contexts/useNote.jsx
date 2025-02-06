import { createContext, useState, useEffect, useContext } from "react";
import hostUrl, { endpoints } from "../endpoints";
import { useAuth } from "./useAuth";
import { message } from "antd";
const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const addNote = async (newNote, setLoading, callback) => {
    try {
      setLoading(true);
      const response = await fetch(`${hostUrl}${endpoints.addNote}`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: newNote,
      });
      const data = await response.json();
      getNotes();
      message.success("Note added successfully!");
      callback();
    } catch (error) {
      message.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id, setLoading) => {
    try {
      setLoading(true);
      await fetch(`${hostUrl}${endpoints.deleteNote}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });
      message.info("Deleted Note");
      getNotes();
    } catch (error) {
      message.error("Failed to delete note");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addNewPhotos = async (id, formData, setLoading) => {
    try {
      setLoading(true);
      console.log(
        [...formData.entries()].reduce(
          (acc, [key, value]) => ({ ...acc, [key]: value }),
          {}
        )
      );
      return;
      const response = await fetch(
        `${hostUrl}${endpoints.uploadPhotos}/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      getNotes();
    } catch (error) {
      message.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateNote = async (id, payload, setLoading) => {
    try {
      setLoading(true);
      const response = await fetch(`${hostUrl}${endpoints.updateNote}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      getNotes();
    } catch (error) {
      message.error(error.message);
      console.error(error.message);
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
          Authorization: token,
        },
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      message.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        updateNote,
        getNotes,
        addNewPhotos,
        loading,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

const useNote = () => useContext(NoteContext);

export { NoteProvider, useNote };
