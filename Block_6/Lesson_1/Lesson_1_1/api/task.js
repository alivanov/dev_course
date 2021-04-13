const Task = require('../db/models/task');

exports.addTask = async ({ title, description }) => {
  try {
    const newTask = new Task({
      title,
      description,
    });

    const task = await newTask.save();

    return Promise.resolve({
      success: true,
      data: task,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.getTask = async ({ id }) => {
  try {
    const task = await Task.findById(id);

    return Promise.resolve({
      success: true,
      data: task,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.getTasks = async () => {
  try {
    const tasks = await Task.find();

    return Promise.resolve({
      success: true,
      data: tasks,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

exports.updateTask = async ({ id, title, description }) => {
  try {
    const task = await Task.findById(id);

    task.set({ title, description });

    await task.save();

    return Promise.resolve({
      success: true,
      data: task,
    });
  } catch (err) {
    return Promise.reject(err);
  }
};
