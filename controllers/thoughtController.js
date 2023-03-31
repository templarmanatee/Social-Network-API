const { User, Thought } = require("../models");

// GET all thoughts
const getAllThoughts = async (req, res) => {
  Thought.find()
    .then(async (thoughts) => {
      const thought = {
        thoughts,
      };
      return res.json(thought);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// GET single thought
const getThought = (req, res) => {
  Thought.findOne({ _id: req.params.thoughtId })
    .select("-__v")
    .then(async (thought) =>
      !thought
        ? res.status(404).json({ message: "No thought found" })
        : res.json({
            thought,
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
};

// POST new thought
const createThought = (req, res) => {
  Thought.create(req.body)
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
};

// PUT thought by _id
const updateThought = async (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    {
      runValidators: true,
      new: true,
    }
  )
    .then(async (thought) =>
      !thought
        ? res.status(404).json({ message: "No thought found" })
        : res.json({
            thought,
          })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// DELETE thought by _id
const deleteThought = async (req, res) => {
  Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought found" })
        : res.json(thought)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

const createReaction = async (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $addToSet: { Reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought found" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};

const removeReaction = async (req, res) => {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { Reaction: { ReactionId: req.params.ReactionId } } },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: "No thought found with that ID :(" })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getAllThoughts,
  getThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  removeReaction,
};
