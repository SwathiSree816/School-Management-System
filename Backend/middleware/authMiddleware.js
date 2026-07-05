const jwt = require("jsonwebtoken");

const verifiedUser = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);
    if (!authHeader) {
      return res.status(401).json({ message: "No token found" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({ message: "Token still not active" });
    } else {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "Token expired" });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Invalid token" });
      }
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = verifiedUser;
