// import getPlants from '@wasp/queries/getPlants'
// import getCategories from '@wasp/queries/getCategories'
// import { useQuery } from '@wasp/queries'
// import createPlant from '@wasp/actions/createPlant'

// const Plants = () => {
//   const { data: plants, isFetching: isFetchingPlants, error: plantsError} = useQuery(getPlants)
//   const { data: categories, isFetching: isFetchingCategories, error: categoriesError } = useQuery(getCategories)

//     const isFetching = isFetchingPlants || isFetchingCategories
//     const error = plantsError || categoriesError
//   return (
//     <div>
//       {categories && <NewPlantForm categories={categories} />}
//       {plants && <PlantsList plants={plants} categories={categories}/>}

//       {isFetching && 'Fetching...'}
//       {error && 'Error: ' + error}
//     </div>
//   )
// }

// const Plant = (props) => {
//     // console.log("PROPS", props)
//   let category

//   if(props.categories){
//     category = props.categories.find(category => category.id === props.plant.categoryId)
//   }

//   return (
//     <div>
//       <h2>{props.plant.name}</h2>
//       <p>{category && category.name}</p>
//       <p>Watering Frequency: {props.plant.wateringFrequency}</p>
//       <img src={props.plant.imageUrl} alt={props.plant.name} />
//     </div>
//   )
// }

// const PlantsList = (props) => {
//   if (!props.plants?.length) return 'No plants'
//   return props.plants.map((plant, idx) => <Plant categories={props.categories} plant={plant} key={idx} />)
// }

// const NewPlantForm = (props) => {
//   const { categories } = props
//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     try {
//       const name = event.target.name.value
//       const imageUrl = event.target.imageUrl.value
//       const wateringFrequency = event.target.wateringFrequency.value
//       const categoryName = event.target.categoryName.value
//       const category = categories.find(category => category.name === categoryName)
//       event.target.reset()
//       await createPlant({ name, imageUrl, wateringFrequency, categoryId: category.id})
//     } catch (err) {
//       window.alert('Error: ' + err.message)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name='name' type='text' defaultValue='' placeholder='Plant name' />
//       <input name='imageUrl' type='text' defaultValue='' placeholder='Image URL' />
//       <input name='wateringFrequency' type='text' defaultValue='' placeholder='Watering frequency' />
//       <label htmlFor='categoryName'>Category:</label>
//         <select name='categoryName'>
//         {categories.map((category, idx) => (
//             <option key={idx} value={category.name}>
//             {category.name}
//             </option>
//         ))}
//         </select>
//       <input type='submit' value='Create plant' />
//     </form>
//   )
// }

// export default Plants

// import getPlants from '@wasp/queries/getPlants'
// import getCategories from '@wasp/queries/getCategories'
// import { useQuery } from '@wasp/queries'
// import createPlant from '@wasp/actions/createPlant'
// import './Plants.css'

// const Plants = () => {
//   const { data: plants, isFetching: isFetchingPlants, error: plantsError} = useQuery(getPlants)
//   const { data: categories, isFetching: isFetchingCategories, error: categoriesError } = useQuery(getCategories)

//     const isFetching = isFetchingPlants || isFetchingCategories
//     const error = plantsError || categoriesError
//   return (
//     <div className="plants-container">
//       {categories && <NewPlantForm categories={categories} />}
//       {plants && <PlantsList plants={plants} categories={categories}/>}

//       {isFetching && 'Fetching...'}
//       {error && 'Error: ' + error}
//     </div>
//   )
// }

// const Plant = (props) => {
//     // console.log("PROPS", props)
//   let category

//   if(props.categories){
//     category = props.categories.find(category => category.id === props.plant.categoryId)
//   }

//   return (

//     <div className="plant-card">
//       <h2>{props.plant.name}</h2>
//       <p>{category && category.name}</p>
//       <p>Watering Frequency: {props.plant.wateringFrequency}</p>
//       <img src={props.plant.imageUrl} alt={props.plant.name} />
//     </div>
//   )
// }

