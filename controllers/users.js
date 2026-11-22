import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// creating new user
export const createUser = async (req, res) => {
  console.log('req.body', req.body);

  const user = new User(req.body);
  const saved = await user.save();

  res.status(201).json(saved);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updateUser) {
      return res.status(404).send("User Not Found!");
    }
    res.json(updateUser);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// deleting user by id
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).send("User Not Found!");
    }

    res.send(`User with id ${id} has been deleted successfully!`);

  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// find user by id
export const getUserInfo = async (req, res) => {
  const { id } = req.params;

  try {
    const userInfo = await User.findById(id);
    res.json(userInfo);

  } catch (error) {
    res.status(500).send("Server Error");
  }
};

