import { useState } from "react";
import { useQuery } from "@wasp/queries";
import getWateringTasks from "@wasp/queries/getWateringTasks";
import getPlants from "@wasp/queries/getPlants";
import createWateringTask from "@wasp/actions/createWateringTask";
import updateWateringTask from "@wasp/actions/updateWateringTask";
import deleteWateringTask from "@wasp/actions/deleteWateringTask";

import "./WateringTasks.css";

const WateringTasks = (props) => {
  const {
    data: wateringTasks,
    isFetching: isFetchingWateringTasks,
    error: wateringTasksError,
  } = useQuery(getWateringTasks, {
    userId: props.userId,
  });
  const {
    data: plants,
    isFetching: isFetchingPlants,
    error: plantsError,
  } = useQuery(getPlants);

  const isFetching = isFetchingWateringTasks || isFetchingPlants;
  const error = wateringTasksError || plantsError;

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [selectedPlant, setSelectedPlant] = useState(null);

  return (
    <div className="watering-tasks">
      {plants && (
        <NewWateringTaskForm
          plants={plants}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
          updatingTaskId={updatingTaskId}
          setUpdatingTaskId={setUpdatingTaskId}
          dueDate={dueDate}
          setDueDate={setDueDate}
          selectedPlant={selectedPlant}
          setSelectedPlant={setSelectedPlant}
        />
      )}
      <div className="watering-task-container">
        {wateringTasks && (
          <WateringTasksList
            wateringTasks={wateringTasks}
            plants={plants}
            setIsUpdating={setIsUpdating}
            setUpdatingTaskId={setUpdatingTaskId}
            setDueDate={setDueDate}
            setSelectedPlant={setSelectedPlant}
          />
        )}
      </div>

      {isFetching && "Fetching..."}
      {error && "Error: " + error}
    </div>
  );
};

const WateringTask = ({
  wateringTask,
  plants,
  setIsUpdating,
  setUpdatingTaskId,
  setDueDate,
  setSelectedPlant,
}) => {
  let plant;

  if (plants) {
    plant = plants.find((plant) => plant.id === wateringTask.plantId);
  }

  const handleDelete = async () => {
    try {
      await deleteWateringTask({ id: wateringTask.id });
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    setUpdatingTaskId(wateringTask.id);
    setDueDate(wateringTask.dueDate);
    setSelectedPlant(plant);
  };

  const handleToggleCompleted = async () => {
    try {
      await updateWateringTask({
        id: wateringTask.id,
        completed: !wateringTask.completed,
      });
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };
 
  const date = new Date(wateringTask.dueDate);
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const day = date.getDate();
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  const ordinal = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  const formattedDate = `${monthName} ${day}${ordinal(day)}, ${year}`;
  
  console.log(formattedDate); // Output: April 6th, 2023
  
  return (
    <div className="watering-task">
      <h2>{plant && plant.commonName}</h2>
      <p>{formattedDate}</p>
      <p>Completed: {wateringTask.completed ? "Yes" : "No"}</p>
      <div className="button-row">
        <button className="delete-btn responsive-button" onClick={handleDelete}>
          Delete
        </button>
        <button className="update-btn responsive-button" onClick={handleUpdate}>
          Update
        </button>
        <button className="complete-btn responsive-button" onClick={handleToggleCompleted}>
          {wateringTask.completed ? "Incomplete" : "Completed"}
        </button>
      </div>
    </div>
  );
};

const WateringTasksList = ({
  wateringTasks,
  plants,
  setIsUpdating,
  setUpdatingTaskId,
  setDueDate,
  setSelectedPlant,
}) => {
  if (!wateringTasks?.length) return  <p>No watering tasks</p>;
  return wateringTasks.map((wateringTask, idx) => (
    <WateringTask
      wateringTask={wateringTask}
      plants={plants}
      key={idx}
      setIsUpdating={setIsUpdating}
      setUpdatingTaskId={setUpdatingTaskId}
      setDueDate={setDueDate}
      setSelectedPlant={setSelectedPlant}
    />
  ));
};

const NewWateringTaskForm = ({
  plants,
  isUpdating,
  setIsUpdating,
  updatingTaskId,
  setUpdatingTaskId,
  dueDate,
  setDueDate,
  selectedPlant,
  setSelectedPlant,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isUpdating) {
        const dateObject = new Date(dueDate);
        await updateWateringTask({
          id: updatingTaskId,
          dueDate: dateObject,
          plantId: selectedPlant.id,
        });
        setIsUpdating(false);
        setUpdatingTaskId(null);
      } else {
        await createWateringTask({ dueDate, plantId: selectedPlant.id });
      }
      setDueDate("");
      setSelectedPlant(null);
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };

  const [openCreateWateringTask, setOpenCreateWateringTask] = useState(false);


  return (
    <form className="new-plant-form" onSubmit={handleSubmit}>
        <h3 className="close-btn" onClick={() => setOpenCreateWateringTask(prev => !prev)}>{openCreateWateringTask ? "x" : "Create a Watering Task +"}</h3>
        {openCreateWateringTask && (
            <>
             <div className="form-section">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="commonName">Plant:</label>
                            <select
                                name="commonName"
                                value={selectedPlant ? selectedPlant.commonName : ""}
                                onChange={(e) =>
                                setSelectedPlant(
                                    plants.find((plant) => plant.commonName === e.target.value)
                                )
                                }
                            >
                                {plants.map((plant, idx) => (
                                <option key={idx} value={plant.commonName}>
                                    {plant.commonName}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date:</label>
                            <input
                                name="dueDate"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-actions">
                    <button
                        className="submit-btn"
                        type="submit"
                        
                    >
                        {isUpdating ? "Update Watering Task" : "Create Watering Task"}
                    </button>
                </div>
            </>
        )}
       
    </form>
  );
};

export default WateringTasks;
