const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { login_name, password, first_name, last_name, location, description, occupation } = request.body;

    // Validate input
    if (!login_name || !password || !first_name || !last_name) {
      return response.status(400).send('login_name, password, first_name, and last_name must be provided');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ login_name });
    if (existingUser) {
      return response.status(400).send('User with this login_name already exists');
    }

    // Create new user
    const user = new User({ login_name, password, first_name, last_name, location, description, occupation });
    console.log(user);
    await user.save();

    // Send response
    response.send({ login_name: user.login_name });
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});

router.get("/list", async (request, response) => {
  try {
    const users = await User.find({});
    response.send(users);
  } catch (err) {
    response.status(400).send({ err });
  }
});
router.get("/:id", async (request, response) => {
  try {
    id = request.params.id;
    const user = await User.findOne({ _id: id });
    response.send(user);
    // console.log("day la o ham userdetail", request.session)
    // console.log(user)
  } catch (err) {
    response.status(400).send({ err });
  }
});
router.post("/admin/login", async (request, response) => {
  try {
    const { login_name, password } = request.body;
    console.log(login_name, password);

    // Validate input
    if (!login_name || !password) {
      return response.status(400).send('login_name must be provided');
    }

    // Check if user exists
    const user = await User.findOne({ login_name });
    const userObj = JSON.parse(JSON.stringify(user));
    // console.log(user);
    if (!user) {
      return response.status(400).send('User with this login_name does not exist');
    }

    // Check password
    const passwordMatch = (password == user.password ? true : false);
    // console.log
    if (!passwordMatch) {
      return response.status(400).send('Invalid password');
    }
    // console.log("day la o ham login", user)
    response.cookie('userId', userObj._id);
    // console.log("vua moi luu",request.cookies)

    // console.log("saukhilogin", request.session)

    // Send response
    response.send({ _id: user._id, login_name: user.login_name });
    // console.log({user});
  } catch (err) {
    response.status(400).send({ error: err.message });
  }
});
router.post("/admin/logout", (request, response) => {
  console.log(request.session.user)
  // if (!request.session.user) {
  //   return response.status(400).send('No user is currently logged in');
  // }
  response.clearCookie('userId');

  request.session.destroy(err => {
    if (err) {
      return response.status(400).send({ error: err.message });
    }
    // response.clearCookie('userId');
    response.send('User logged out successfully');
  });
});

router.delete("/delete/:userId", async (request, response) => {
  try {
    const { userId } = request.params;
    console.log(userId);

    // Check if user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return response.status(404).send('User not found');
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    // Send response
    response.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error);
    response.status(500).send('Server error');
  }
});
module.exports = router;
