const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const db = require("../mysqldb/db");

//@desc  Get list users
//@route GET /api/users/list
//@access Public
const getUsers = asyncHandler(async (req, res) => {
  const [users] = await db.connection.execute("SELECT * FROM user");
  res.status(200).json(users);
});

//@desc  Get list users
//@route GET /api/users/management-accounts
//@access Public
const getUsersWithoutAdmin = asyncHandler(async (req, res) => {
  try {
    const users = await db.connection.execute(
      "SELECT * FROM user WHERE job=? OR job=?",
      ["teacher", "student"]
    );
    res.status(200).json(users[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//@desc  Register users
//@route POST /api/users/
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const getCurrentDate = () => {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Đảm bảo rằng tháng và ngày có độ dài là 2
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    const currentDate = `${year}-${month}-${day}`;
    return currentDate;
  };
  const { fullname, username, password, email, job } = req.body;
  if (!fullname || !username || !password || !email || !job) {
    res.status(400);
    throw Error("Please enter full fields");
  }

  // Check exist
  const existUser = await db.connection.execute(
    "SELECT * FROM user WHERE username=?",
    [username]
  );
  if (existUser[0] && existUser[0].length > 0) {
    res.status(400);
    throw Error("username is existing in system");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Insert new user record into the database
  const [result] = await db.connection.execute(
    "INSERT INTO user (fullname, username, password, email, job, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    [fullname, username, hashedPassword, email, job, getCurrentDate()]
  );

  if (result.affectedRows === 1) {
    const newUser = {
      id: result.insertId,
      fullname,
      username,
      email,
      job,
    };
    res.status(201).json({
      ...newUser,
      token: generateToken(newUser.id),
    });
  } else {
    res.status(400);
    throw Error("Failed to create user");
  }
});

//@desc  Update user
//@route PUT /api/users/id
//@access Public

const updateStatusOfUser = asyncHandler(async (req, res) => {
  const idUser = req.params.idUser;
  const status = req.params.status;
  const result = await db.connection.execute(
    `UPDATE user SET status=? WHERE id = ?`,
    [status, idUser]
  );

  if (result) {
    res.status(200);
  } else {
    res.status(400);
    throw Error("User not found");
  }
});

const updateEnabledOfUser = asyncHandler(async (req, res) => {
  const idUser = req.params.idUser;
  const isEnabled = req.params.isEnabled;
  const result = await db.connection.execute(
    `UPDATE user SET is_enabled=? WHERE id = ?`,
    [isEnabled, idUser]
  );

  if (result) {
    res.status(200);
  } else {
    res.status(400);
    throw Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const idUser = req.params.id;
  const { fullname, username, email } = req.body;

  let result = null;
  if (req.file) {
    console.log(req.file.path);
    const imageFile = req.file.path;
    result = await db.connection.execute(
      "UPDATE user SET fullname = ?, username = ?, email = ?, image=? WHERE id = ?",
      [fullname, username, email, imageFile, idUser]
    );
  } else {
    result = await db.connection.execute(
      "UPDATE user SET fullname = ?, username = ?, email = ? WHERE id = ?",
      [fullname, username, email, idUser]
    );
  }

  if (result) {
    res.status(200).json(updateUser);
  } else {
    res.status(400);
    throw Error("User not found");
  }
});

//@desc  Delete user
//@route DELETE /api/users/id
//@access Public

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw Error("User not found");
  }
  await user.remove();
  res.status(200).json({ id: req.params.id });
});

//@desc  Get user by id
// @route GET api/users/id
const getUserById = asyncHandler(async (req, res) => {
  const idUser = req.params.id;

  console.log(idUser);

  const user = await db.connection.execute("SELECT * FROM user WHERE id=?", [
    idUser,
  ]);

  if (!user) {
    res.status(400);
    throw Error("User not found");
  } else {
    res.status(200).json(user[0][0]);
  }
});

//@desc  Login user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  // Check username exit in system
  const result = await db.connection.execute(
    "SELECT * FROM user WHERE username=?",
    [username]
  );
  const user = result[0][0];

  if (!user.is_enabled) {
    res.status(400).json({
      message:
        "Login failed. Your account is disabled now. Please contact with us to receive support!",
    });
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      job: user.job,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Login failed" });
  }
});

//@desc  Get in4 of myself
//@route GET /api/users/me
//@access Public

const getMe = asyncHandler(async (req, res) => {
  const result = await db.connection.execute("SELECT * FROM user WHERE id=?", [
    req.user.id,
  ]);
  const { _id, fullname, username, email, job } = result[0][0];

  res.status(200).json({
    id: _id,
    fullname,
    username,
    email,
    job,
  });
});

const getTotalTodayUsers = asyncHandler(async (req, res) => {
  const nowDate = req.query.date;

  const result = await db.connection.execute(
    "SELECT COUNT(id) AS total FROM user WHERE created_at=?",
    [nowDate]
  );

  if (result) {
    res.status(200).json(result[0][0].total);
  } else {
    res.status(404);
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu hoặc hệ thống không
    const user = await db.connection.execute(
      "SELECT * FROM user WHERE email=?",
      [email]
    );

    if (!user[0] || user[0].length === 0) {
      res.status(400).json({ message: "Email does not exist" });
      return;
    }

    // Tạo mã thông báo (token) với email của người dùng
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Gửi email chứa liên kết đặt lại mật khẩu đến email người dùng
    sendResetPasswordEmail(email, token);

    res.json({ message: "Reset password email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Xác thực tính hợp lệ của mã thông báo
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra xem mã thông báo có hợp lệ và chưa hết hạn hay không
    if (!decodedToken.email) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu hoặc hệ thống
    await db.connection.execute("UPDATE user SET password=? WHERE email=?", [
      hashedPassword,
      decodedToken.email,
    ]);

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Hàm gửi email chứa liên kết đặt lại mật khẩu
const sendResetPasswordEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    // Cấu hình email transport (SMTP, Gmail, v.v.)
    // Ví dụ: sử dụng Gmail SMTP
    service: "gmail",
    auth: {
      user: "nguyenhuuloc7654@gmail.com",
      pass: "uyyseekmpbsmvada",
    },
  });

  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

  const mailOptions = {
    from: "nguyenhuuloc7654@gmail.com",
    to: email,
    subject: "Reset Password",
    html: `
      <h1>Reset Password</h1>
      <p>You have requested to reset your password. Please click the following link to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
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
  getTotalTodayUsers,
  forgotPassword,
  resetPassword,
};
