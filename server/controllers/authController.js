const register = async (req, res) => {
  const { firstName, lastName, email, age, password } = req.body;

  res.json({
    user: {
      firstName,
      lastName,
      email,
      age,
      password,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  res.json({
    user: {
      email,
      password,
    },
  });
};

const updateUser = async (req, res) => {
  const { firstName, lastName, email, age, password } = req.body;

  res.json({
    user: {
      firstName,
      lastName,
      email,
      age,
      password,
    },
  });
};

const deleteUser = async (req, res) => {
  // delete user logic here
  res.json({
    message: "User deleted",
  });
};

module.exports = {
  register,
  login,
  updateUser,
  deleteUser,
};
