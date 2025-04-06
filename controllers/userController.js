import UserSchema from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);

  if (!email || !username || !password) {
    return res.status(404).json({ message: "all fields are required" });
  }
  try {
    console.log("Checking for email:", email);
    const existingUser = await UserSchema.findOne({ email });
    console.log("Found user?", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await UserSchema.create({
      username,
      password,
      email,
    });
    console.log(newUser);

    res.status(201).json({ message: "User registration successfull" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: `${error.message} try again` });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({ message: "all fields are required" });
  }
  try {
    const user = await UserSchema.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    console.log(token);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: `${error.message} try again` });
  }
};

export const GetCurrentUser = async (req, res) => {
  const user = req.user;
  try {
    res.status(200).json({ message: "successfull", user });
  } catch (error) {
    console.log(error);
    console.log("error getting users");
    return res.status(500).json({ error });
  }
};

export const allUser = async (req, res) => {
  console.log("getting users");
  try {
    const users = await UserSchema.find({});
    console.log("gotten users");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    console.log("error getting users");
    return res.status(500).json({ error });
  }
};
