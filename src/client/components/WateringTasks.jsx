// import { useQuery } from '@wasp/queries'
// import getWateringTasks from '@wasp/queries/getWateringTasks'
// import getPlants from '@wasp/queries/getPlants'
// import createWateringTask from '@wasp/actions/createWateringTask'
// import updateWateringTask from '@wasp/actions/updateWateringTask'
// import deleteWateringTask from '@wasp/actions/deleteWateringTask'

// import './WateringTasks.css'

// const WateringTasks = (props) => {
//   const { data: wateringTasks, isFetching: isFetchingWateringTasks, error: wateringTasksError } = useQuery(getWateringTasks, {
//     userId: props.userId,
//   })
//   const { data: plants, isFetching: isFetchingPlants, error: plantsError } = useQuery(getPlants)

//   const isFetching = isFetchingWateringTasks || isFetchingPlants
//   const error = wateringTasksError || plantsError

//   return (
//     <div className='watering-tasks'>
//       {plants && <NewWateringTaskForm plants={plants} />}
//       <div className='watering-task-container'>
//         {wateringTasks && <WateringTasksList wateringTasks={wateringTasks} plants={plants} />}
//       </div>

//       {isFetching && 'Fetching...'}
//       {error && 'Error: ' + error}
//     </div>
//   )
// }

// const WateringTask = (props) => {
//     let plant

//     if(props.plants){
//       plant = props.plants.find(plant => plant.id === props.wateringTask.plantId)
//     }
//   return (
//     <div className='watering-task'>
//       <h2>{plant && plant.name}</h2>
//       <p>{props.wateringTask.dueDate}</p>
//       <p>Completed: {props.wateringTask.completed ? 'Yes' : 'No'}</p>
//     </div>
//   )
// }

// const WateringTasksList = (props) => {
//   if (!props.wateringTasks?.length) return 'No Watering Tasks'
//   return props.wateringTasks.map((wateringTask, idx) => <WateringTask wateringTask={wateringTask} plants={props.plants} key={idx} />)
// }

// const NewWateringTaskForm = (props) => {
//     const { plants } = props

//     const handleSubmit = async (event) => {
//       event.preventDefault()
//       try {
//         const dueDate = event.target.dueDate.value
//         const plantName = event.target.plantName.value
//         const plant = plants.find(plant => plant.name === plantName)
//         event.target.reset()
//         await createWateringTask({ dueDate, plantId: plant.id })
//       } catch (err) {
//         window.alert('Error: ' + err.message)
//       }
//     }

//     return (
//       <form className="new-watering-task-form" onSubmit={handleSubmit}>
//         <label htmlFor='plantName'>Plant:</label>
//         <select name='plantName'>
//           {plants.map((plant, idx) => (
//             <option key={idx} value={plant.name}>
//               {plant.name}
//             </option>
//           ))}
//         </select>
//         <label htmlFor='dueDate'>Due Date:</label>
//         <input
//           name='dueDate'
//           type='date'
//           defaultValue=''
//         />
//         <input className="submit-btn" type='submit' value='Create Watering Task' />
//       </form>
//     )
//   }

// export default WateringTasks

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

  return (
    <div className="watering-task">
      <h2>{plant && plant.name}</h2>
      <p>{wateringTask.dueDate}</p>
      <p>Completed: {wateringTask.completed ? "Yes" : "No"}</p>
      <div className="button-row">
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
        <button className="update-btn" onClick={handleUpdate}>
          Update
        </button>
        <button className="complete-btn" onClick={handleToggleCompleted}>
          {wateringTask.completed ? "Mark Incomplete" : "Mark Complete"}
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
  if (!wateringTasks?.length) return "No Watering Tasks";
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

  return (
    <form className="new-watering-task-form" onSubmit={handleSubmit}>
      <label htmlFor="plantName">Plant:</label>
      <select
        name="plantName"
        value={selectedPlant ? selectedPlant.name : ""}
        onChange={(e) =>
          setSelectedPlant(
            plants.find((plant) => plant.name === e.target.value)
          )
        }
      >
        {plants.map((plant, idx) => (
          <option key={idx} value={plant.name}>
            {plant.name}
          </option>
        ))}
      </select>
      <label htmlFor="dueDate">Due Date:</label>
      <input
        name="dueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        className="submit-btn"
        type="submit"
        value={isUpdating ? "Update Watering Task" : "Create Watering Task"}
      />
    </form>
  );
};

export default WateringTasks;