// const PlantsList = (props) => {
//   if (!props.plants?.length) return 'No plants'
//   return (
//     <div className="plants-list">
//       {props.plants.map((plant, idx) => (
//         <Plant categories={props.categories} plant={plant} key={idx} />
//       ))}
//     </div>
//   )
// }

// const NewPlantForm = (props) => {
//   const { categories } = props
//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     try {
//       const name = event.target.name.value
//       const imageUrl = event.target.imageUrl.value
//       const wateringFrequency = event.target.wateringFrequency.value
//       const categoryName = event.target.categoryName.value
//       const category = categories.find(category => category.name === categoryName)
//       event.target.reset()
//       await createPlant({ name, imageUrl, wateringFrequency, categoryId: category.id})
//     } catch (err) {
//       window.alert('Error: ' + err.message)
//     }
//   }

//   return (
//     <form className="new-plant-form" onSubmit={handleSubmit}>
//       <label htmlFor='name'>Name:</label>
//       <input name='name' type='text' defaultValue='' placeholder='Plant name' />
//       <label htmlFor='imageUrl'>Image URL:</label>
//       <input name='imageUrl' type='text' defaultValue='' placeholder='Image URL' />
//         <label htmlFor='wateringFrequency'>Watering Frequency:</label>
//       <input name='wateringFrequency' type='text' defaultValue='' placeholder='Watering frequency' />
//       <label htmlFor='categoryName'>Category:</label>
//         <select name='categoryName'>
//         {categories.map((category, idx) => (
//             <option key={idx} value={category.name}>
//             {category.name}
//             </option>
//         ))}
//         </select>
//       <input className="submit-btn" type='submit' value='Create plant' />
//     </form>
//   )
// }

// export default Plants

import { useState, useEffect } from "react";
import getPlants from "@wasp/queries/getPlants";
import getCategories from "@wasp/queries/getCategories";
import { useQuery } from "@wasp/queries";
import createPlant from "@wasp/actions/createPlant";
import updatePlant from "@wasp/actions/updatePlant";
import deletePlant from "@wasp/actions/deletePlant";
import "./Plants.css";

const Plants = () => {
  const {
    data: plants,
    isFetching: isFetchingPlants,
    error: plantsError,
  } = useQuery(getPlants);
  const {
    data: categories,
    isFetching: isFetchingCategories,
    error: categoriesError,
  } = useQuery(getCategories);

  const isFetching = isFetchingPlants || isFetchingCategories;
  const error = plantsError || categoriesError;

  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingPlantId, setUpdatingPlantId] = useState(null);
  const [plantName, setPlantName] = useState("");
  const [plantImageUrl, setPlantImageUrl] = useState("");
  const [plantWateringFrequency, setPlantWateringFrequency] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <div className="plants-container">
      {categories && (
        <NewPlantForm
          categories={categories}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
          plantName={plantName}
          setPlantName={setPlantName}
          plantImageUrl={plantImageUrl}
          setPlantImageUrl={setPlantImageUrl}
          plantWateringFrequency={plantWateringFrequency}
          setPlantWateringFrequency={setPlantWateringFrequency}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          updatingPlantId={updatingPlantId}
          setUpdatingPlantId={setUpdatingPlantId}
        />
      )}
      {plants && (
        <PlantsList
          plants={plants}
          categories={categories}
          setIsUpdating={setIsUpdating}
          setUpdatingPlantId={setUpdatingPlantId}
          setPlantName={setPlantName}
          setPlantImageUrl={setPlantImageUrl}
          setPlantWateringFrequency={setPlantWateringFrequency}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      )}

      {isFetching && "Fetching..."}
      {error && "Error: " + error}
    </div>
  );
};

