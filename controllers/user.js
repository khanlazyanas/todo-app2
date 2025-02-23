import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendcookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/err.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Allready exist", 400));

    const hassedpassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hassedpassword });
    sendcookie(user, res, `Register successfully ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid email or password", 400));

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch)
      return next(new ErrorHandler("Invalid email or password", 400));

    sendcookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyDetail = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()),
        samSite: process.env.NODE_ENV==="Development" ? "lax" : "none",
        secure:process.env.NODE_ENV==="Development" ? false : true
       })

      .json({
        success: true,
        user: req.user,
        message: "Logout successfully",
      });
  } catch (error) {
    next(error);
  }
};
