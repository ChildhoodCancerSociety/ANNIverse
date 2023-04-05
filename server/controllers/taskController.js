const createTask = async (req, res) => {
  const { taskName, assignee, description } = req.body;

  res.json({
    task: {
      taskName,
      assignee,
      description,
    },
  });
};

module.exports = { createTask };

const viewTaskList = async (req, res) => {
  const task = {
    taskName: "create basic components backend",
    assignee: "Rufan",
    description: "create basic components backend",
  };

  res.json({
    task,
  });
};

module.exports = { createTask, viewTaskList };
