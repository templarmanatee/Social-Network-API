const router = require("express").Router(); 
const { getAllThoughts, getThought, createThought, deleteThought, updateThought } = require("../../controllers/thoughtController");

// Thought routes without associated _id
router.route("/")
  .get(getAllThoughts)
  .post(createThought);

// Thought routes w/ associated _id
router.route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

// Thought routes w/ reaction
router.route("/:thoughtId/reactions")
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;