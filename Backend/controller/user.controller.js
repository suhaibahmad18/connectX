import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import createTokenAndSaveCookie, { clearAuthCookie } from "../jwt/generateToken.js";

// Compared against when the email is unknown so response timing doesn't reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync("connectx-timing-equalizer", 10);

const toPublicUser = (user) => ({
  _id: user._id,
  fullname: user.fullname,
  email: user.email,
});

export const signup = async (req, res, next) => {
  const { fullname, email, password } = req.valid.body;

  try {
    if (await User.exists({ email })) {
      return res.status(400).json({ error: "User already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ fullname, email, password: hashPassword });

    createTokenAndSaveCookie(newUser._id, res);
    res.status(201).json({
      message: "User created successfully",
      user: toPublicUser(newUser),
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({ error: "User already registered" });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.valid.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    const isMatch = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);

    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }

    createTokenAndSaveCookie(user._id, res);
    res.status(200).json({
      message: "User logged in successfully",
      user: toPublicUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  clearAuthCookie(res);
  res.status(200).json({ message: "User logged out successfully" });
};

export const allUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("fullname email")
      .lean();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
