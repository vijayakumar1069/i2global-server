import { USER } from "../schema/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  const checkUser = await USER.findOne({ email });
  if (checkUser) {
    return res.status(400).json({
      message: "User already exists",
      statusCode: 400,
    });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newuser = new USER({
    username,
    password: hashedPassword,
    email,
  });
  try {
    const savedUser = await newuser.save();
    const token = jwt.sign(
      { id: savedUser._id, username: username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    const { password, ...rest } = savedUser._doc;
    res.status(200).cookie("access_token", token, { httpOnly: true }).json({
      message: "User created successfully",
      user: rest,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await USER.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        statusCode: 404,
      });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    // Set the token as an HttpOnly cookie and send response
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true, // Prevent client-side access for better security
      })
      .json({
        message: "User logged in successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email, // Exclude sensitive information
        },
        statusCode: 200,
      });
  } catch (error) {
    // Pass errors to the global error handler
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    // Clear the access_token cookie
    res.clearCookie("access_token", {
      httpOnly: true,
    });

    // Send success response
    res.status(200).json({
      message: "User logged out successfully",
      statusCode: 200,
    });
  } catch (error) {
    // Forward error to the error-handling middleware
    next(error);
  }
};
