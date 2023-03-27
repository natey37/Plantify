//Plants

export const createPlant = async (args, context) => {
  const { name, categoryId, imageUrl, wateringFrequency } = args;

  console.log("ARGS", args);

  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Plant.create({
    data: {
      name,
      categoryId: categoryId,
      imageUrl,
      wateringFrequency,
      userId: context.user.id,
    },
  });
};

//Categories
export const createCategory = async (args, context) => {
  const { name } = args;

  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Category.create({
    data: {
      name,
    },
  });
};
//Notes
export const createNote = async (args, context) => {
  const { plantId, content } = args;

  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Note.create({
    data: {
      content,
      plant: { connect: { id: plantId } },
      user: { connect: { id: context.user.id } },
    },
  });
};
//WateringTasks
export const createWateringTask = async (args, context) => {
  const { plantId, dueDate } = args;
  console.log("ARGS", args);
  // const dateString = '2023-04-01';
  const dateObject = new Date(dueDate);

  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.WateringTask.create({
    data: {
      dueDate: dateObject,
      plant: { connect: { id: plantId } },
      user: { connect: { id: context.user.id } },
    },
  });
};
const entityOptions = ["Plant", "Note", "WateringTask"];

//UPDATE
const updateEntity = (entityName, updateData) => {
  return async (args, context) => {
    const { id } = args;

    if (!context.user) {
      throw new HttpError(401);
    }

    const entity = await context.entities[entityName].findFirst({
      where: { id },
    });

    if (!entity) {
      throw new HttpError(403);
    }
    if (entityOptions.includes(entity) && entity.userId !== context.user.id) {
      throw new HttpError(403);
    }

    return context.entities[entityName].update({
      where: { id },
      data: updateData(args),
    });
  };
};

export const updatePlant = updateEntity(
  "Plant",
  ({ name, categoryId, imageUrl, wateringFrequency }) => ({
    name,
    categoryId,
    imageUrl,
    wateringFrequency,
  })
);

export const updateCategory = updateEntity("Category", ({ name }) => ({
  name,
}));

export const updateNote = updateEntity("Note", ({ content }) => ({
  content,
}));

export const updateWateringTask = updateEntity(
  "WateringTask",
  ({ dueDate, completed }) => ({
    dueDate,
    completed,
  })
);

//DELETE

const deleteEntity = (entityName) => {
  return async (args, context) => {
    const { id } = args;

    if (!context.user) {
      throw new HttpError(401);
    }

    const entity = await context.entities[entityName].findUnique({
      where: { id },
    });

    if (!entity) {
      throw new HttpError(403);
    }
    if (entityOptions.includes(entity) && entity.userId !== context.user.id) {
      throw new HttpError(403);
    }

    return context.entities[entityName].delete({ where: { id } });
  };
};

export const deletePlant = deleteEntity("Plant");
export const deleteCategory = deleteEntity("Category");
export const deleteNote = deleteEntity("Note");
export const deleteWateringTask = deleteEntity("WateringTask");


//GPT-3

// import openai from 'openai';
// import { createAsyncAction } from '@wasp/actions';

// openai.apiKey = process.env.OPENAI_API_KEY;

// export const generateText = async (prompt) => {
//   try {
//     const response = await openai.Completion.create({
//       engine: 'davinci-codex',
//       prompt: prompt,
//       max_tokens: 100,
//       n: 1,
//       stop: null,
//       temperature: 1,
//     });

//     return response.choices[0].text.trim();
//   } catch (error) {
//     throw new Error('Error generating text: ' + error.message);
//   }
// };

// export default createAsyncAction('generateGpt3Text', async (prompt) => {
//   const response = await generateText(prompt);
//   return response;
// });




// const openaiApiKey = config.REACT_APP_OPENAI_API_KEY;

// async function sendRequest(prompt, tokens) {
//   try {
//     const response = await fetch(
//       'https://api.openai.com/v1/engines/davinci-codex/completions',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${openaiApiKey}`,
//         },
//         body: JSON.stringify({
//           prompt,
//           max_tokens: tokens,
//           n: 1,
//           temperature: 0.7,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(`Error: ${data.message}`);
//     }

//     return data.choices[0].text;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// export default createAsyncAction('generateGpt3Text', async (prompt) => {
//   const response = await sendRequest(prompt, 100);
//   return response;
// });


const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const generatePlantGpt3 = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const tokens = req.body.tokens;

    const response = await fetch(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          prompt,
          max_tokens: tokens,
          n: 1,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error: ${data.message}`);
    }

    res.status(200).json({ text: data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