const Plant = (props) => {
  let category;

  if (props.categories) {
    category = props.categories.find(
      (category) => category.id === props.plant.categoryId
    );
  }

  const handleDelete = async () => {
    try {
      await deletePlant({ id: props.plant.id });
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };

  const handleUpdate = () => {
    props.setIsUpdating(true);
    props.setUpdatingPlantId(props.plant.id);
    props.setPlantName(props.plant.name);
    props.setPlantImageUrl(props.plant.imageUrl);
    props.setPlantWateringFrequency(props.plant.wateringFrequency);
    props.setSelectedCategoryId(props.plant.categoryId);
  };

  return (
    <div className="plant-card">
      <h2>{props.plant.name}</h2>
      <p>{category && category.name}</p>
      <p>Watering Frequency: {props.plant.wateringFrequency}</p>
      <img src={props.plant.imageUrl} alt={props.plant.name} />
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

const PlantsList = (props) => {
  if (!props.plants?.length) return "No plants";
  return (
    <div className="plants-list">
      {props.plants.map((plant, idx) => (
        <Plant
          categories={props.categories}
          plant={plant}
          key={idx}
          setIsUpdating={props.setIsUpdating}
          setUpdatingPlantId={props.setUpdatingPlantId}
          setPlantName={props.setPlantName}
          setPlantImageUrl={props.setPlantImageUrl}
          setPlantWateringFrequency={props.setPlantWateringFrequency}
          setSelectedCategoryId={props.setSelectedCategoryId}
        />
      ))}
    </div>
  );
};

const NewPlantForm = (props) => {
  const {
    categories,
    isUpdating,
    setIsUpdating,
    plantName,
    setPlantName,
    plantImageUrl,
    setPlantImageUrl,
    plantWateringFrequency,
    setPlantWateringFrequency,
    selectedCategoryId,
    setSelectedCategoryId,
    updatingPlantId,
    setUpdatingPlantId,
  } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const name = event.target.name.value;
      const imageUrl = event.target.imageUrl.value;
      const wateringFrequency = event.target.wateringFrequency.value;
      const categoryId = parseInt(event.target.categoryId.value);

      if (isUpdating) {
        await updatePlant({
          id: updatingPlantId,
          name,
          imageUrl,
          wateringFrequency,
          categoryId,
        });
        setIsUpdating(false);
        setUpdatingPlantId(null);
      } else {
        await createPlant({ name, imageUrl, wateringFrequency, categoryId });
      }
      event.target.reset();
      setPlantName("");
      setPlantImageUrl("");
      setPlantWateringFrequency("");
      setSelectedCategoryId(null);
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    if (isUpdating) {
      setSelectedCategoryId(selectedCategoryId);
    }
  }, [isUpdating, selectedCategoryId, setSelectedCategoryId]);

  return (
    <form className="new-plant-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        name="name"
        type="text"
        defaultValue={plantName}
        placeholder="Plant name"
        onChange={(e) => setPlantName(e.target.value)}
      />
      <label htmlFor="imageUrl">Image URL:</label>
      <input
        name="imageUrl"
        type="text"
        defaultValue={plantImageUrl}
        placeholder="Image URL"
        onChange={(e) => setPlantImageUrl(e.target.value)}
      />
      <label htmlFor="wateringFrequency">Watering Frequency:</label>
      <input
        name="wateringFrequency"
        type="text"
        defaultValue={plantWateringFrequency}
        placeholder="Watering frequency"
        onChange={(e) => setPlantWateringFrequency(e.target.value)}
      />
      <label htmlFor="categoryId">Category:</label>
      <select
        name="categoryId"
        value={selectedCategoryId || ""}
        onChange={(e) => setSelectedCategoryId(e.target.value)}
      >
        {categories.map((category, idx) => (
          <option key={idx} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        className="submit-btn"
        type="submit"
        value={isUpdating ? "Update plant" : "Create plant"}
      />
      {isUpdating && (
        <button
          className="cancel-btn"
          type="button"
          onClick={() => {
            setIsUpdating(false);
            setPlantName("");
            setPlantImageUrl("");
            setPlantWateringFrequency("");
            setSelectedCategoryId(null);
          }}
        >
          Cancel update
        </button>
      )}
    </form>
  );
};

export default Plants;
