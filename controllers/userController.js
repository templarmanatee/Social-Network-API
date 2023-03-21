const { User, Thought } = require("../models")

// GET all users
const getAllUsers = async (req, res) => {
  const users = User.find();
}; 

// GET single user by _id 
const getUser = async (req, res) => {

}; 

// POST new user
const createUser = async (req, res) => {

}; 

// PUT user by _id
const updateUser = async (req, res) => {

}; 

// DELETE user by _id 
const deleteUser = async (req, res) => {

}; 

// Add new friend 
const addFriend = async (req, res) => {

}; 

// DELETE user's friend by _id
const deleteFriend = async (req, res) => {
  
};

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };