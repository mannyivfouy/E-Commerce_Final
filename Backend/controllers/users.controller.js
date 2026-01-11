const Users = require("../models/users.model");
const path = require("path");
const fs = require("fs");

// exports.uploadPhoto = (req, res) => {
//   if (!req.file) {
//     res.status(400).json({ message: "No File Upload" });
//   }
//   const userImage = `/uploads/users/${req.file.filename}`;
//   res.status(200).json({
//     url: userImage,
//   });
// };

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({ message: "Get All Users Successfully", users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "Get User Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    let imagePath = "/uploads/users/default.png";
    if (req.file) {
      imagePath = "/uploads/users/" + req.file.filename;
    }
    const user = new Users({
      fullname: req.body.fullname,
      username: req.body.username,
      password: req.body.password,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      role: req.body.role,
      userImage: imagePath,
    });
    await user.save();
    res.status(201).json({ message: "User Create", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserById = async (req, res) => {};

exports.deleteUserById = async (req, res) => {};
