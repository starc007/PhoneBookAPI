const express = require("express");
const router = express.Router();
const User = require("../model/PhoneBook");
const jwt = require("jsonwebtoken");
const verify = require("./VerifyToken");
// Get all the contacts
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.send("Error: " + err);
  }
});

// Add Contacts
router.post("/addcontact", async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "**Enter the name first**",
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: "**Enter the email first**",
    });
  }

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");
  const user = new User({
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
  });

  try {
    const savedContact = await user.save();
    //res.json(savedContact);
  } catch (err) {
    res.send(err);
  }
  // const token = await jwt.sign({ user }, process.env.TOKEN_KEY);
  // res.json({ token });
});

//Delete data
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) throw Error("No Contact Available");
    res.json({ success: true });
  } catch (err) {
    res.send("Error: " + err);
  }
});

//update data
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, req.body);
    if (!user) throw Error("Something is wrong..Try again!!");
    res.json({ success: true });
  } catch (err) {
    res.send("Error: " + err);
  }
});

//Search by Name
router.get("/:name", async (req, res) => {
  var regex = new RegExp(req.params.name, "i");
  const result = await User.find({ name: regex }).limit(10);
  if (!result) throw Error("Name not found");
  res.status(200).json(result);
});

module.exports = router;
