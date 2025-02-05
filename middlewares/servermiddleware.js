import jwt from "jsonwebtoken";

const servermiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = { id: decodedUser.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
export default servermiddleware;
