import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetcookies } from "../utils/generateTokenAndSetcookies.js";

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      throw new Error("All fields are required");
    }

    const userAllreadyExists = await User.findOne({ email });
    if (userAllreadyExists) {
      throw new Error("User alread Exixts");
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      email,
      password: hashPassword,
      username,
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not exits " });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "incrrect password try again" });
    }
    generateTokenAndSetcookies(res, user._id);
    user.lastloginDate = Date.now();
    await user.save();
    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userData,
    });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ success: false, message: "Couldn't login" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out" });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found", user });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error in checkAuth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
