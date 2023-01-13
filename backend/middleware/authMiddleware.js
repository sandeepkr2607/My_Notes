const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../modals/userModal");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // console.log(token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      // console.log(req.user);

      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Not Authorised" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Not Authorised" });
  }
});

module.exports = { protect };
