const router = require("express").Router();
const {
  loginController,
  registerController,
  currentUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .post("/login", loginController)
  .post("/register", registerController)
  .get("/get-current-user", authMiddleware, currentUserController);

module.exports = router;
