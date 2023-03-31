const { User, Thought } = require("../models");

// GET all users
const getAllUsers = async (req, res) => {
  User.find()
    .select("-__v")
    .then(async (users) => {
      return res.json(users);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// GET single user by _id
const getUser = async (req, res) => {
  User.findOne({ _id: req.params.userId })
    .populate("friends")
    .populate("thoughts")
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No user found" })
        : res.json({
            user,
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// POST new user
const createUser = async (req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};

// PUT user by _id
const updateUser = async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
    {
      runValidators: true,
      new: true,
    }
  )
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No user found" })
        : res.json({
            user,
          })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// DELETE user by _id
const deleteUser = async (req, res) => {
  User.findOneAndRemove({ _id: req.params.userId })
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: "No user found" })
        : res.json({
            user,
          })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// Add new friend
const addFriend = async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $addToSet: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user found" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

// DELETE user's friend by _id
const deleteFriend = async (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { friends: req.params.friendId } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No user found" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
