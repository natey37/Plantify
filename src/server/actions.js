//Plants

export const createPlant = async (args, context) => {
  const {
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
  } = args;
  console.log("ARGS", args);

  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Plant.create({
    data: {
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
      categoryId: categoryId,
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
  console.log("DATE", dateObject);
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
  ({
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
  }) => ({
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

//GPT-3 and DALLE
const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const generatePlantGpt3 = async ({ prompt }) => {
  const newPrompt = `Please fill out this template for ${prompt}. Please keep everything as succinct as possible. [Species]. [Common Name]. [Light Requirements]. [Water Requirements]. [Watering Schedule - give answer as Daily, Weekly, Bi-Weekly, Monthly]. [Soil Requirements]. [Fertilizer Requirements]. [Propagation]. [Pests and Diseases]. [Toxicity]. [Other]. [Notes]. [Fun Interesting Fact]. [Category].`;

  console.log("NEW PROMPT", newPrompt);
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          prompt: newPrompt,
          max_tokens: 300,
          n: 1,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    console.log("Data IN GENERATE PLANT WTF", data);

    return data.choices[0].text;
  } catch (error) {
    console.error(error);
  }
};

export const generateImageDalle = async ({ prompt, user }) => {
  try {
    const newPrompt = `PROMPT: Create an artistic, semi-realistic image of a ${prompt} The image should have a natural and organic feel to it, and should be suitable for use in a garden or nature-themed project. Please ensure that the image is high-resolution and visually appealing.

    PARAMETERS:
    - Image size: 512x512 pixels
    - Number of objects: 1-5
    - Style: Realistic with artistic flair
    - Camera angle: Top-down or front-facing
    - Lighting: Natural, with soft shadows
    - Background: Neutral or natural, with some texture
    - Color palette: Natural greens and earthy tones, with pops of color
    - Additional notes: Please avoid adding any artificial or overly stylized elements to the image, and strive for a balance between realism and artistic expression. The image should be suitable for use in print or digital media.
    `;
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          prompt: newPrompt,
          size: "512x512",
          n: 1,
          response_format: "url",
        }),
      }
    );

    const data = await response.json();
    const s3Url = saveImageToBucket(
      data.data[0].url,
      "plantify-images",
      `${user.username}/${prompt}.png`
    );
    return s3Url;
  } catch (error) {
    console.error(error);
  }
};

import AWS from "aws-sdk";
import fetch from "node-fetch";

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

// Create an S3 instance
const s3 = new AWS.S3();

async function saveImageToS3(url, bucketName, key) {
  try {
    // Fetch the image from the URL
    const response = await fetch(url);
    const buffer = await response.buffer();

    // Upload the image to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: response.headers.get("content-type"),
      // ACL: 'public-read', // Set to 'public-read' to make the file publicly accessible
    };

    const uploadResult = await s3.upload(uploadParams).promise();
    // Return the URL of the uploaded image in S3
    return uploadResult.Location;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

const saveImageToBucket = async (url, bucketName, key) => {
  try {
    const savedImageUrl = await saveImageToS3(url, bucketName, key);
    console.log("Image saved to S3:", savedImageUrl);
    return savedImageUrl;
  } catch (error) {
    console.error("Error:", error);
  }
};
