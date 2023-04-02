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

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

const intialPlantState = {
    species: "",
    commonName: "",
    lightRequirements: "",
    waterRequirements: "",
    wateringSchedule: "",
    soilRequirements: "",
    fertilizerRequirements: "",
    propagation: "",
    pestsAndDiseases: "",
    toxicity: "",
    other: "",
    note: "",
    funInterestingFact: "",
    imageUrl: "",
}

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

//   const headers = [
//     "Species",
//     "Common Name",
//     "Light Requirements",
//     "Water Requirements",
//     "Watering Schedule",
//     "Soil Requirements",
//     "Fertilizer Requirements",
//     "Propagation",
//     "Pests and Diseases",
//     "Toxicity",
//     "Other",
//     "Notes",
//     "Fun Interesting Fact",
//     "Free Image", 
//   ];


  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingPlantId, setUpdatingPlantId] = useState(null);
  const [plantState, setPlantState] = useState(intialPlantState);


//   const [plantName, setPlantName] = useState("");
//   const [plantImageUrl, setPlantImageUrl] = useState("");
//   const [plantWateringFrequency, setPlantWateringFrequency] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [openCreatePlant, setOpenCreatePlant] = useState(false);

  useEffect(() => {
    if (isUpdating) {
        setOpenCreatePlant(true)
    }
    }, [isUpdating]);
  return (
    <div className="plants-container">
      {categories && (
        <NewPlantForm
          openCreatePlant={openCreatePlant}
            setOpenCreatePlant={setOpenCreatePlant}
          plantState={plantState}
          setPlantState={setPlantState}
          categories={categories}
          isUpdating={isUpdating}
          setIsUpdating={setIsUpdating}
        //   plantName={plantName}
        //   setPlantName={setPlantName}
        //   plantImageUrl={plantImageUrl}
        //   setPlantImageUrl={setPlantImageUrl}
        //   plantWateringFrequency={plantWateringFrequency}
        //   setPlantWateringFrequency={setPlantWateringFrequency}
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
          updatingPlantId={updatingPlantId}
          setUpdatingPlantId={setUpdatingPlantId}
        />
      )}
      {plants && (
        <PlantsList
        //   plantState={plantState}
          setPlantState={setPlantState}
          plants={plants}
          categories={categories}
          setIsUpdating={setIsUpdating}
          setUpdatingPlantId={setUpdatingPlantId}
        //   setPlantName={setPlantName}
        //   setPlantImageUrl={setPlantImageUrl}
        //   setPlantWateringFrequency={setPlantWateringFrequency}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      )}

      {isFetching && "Fetching..."}
      {error && "Error: " + error}
    </div>
  );
};

const Plant = ({ setPlantState, categories, plant, setIsUpdating, setUpdatingPlantId, setSelectedCategoryId}) => {

    const [isExpanded, setIsExpanded] = useState(false)
  let category;
  if (categories) {
    category = categories.find(
      (category) => category.id === plant.categoryId
    );
  }

  const handleDelete = async () => {
    try {
      await deletePlant({ id: plant.id });
    } catch (err) {
      window.alert("Error: " + err.message);
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true);
    setUpdatingPlantId(plant.id);
    setSelectedCategoryId(plant.categoryId);
    setPlantState({
        species: plant.species,
        commonName: plant.commonName,
        lightRequirements: plant.lightRequirements,
        waterRequirements: plant.waterRequirements,
        wateringSchedule: plant.wateringSchedule,
        soilRequirements: plant.soilRequirements,
        fertilizerRequirements: plant.fertilizerRequirements,
        propagation: plant.propagation,
        pestsAndDiseases: plant.pestsAndDiseases,
        toxicity: plant.toxicity,
        other: plant.other,
        note: plant.note,
        funInterestingFact: plant.funInterestingFact,
        imageUrl: plant.imageUrl,
    });

  };

  return (
    <div className="plant-card">
       <div className="expand-button" onClick={() => setIsExpanded(prev => !prev)}>+</div>
       <h2 className="plant-header">{plant.commonName}</h2>

       {isExpanded ? (
            <>
                <p><span className="bold-text">Species: </span>{plant.species}</p>
                <p><span className="bold-text">Light Requirements: </span>{plant.lightRequirements}</p>
                <p><span className="bold-text">Water Requirements: </span>{plant.waterRequirements}</p>
                <p><span className="bold-text">Watering Schedule: </span>{plant.wateringSchedule}</p>
                <p><span className="bold-text">Soil Requirements: </span>{plant.soilRequirements}</p>
                <p><span className="bold-text">Fertilizer Requirements: </span>{plant.fertilizerRequirements}</p>
                <p><span className="bold-text">Propagation: </span>{plant.propagation}</p>
                <p><span className="bold-text">Pests and Diseases: </span>{plant.pestsAndDiseases}</p>
                <p><span className="bold-text">Toxicity: </span>{plant.toxicity}</p>
                <p><span className="bold-text">Other: </span>{plant.other}</p>
                <p><span className="bold-text">Notes: </span>{plant.note}</p>
                <p><span className="bold-text">Fun Interesting Fact: </span>{plant.funInterestingFact}</p>
            </>
         ) : (null
        )}
      
        <img src={plant.imageUrl}/>
      <p>{category && category.name}</p>
      {/* <p>Watering Frequency: {props.plant.wateringFrequency}</p>
       <img src={props.plant.imageUrl} alt={props.plant.name} />  */}
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

const PlantsList = ({ setPlantState, plants, categories, setIsUpdating, setUpdatingPlantId, setSelectedCategoryId}) => {
  if (!plants?.length) return <p>No plants</p>;
  return (
    <div className="plants-list">
      {plants.map((plant, idx) => (
        <Plant
        setPlantState={setPlantState}
        //   plantState={plantState}
          categories={categories}
          plant={plant}
          key={idx}
          setIsUpdating={setIsUpdating}
          setUpdatingPlantId={setUpdatingPlantId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      ))}
    </div>
  );
};

const NewPlantForm = ({  plantState,
    setPlantState,
    categories,
    isUpdating,
    setIsUpdating,
    setPlantName,
    setPlantImageUrl,
    setPlantWateringFrequency,
    selectedCategoryId,
    setSelectedCategoryId,
    updatingPlantId,
    setUpdatingPlantId,
    openCreatePlant,
    setOpenCreatePlant,
}) => {


  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("EVENT" , event.target)
    try {
    //   const name = event.target.name.value;
    //   const imageUrl = event.target.imageUrl.value;
    //   const wateringFrequency = event.target.wateringFrequency.value;
        const species = event.target.species?.value;
        const commonName = event.target.commonName?.value;
        const lightRequirements = event.target.lightRequirements?.value;
        const waterRequirements = event.target.wateringRequirements?.value;
        const wateringSchedule = event.target.wateringSchedule?.value;
        const soilRequirements = event.target.soilRequirements?.value;
        const fertilizerRequirements = event.target.fertilizerRequirements?.value;
        const propagation = event.target.propagation?.value;
        const pestsAndDiseases = event.target.pestsAndDiseases?.value;
        const toxicity = event.target.toxicity?.value;
        const other = event.target.other?.value;
        const note = event.target.note?.value;
        const funInterestingFact = event.target.funInterestingFact?.value;
        const imageUrl = event.target.imageUrl?.value;
        const categoryId = parseInt(event.target.categoryId?.value);


      if (isUpdating) {
        await updatePlant({
          id: updatingPlantId,
          species,
          commonName,
            lightRequirements,
            waterRequirements,
            wateringSchedule,
            soilRequirements,
            fertilizerRequirements,
            propagation,
            pestsAndDiseases,
            toxicity,
            other,
            note,
            funInterestingFact,
            imageUrl,
          categoryId,
        });
        setIsUpdating(false);
        setUpdatingPlantId(null);
      } else {
        await createPlant({ species, commonName, lightRequirements, waterRequirements, wateringSchedule, soilRequirements, fertilizerRequirements, propagation, pestsAndDiseases, toxicity, other, note, funInterestingFact, imageUrl, categoryId });
      }
      event.target.reset();
      setPlantState(intialPlantState)
    //   setPlantName("");
    //   setPlantImageUrl("");
    //   setPlantWateringFrequency("");
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


//   return (
    // <form className="new-plant-form" onSubmit={handleSubmit}>
    //     <label htmlFor="species">Species</label>
    //     <input
    //         name="species"
    //         type="text"
    //         defaultValue={plantState.species}
    //         placeholder="Species"
    //         onChange={(e) => setPlantState({ ...plantState, species: e.target.value })}
    //     />
    //     <label htmlFor="commonName">Common Name</label>
    //     <input
    //         name="commonName"
    //         type="text"
    //         defaultValue={plantState.commonName}
    //         placeholder="Common Name"
    //         onChange={(e) => setPlantState({ ...plantState, commonName: e.target.value })}
    //     />
    //     <label htmlFor="lightRequirements">Light Requirements</label>
    //     <input
    //         name="lightRequirements"
    //         type="text"
    //         defaultValue={plantState.lightRequirements}
    //         placeholder="Light Requirements"
    //         onChange={(e) => setPlantState({ ...plantState, lightRequirements: e.target.value })}
    //     />
    //     <label htmlFor="wateringRequirements">Watering Requirements</label>
    //     <input
    //         name="waterRequirements"
    //         type="text"
    //         defaultValue={plantState.waterRequirements}
    //         placeholder="Water Requirements"
    //         onChange={(e) => setPlantState({ ...plantState, waterRequirements: e.target.value })}
    //     />
    //     <label htmlFor="wateringSchedule">Watering Schedule</label>
    //     <input
    //         name="wateringSchedule"
    //         type="text"
    //         defaultValue={plantState.wateringSchedule}
    //         placeholder="Watering Schedule"
    //         onChange={(e) => setPlantState({ ...plantState, wateringSchedule: e.target.value })}
    //     />
    //     <label htmlFor="soilRequirements">Soil Requirements</label>
    //     <input

    //         name="soilRequirements"
    //         type="text"
    //         defaultValue={plantState.soilRequirements}
    //         placeholder="Soil Requirements"
    //         onChange={(e) => setPlantState({ ...plantState, soilRequirements: e.target.value })}
    //     />
    //     <label htmlFor="fertilizerRequirements">Fertilizer Requirements</label>
    //     <input
    //         name="fertilizerRequirements"
    //         type="text"
    //         defaultValue={plantState.fertilizerRequirements}
    //         placeholder="Fertilizer Requirements"
    //         onChange={(e) => setPlantState({ ...plantState, fertilizerRequirements: e.target.value })}
    //     />
    //     <label htmlFor="propagation">Propagation</label>
    //     <input
    //         name="propagation"
    //         type="text"
    //         defaultValue={plantState.propagation}
    //         placeholder="Propagation"
    //         onChange={(e) => setPlantState({ ...plantState, propagation: e.target.value })}
    //     />
    //     <label htmlFor="pestsAndDiseases">Pests and Diseases</label>
    //     <input
    //         name="pestsAndDiseases"
    //         type="text"
    //         defaultValue={plantState.pestsAndDiseases}
    //         placeholder="Pests and Diseases"
    //         onChange={(e) => setPlantState({ ...plantState, pestsAndDiseases: e.target.value })}
    //     />
    //     <label htmlFor="toxicity">Toxicity</label>
    //     <input
    //         name="toxicity"
    //         type="text"
    //         defaultValue={plantState.toxicity}
    //         placeholder="Toxicity"
    //         onChange={(e) => setPlantState({ ...plantState, toxicity: e.target.value })}
    //     />
    //     <label htmlFor="other">Other</label>
    //     <input

    //         name="other"
    //         type="text"
    //         defaultValue={plantState.other}
    //         placeholder="Other"
    //         onChange={(e) => setPlantState({ ...plantState, other: e.target.value })}
    //     />
    //     <label htmlFor="note">Note</label>
    //     <input
    //         name="note"
    //         type="text"
    //         defaultValue={plantState.note}
    //         placeholder="Note"
    //         onChange={(e) => setPlantState({ ...plantState, note: e.target.value })}
    //     />
    //     <label htmlFor="funInterestingFact">Fun Interesting Fact</label>
    //     <input
    //         name="funInterestingFact"
    //         type="text"
    //         defaultValue={plantState.funInterestingFact}
    //         placeholder="Fun Interesting Fact"
    //         onChange={(e) => setPlantState({ ...plantState, funInterestingFact: e.target.value })}
    //     />
    //     <label htmlFor="imageUrl">Image URL</label>
    //     <input
    //         name="imageUrl"
    //         type="text"
    //         defaultValue={plantState.imageUrl}
    //         placeholder="Image URL"
    //         onChange={(e) => setPlantState({ ...plantState, imageUrl: e.target.value })}
    //     />
    //   {/* <label htmlFor="name">Name:</label>
    //   <input
    //     name="name"
    //     type="text"
    //     defaultValue={plantName}
    //     placeholder="Plant name"
    //     onChange={(e) => setPlantName(e.target.value)}
    //   />
    //   <label htmlFor="imageUrl">Image URL:</label>
    //   <input
    //     name="imageUrl"
    //     type="text"
    //     defaultValue={plantImageUrl}
    //     placeholder="Image URL"
    //     onChange={(e) => setPlantImageUrl(e.target.value)}
    //   />
    //   <label htmlFor="wateringFrequency">Watering Frequency:</label>
    //   <input
    //     name="wateringFrequency"
    //     type="text"
    //     defaultValue={plantWateringFrequency}
    //     placeholder="Watering frequency"
    //     onChange={(e) => setPlantWateringFrequency(e.target.value)}
    //   /> */}
    //   <label htmlFor="categoryId">Category:</label>
    //   <select
    //     name="categoryId"
    //     value={selectedCategoryId || ""}
    //     onChange={(e) => setSelectedCategoryId(e.target.value)}
    //   >
    //     {categories.map((category, idx) => (
    //       <option key={idx} value={category.id}>
    //         {category.name}
    //       </option>
    //     ))}
    //   </select>
    //   <input
    //     className="submit-btn"
    //     type="submit"
    //     value={isUpdating ? "Update plant" : "Create plant"}
    //   />
    //   {isUpdating && (
    //     <button
    //       className="cancel-btn"
    //       type="button"
    //       onClick={() => {
    //         setIsUpdating(false);
    //         setPlantState(intialPlantState);
    //         setSelectedCategoryId(null);
    //       }}
    //     >
    //       Cancel update
    //     </button>
    //   )}
    // </form>

//     <Accordion defaultIndex={[0]} allowMultiple>
//     <AccordionItem>
//         <h2 style={{padding: 0}}>
//         <AccordionButton>
//             <Box as="span" flex='1' textAlign='left'>
//             Section 1 title
//             </Box>
//             <AccordionIcon />
//         </AccordionButton>
//         </h2>
//         <AccordionPanel pb={4}>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
//         veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
//         commodo consequat.
//         </AccordionPanel>
//     </AccordionItem>

//     <AccordionItem>
//         <h2>
//         <AccordionButton>
//             <Box as="span" flex='1' textAlign='left'>
//             Section 2 title
//             </Box>
//             <AccordionIcon />
//         </AccordionButton>
//         </h2>
//         <AccordionPanel pb={4}>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
//         veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
//         commodo consequat.
//         </AccordionPanel>
//     </AccordionItem>
// </Accordion>

    const [isExpandedMap, setIsExpandedMap] = useState({
        generalInformation: true,
        requirements: false,
        safety: false,
        additionalInformation: false,
        image: false,
        plantCategory: false,
    });

    const handleIsExpanded = (key) => {
        setIsExpandedMap({
            ...isExpandedMap,
            [key]: !isExpandedMap[key],
        });
    };
// adaptogens
    const [isAllExpanded, setIsAllExpanded] = useState(false);
    const handleIsAllExpanded = () => {
        if(isAllExpanded) {
            setIsExpandedMap({
                generalInformation: false, 
                requirements: false,
                safety: false,
                additionalInformation: false,
                image: false,
                plantCategory: false,
            });
            setIsAllExpanded(false);

        } else {
            setIsExpandedMap({
                generalInformation: true, 
                requirements: true,
                safety: true,
                additionalInformation: true,
                image: true,
                plantCategory: true,
            });
            setIsAllExpanded(true);

        }
    }
    return (
        <form className="new-plant-form" onSubmit={handleSubmit}>
          <h3 className="close-btn" onClick={() => setOpenCreatePlant(prev => !prev)}>{openCreatePlant ? "x" : "Create a Plant +"}</h3>
          {openCreatePlant && (
            <>
             <h2 className="close-btn margin-top" onClick={() => handleIsAllExpanded()}>{isAllExpanded ? "Hide All -" : "Expand All +"}</h2>
             <div className="form-section">
               <h3 className="form-category">General Information <span onClick={() => handleIsExpanded("generalInformation")}>{isExpandedMap["generalInformation"] ? "-" : "+"}</span></h3>
               {isExpandedMap["generalInformation"] && (
                       <div className="form-row">
                       <div className="form-group">
                         <label htmlFor="species">Species</label>
                         <input
                             name="species"
                             type="text"
                             defaultValue={plantState.species}
                             placeholder="Ex. Malus domestica"
                             onChange={(e) => setPlantState({ ...plantState, species: e.target.value })}
                         />
                       </div>
                       <div className="form-group">
                         <label htmlFor="commonName">Common Name <span className="required-note">*required</span></label>
                         <input
                             name="commonName"
                             type="text"
                             defaultValue={plantState.commonName}
                             placeholder="Ex. Apple"
                             onChange={(e) => setPlantState({ ...plantState, commonName: e.target.value })}
                         />
                       </div>
                     </div>
               )}
               
               </div>
             <div className="form-section">
               <h3 className="form-category">Requirements <span onClick={() => handleIsExpanded("requirements")}>{isExpandedMap["requirements"] ? "-" : "+"}</span></h3>
               {isExpandedMap["requirements"] && (
                   <div className="form-row">
                   {/* Add form groups for fields like Light Requirements, Watering Requirements, etc. */}
                   <div className="form-group">
                     <label htmlFor="lightRequirements">Light Requirements</label>
                     <input
                         name="lightRequirements"
                         type="text"
                         defaultValue={plantState.lightRequirements}
                         placeholder="Ex. Full Sun"
                         onChange={(e) => setPlantState({ ...plantState, lightRequirements: e.target.value })}
                     />
                   </div>
                   <div className="form-group">
                         <label htmlFor="wateringRequirements">Watering Requirements</label>
                         <input
                             name="wateringgRequirements"
                             type="text"
                             defaultValue={plantState.waterRequirements}
                             placeholder="Ex. Well-drained soil with average moisture"
                             onChange={(e) => setPlantState({ ...plantState, wateringRequirements: e.target.value })}
                         />
                   </div>
                   <div className="form-group">
                     <label htmlFor="wateringSchedule">Watering Schedule</label>
                     <input
                         name="wateringSchedule"
                         type="text"
                         defaultValue={plantState.wateringSchedule}
                         placeholder="Ex. Every 3 days"
                         onChange={(e) => setPlantState({ ...plantState, wateringSchedule: e.target.value })}
                     />
                   </div>
                     <div className="form-group">
                         <label htmlFor="soilRequirements">Soil Requirements</label>
                         <input
                             name="soilRequirements"
                             type="text"
                             defaultValue={plantState.soilRequirements}
                             placeholder="Ex. Rich, loamy soil with a pH of 6.0-7.0"
                             onChange={(e) => setPlantState({ ...plantState, soilRequirements: e.target.value })}
                         />
                     </div>
                     <div className="form-group">
                         <label htmlFor="fertilizerRequirements">Fertilizer Requirements</label>
                         <input
                             name="fertilizerRequirements"
                             type="text"
                             defaultValue={plantState.fertilizerRequirements}
                             placeholder="Ex. Apply a balanced fertilizer in spring and summer"
                             onChange={(e) => setPlantState({ ...plantState, fertilizerRequirements: e.target.value })}
                         />
                     </div>
                 </div>
               )}
           </div>
   
             <div className="form-section">
               <h3 className="form-category">Plant Health & Safety <span onClick={() => handleIsExpanded("safety")}>{isExpandedMap["safety"] ? "-" : "+"}</span></h3>
               {isExpandedMap["safety"] && (
                   <div className="form-row">
                   <div className="form-group">
                       {/* propgation */}
                       <label htmlFor="propagation">Propagation</label>
                       <input
                           name="propagation"
                           type="text"
                           defaultValue={plantState.propagation}
                           placeholder="Ex. Seeds, cuttings, grafting"
                           onChange={(e) => setPlantState({ ...plantState, propagation: e.target.value })}
                       />
                   </div>
                   <div className="form-group">
                       <label htmlFor="toxicity">Toxicity</label>
                       <input
                           name="toxicity"
                           type="text"
                           defaultValue={plantState.toxicity}
                           placeholder="Ex. Non-toxic"
                           onChange={(e) => setPlantState({ ...plantState, toxicity: e.target.value })}
                       />
                   </div>
                   <div className="form-group">
                                           {/* pest and diseases */}
                       <label htmlFor="pestsAndDiseases">Pests and Diseases</label>
                       <input
                           name="pestsAndDiseases"
                           type="text"
                           defaultValue={plantState.pestsAndDiseases}
                           placeholder="Ex. Apple scab, cedar apple rust, codling moth, fireblight"
                           onChange={(e) => setPlantState({ ...plantState, pestsAndDiseases: e.target.value })}
                       />
                   </div>
   
               </div>
           
   
               )}
               
            </div>
             <div className="form-section">
               <h3 className="form-category">Additional Information <span onClick={() => handleIsExpanded("additionalInformation")}>{isExpandedMap["additionalInformation"] ? "-" : "+"}</span></h3>
               {isExpandedMap["additionalInformation"] && (
                    <div className="form-row">
                    <div className="form-group">
                            {/* note */}
                            <label htmlFor="note">Note</label>
                            <input
                                name="note"
                                type="text"
                                defaultValue={plantState.note}
                                placeholder="Ex. Apples need at least 600 chill hours to produce fruit"
                                onChange={(e) => setPlantState({ ...plantState, note: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            {/* funInterestingFact */}
                            <label htmlFor="funInterestingFact">Fun Interesting Fact</label>
                            <input
                                name="funInterestingFact"
                                type="text"
                                defaultValue={plantState.funInterestingFact}
                                placeholder="Ex. Apples are the most popular fruit in the world"
                                onChange={(e) => setPlantState({ ...plantState, funInterestingFact: e.target.value })}
                            />
                        </div>
                    </div>
                 
               )}
               </div>
   
             <div className="form-section">
               <h3 className="form-category">Image <span onClick={() => handleIsExpanded("image")}>{isExpandedMap["image"] ? "-" : "+"}</span></h3>
               {isExpandedMap["image"] && (
                   <div className="form-row">
                   <div className="form-group">
                           {/* image */}
                           <label htmlFor="imageUrl">Image URL</label>
                           <input
                               name="imageUrl"
                               type="text"
                               defaultValue={plantState.imageUrl}
                               placeholder="Image URL"
                               onChange={(e) => setPlantState({ ...plantState, imageUrl: e.target.value })}
                           />
                   </div>
                 </div>
               )}
               
             </div>
   
             <div className="form-section">
               <h3 className="form-category">Plant Category <span onClick={() => handleIsExpanded("plantCategory")}>{isExpandedMap["plantCategory"] ? "-" : "+"}</span></h3>
               {isExpandedMap["plantCategory"] && (
                         <div className="form-row">
                         <div className="form-group">
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
                         </div>
                     </div>
               )}
             
             </div>
         
         
             {/* Add more form sections as needed */}
         
             <div className="form-actions">
               <button disabled={!plantState.commonName} className="submit-btn" type="submit">{isUpdating ? "Update plant" : "Create plant"}</button>
               {isUpdating && (
                 <button 
                   className="cancel-btn" 
                   type="button" 
                   onClick={() => {
                               setIsUpdating(false);
                               setPlantState(intialPlantState);
                               setSelectedCategoryId(null);
                             }}              >
                   Cancel update</button>
               )}
             </div>
            </>
        )}
         
        </form>
      );
      
//   );
};

export default Plants;
