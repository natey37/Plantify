import HttpError from "@wasp/core/HttpError.js";

export const getUser = async (args, context) => {
  const { userId } = args;
  return context.entities.User.findUnique({
    where: { id: userId },
    include: {
      plants: true,
      notes: true,
      wateringTasks: true,
    },
  });
};

export const getPlants = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Plant.findMany({
    where: { user: { id: context.user.id } },
  });
};
export const getCategories = async (args, context) => {
  return context.entities.Category.findMany({});
};

export const getNotes = async (args, context) => {
  const { plantId } = args;

  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.Note.findMany({
    where: { plantId: plantId, user: { id: context.user.id } },
  });
};

export const getWateringTasks = async (args, context) => {
  //   const { userId } = args;

  if (!context.user) {
    throw new HttpError(401);
  }

  return context.entities.WateringTask.findMany({
    where: { user: { id: context.user.id } },
  });
};
