import { useState, useEffect } from "react";
import { useQuery } from "@wasp/queries";
import getNotes from "@wasp/queries/getNotes";
import getPlants from "@wasp/queries/getPlants";
import createNote from "@wasp/actions/createNote";
import deleteNote from "@wasp/actions/deleteNote";
import updateNote from "@wasp/actions/updateNote";
import "./Notes.css";

const Notes = (props) => {
  const { plantId } = props;
  const {
    data: notes,
    isFetching: isFetchingNotes,
    error: notesError,
  } = useQuery(getNotes, { plantId });
  const {
    data: plants,
    isFetching: isFetchingPlants,
    error: plantsError,
  } = useQuery(getPlants);

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingNoteId, setUpdatingNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [selectedPlantId, setSelectedPlantId] = useState(null);

  const isFetching = isFetchingNotes || isFetchingPlants;
  const error = notesError || plantsError;

  return (
    <div className="notes">
      {plants && (
        <NewNoteForm
          plants={plants}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          selectedPlantId={selectedPlantId}
          setSelectedPlantId={setSelectedPlantId}
          updatingNoteId={updatingNoteId}
          setUpdatingNoteId={setUpdatingNoteId}
        />
      )}
      <div className="note-container">
        {notes && (
          <NotesList
            notes={notes}
            plants={plants}
            setIsUpdating={setIsUpdating}
            setUpdatingNoteId={setUpdatingNoteId}
            setNoteContent={setNoteContent}
            setSelectedPlantId={setSelectedPlantId}
          />
        )}
      </div>

      {isFetching && "Fetching..."}
      {error && "Error: " + error}
    </div>
  );
};

const Note = ({
  plants,
  note,
  setIsUpdating,
  setUpdatingNoteId,
  setNoteContent,
  setSelectedPlantId,
}) => {
  const handleDelete = async () => {
    try {
      await deleteNote({ id: note.id });
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    setUpdatingNoteId(note.id);
    setNoteContent(note.content);
    setSelectedPlantId(note.plantId);
  };

  let plant;

  if (plants) {
    plant = plants.find((plant) => plant.id === note.plantId);
  }

  return (
    <div className="note">
      <h2>{plant && plant.name}</h2>
      <p>{note.content}</p>
      <div className="button-row">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
        <button className="update-btn" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

const NotesList = ({
  plants,
  notes,
  setIsUpdating,
  setUpdatingNoteId,
  setNoteContent,
  setSelectedPlantId,
}) => {
  if (!notes?.length) return "No notes";
  return notes.map((note, idx) => (
    <Note
      note={note}
      plants={plants}
      key={idx}
      setIsUpdating={setIsUpdating}
      setUpdatingNoteId={setUpdatingNoteId}
      setNoteContent={setNoteContent}
      setSelectedPlantId={setSelectedPlantId}
    />
  ));
};

const NewNoteForm = (props) => {
  const {
    plants,
    isUpdating,
    setIsUpdating,
    noteContent,
    setNoteContent,
    selectedPlantId,
    setSelectedPlantId,
    updatingNoteId,
    setUpdatingNoteId,
  } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const content = event.target.content.value;
      const plantId = event.target.plantId.value;

      if (isUpdating) {
        await updateNote({
          id: updatingNoteId,
          content,
          plantId,
        });
        setIsUpdating(false);
        setUpdatingNoteId(null);
      } else {
        await createNote({ content, plantId: parseInt(plantId) });
      }
      event.target.reset();
      setNoteContent("");
      setSelectedPlantId(null);
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    if (isUpdating) {
      setSelectedPlantId(selectedPlantId);
    }
  }, [isUpdating, selectedPlantId, setSelectedPlantId]);

  return (
    <form className="new-note-form" onSubmit={handleSubmit}>
      <label htmlFor="content">Content:</label>
      <input
        name="content"
        type="text"
        defaultValue={noteContent}
        placeholder="Note content"
        onChange={(e) => setNoteContent(e.target.value)}
      />
      <label htmlFor="plantId">Plant:</label>
      <select
        name="plantId"
        value={selectedPlantId || ""}
        onChange={(e) => setSelectedPlantId(e.target.value)}
      >
        {plants.map((plant, idx) => (
          <option key={idx} value={plant.id}>
            {plant.name}
          </option>
        ))}
      </select>
      <input
        className="submit-btn"
        type="submit"
        value={isUpdating ? "Update note" : "Create note"}
      />
      {isUpdating && (
        <button
          className="cancel-btn"
          type="button"
          onClick={() => {
            setIsUpdating(false);
            setNoteContent("");
            setSelectedPlantId(null);
          }}
        >
          Cancel update
        </button>
      )}
    </form>
  );
};

export default Notes;