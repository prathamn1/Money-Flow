const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // console.log(req.headers)
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    // console.log("catch middleware")
    res.send({
      message: error.message,
      success: false,
    });
  }
};