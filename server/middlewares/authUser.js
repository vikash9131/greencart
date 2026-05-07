import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";


const authUser = async (req, res, next) => {
  console.log("Cookies:", req.cookies);

  const token = req.cookies.token;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decoded.id;
    next();

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default authUser;