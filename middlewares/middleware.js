import jwt from "jsonwebtoken";

const middleware = async (req, res, next) => {

  try {
    const token = req.cookies?.access_token;
    if (!token) {
     
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
   
    req.user = { id: decodedUser.id };
    next();
  } catch (error) {
    console.error("Error in middleware:", error.message);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
export default middleware;
