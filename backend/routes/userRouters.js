const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/uploader");

const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  getUserById,
  getUsersWithoutAdmin,
  updateStatusOfUser,
  updateEnabledOfUser,
  getTotalTodayUsers
} = require("../controller/userController");

// const {protect} = require('../middleware/authMiddleware')

router.post("/", registerUser);
router.post("/login", loginUser);
router.route("/total-users?").get(getTotalTodayUsers)
// router.get("/me", protect, getMe);
router.get("/me", getMe);
router.get("/list", getUsers);
router.route("/:id").put(upload.single('image'), updateUser).delete(deleteUser).get(getUserById);
router.post("/management-accounts", getUsersWithoutAdmin);
router.put("/status/:idUser/:status", updateStatusOfUser)
router.put("/action/:idUser/:isEnabled", updateEnabledOfUser)
module.exports = router;
