import { useState } from 'react';
import generatePlantGpt3 from '@wasp/actions/generatePlantGpt3';
import generateImageDalle from '@wasp/actions/generateImageDalle';
import './Gpt3Example.css';
import createPlant from "@wasp/actions/createPlant";

//Example of text output from GPT-3
// "Species: Malus domestica Common Name: Apple Light Requirements: Full sun Water Requirements: Moderate Watering Schedule: Water when soil is dry to the touch Soil Requirements: Prefers well-draining, loamy soil Fertilizer Requirements: Feed in spring with a balanced fertilizer Propagation: Grafting or from seeds Pests and Diseases: Apple scab, codling moth, fire blight Toxicity: Non-toxic Other: Pruning is necessary to encourage fruiting Notes: Apples require cross-pollination to set fruit Fun Interesting Fact: Apples are the most widely cultivated tree fruit in the world. Free Image: https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Apple_and_cross_section.jpg/1200px-Apple_and_cross_section.jpg"

const Gpt3Example = ({ user }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState();
  const [isSaving, setIsSaving] = useState(false);
  const [generatedImage, setGeneratedImage] = useState();
  // console.log("INPUT TEXT: ", inputText)
  const handleGenerateText = async () => {
    try {
      setIsSaving(true);
      const generatedImage = await generateImageDalle({ prompt: inputText, user: user });
      console.log("GENERATED IMAGE: ", generatedImage)
      setGeneratedImage(generatedImage);
      const generatedText = await generatePlantGpt3({ prompt: inputText });
      console.log("GENERATED TEXT: ", generatedText)
      const dict = textToDictionary(generatedText)
      console.log("DICT: ", dict)
      setOutputText(dict);
      setIsSaving(false);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };
 const handleSavePlantClick = async () => {
  console.log("OUTPUT TEXT: ", outputText)
  console.log("HERE I AM !!!!!")


  await createPlant({ 
    species: outputText["Species"],
    commonName: outputText["Common Name"],
    lightRequirements: outputText["Light Requirements"],
    waterRequirements: outputText["Water Requirements"],
    wateringSchedule: outputText["Watering Schedule"],
    soilRequirements: outputText["Soil Requirements"],
    fertilizerRequirements: outputText["Fertilizer Requirements"],
    propagation: outputText["Propagation"],
    pestsAndDiseases: outputText["Pests and Diseases"],
    toxicity: outputText["Toxicity"],
    other: outputText["Other"],
    note: outputText["Notes"],
    funInterestingFact: outputText["Fun Interesting Fact"],
    imageUrl: generatedImage
  });

  setOutputText(null);
  setGeneratedImage(null);
 };

 const handleClearClick = () => {
  setOutputText(null);
  setGeneratedImage(null);
  };



  return (
    <div className='plants-container flex-column'>
      <h1>Plant Generator</h1>
      <p>Enter a plant name to generate a plant card, that displays information.</p>
      <p>Examples: Apple, Potato, Basil, Plum Tree, Roses</p>
      <textarea
        className='new-plant-form'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="search for..."
      />
       {isSaving ? (
            <div className="spinner"></div>
          ) : (
            <button className="submit-btn" onClick={handleGenerateText}>Generate Plant</button>
        )}
      {outputText && 
      <>
          <div className='plant-card'>
            <h2>Generated Plant</h2>
            <p><span className="bold-text">Species: </span>{outputText["Species"]}</p>
            <p><span className="bold-text">Common Name: </span>{outputText["Common Name"]}</p>
            <p><span className="bold-text">Light Requirements: </span>{outputText["Light Requirements"]}</p>
            <p><span className="bold-text">Water Requirements: </span>{outputText["Water Requirements"]}</p>
            <p><span className="bold-text">Watering Schedule: </span>{outputText["Watering Schedule"]}</p>
            <p><span className="bold-text">Soil Requirements: </span>{outputText["Soil Requirements"]}</p>
            <p><span className="bold-text">Fertilizer Requirements: </span>{outputText["Fertilizer Requirements"]}</p>
            <p><span className="bold-text">Propagation: </span>{outputText["Propagation"]}</p>
            <p><span className="bold-text">Pests and Diseases: </span>{outputText["Pests and Diseases"]}</p>
            <p><span className="bold-text">Toxicity: </span>{outputText["Toxicity"]}</p>
            <p><span className="bold-text">Other: </span>{outputText["Other"]}</p>
            <p><span className="bold-text">Notes: </span>{outputText["Notes"]}</p>
            <p><span className="bold-text">Fun Interesting Fact: </span>{outputText["Fun Interesting Fact"]}</p>
            <img style={{height: 'auto', width: 500}} src={generatedImage}/>
         </div>
         <div className='button-row'>
            <button className="submit-btn" onClick={handleSavePlantClick}>Save Plant</button>
            <button className='delete-btn' onClick={handleClearClick}>Clear</button>
         </div>
         

        </>
      }
    </div>
  );
};

export default Gpt3Example;


function textToDictionary(text) {
  const headers = [
    "Species",
    "Common Name",
    "Light Requirements",
    "Water Requirements",
    "Watering Schedule",
    "Soil Requirements",
    "Fertilizer Requirements",
    "Propagation",
    "Pests and Diseases",
    "Toxicity",
    "Other",
    "Notes",
    "Fun Interesting Fact",
    // "Free Image", 
  ];

  const dictionary = {};

  for (let i = 0; i < headers.length; i++) {
    const startKey = headers[i];
    // const endKey = headers[i + 1] ? `\\s${headers[i + 1]}:` : "$";
    // const regex = new RegExp(`${startKey}:\\s(.*?)\\s${endKey}`, "s");

    const endKey = headers[i + 1] || "$";
    // const regex = new RegExp(`${startKey}:\\s(.*?)(?:\\s${endKey}|$)`, "s");

    const regex = new RegExp(`${startKey}:\\s(.*?)\\s${endKey}`, "s");
    // const regex = new RegExp(`${startKey}:\\s(.*?)\\s(${endKey}|$)`, "s");

    const match = text.match(regex);
    if (match) {
      dictionary[startKey] = match[1].trim();
    }
  }
  // debugger
  const funInterestingFact = text.split("Fun Interesting Fact: ")[1];

  dictionary["Fun Interesting Fact"] = funInterestingFact;

  return dictionary;
}