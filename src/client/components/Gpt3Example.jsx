import { useState } from 'react';
import generatePlantGpt3 from '@wasp/actions/generatePlantGpt3';

const Gpt3Example = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleGenerateText = async () => {
    try {
      const generatedText = await generatePlantGpt3(inputText);
      setOutputText(generatedText);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };

  return (
    <div>
      <h1>GPT-3 Example</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="search for..."
      />
      <button onClick={handleGenerateText}>Generate text</button>
      <h2>Generated Text</h2>
      <p>{outputText}</p>
    </div>
  );
};

export default Gpt3Example;
