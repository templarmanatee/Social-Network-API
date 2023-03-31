const router = require("express").Router();
const { getAllUsers, getUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require("../../controllers/userController");

// User routes without associated _id
router.route("/").get(getAllUsers).post(createUser);

// User routes w/ associated _id
router.route("/:userId")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// User routes w/ associated friendId
router.route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;