const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const db  = require('../mysqldb/db');

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
    const users = await db.connection.execute("SELECT * FROM user WHERE job=? OR job=?", ["teacher", "student"]);
    res.status(200).json(users);
  } catch(error) {
    res.status(404).json({message: error.message})
  }
});

//@desc  Register users
//@route POST /api/users/
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, password, email, job } = req.body;
  if (!fullname || !username || !password || !email||!job) {
    res.status(400);
    throw Error("Please enter full fields");
  }

  // Check exist
  const existUser = await db.connection.execute("SELECT * FROM user WHERE username=?", [username]);
  if (existUser[0] && existUser[0].length > 0) {
    res.status(400);
    throw Error("username is existing in system");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Insert new user record into the database
  const [result] = await db.connection.execute(
    'INSERT INTO user (fullname, username, password, email, job) VALUES (?, ?, ?, ?, ?)',
    [fullname, username, hashedPassword, email, job]
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

const updateUser = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.params.id);
  // if (!user) {
  //   res.status(400);
  //   throw Error("User not found");
  // }
  // const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });
  // res.status(200).json(updateUser);
  const idUser = req.params.id;
  const { fullname, username, email, job } = req.body;
  const result = await db.connection.execute("UPDATE user SET fullname = ?, username = ?, email = ?, job = ? WHERE id = ?",
                  [fullname, username, email, job, idUser])

  if(result) {
    res.status(200).json(updateUser)
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
  const user = await db.connection.execute("SELECT * FROM user WHERE id=?", [idUser]);

  if(!user){
    res.status(400);
    throw Error("User not found");    
  }else{
    res.status(200).json(user[0][0]);
  }
});

//@desc  Login user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body
  // Check username exit in system
  const result = await db.connection.execute("SELECT * FROM user WHERE username=?", [username])
  const user = result[0][0]

  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user.id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      job: user.job,
      token: generateToken(user._id),
    })
  }else{
    res.status(400).json({ message: "Login failed" });
  }
});

//@desc  Get in4 of myself
//@route GET /api/users/me
//@access Public

const getMe = asyncHandler(async (req, res) => {
  const result = await db.connection.execute("SELECT * FROM user WHERE id=?", [req.user.id])
  const {_id, fullname, username, email, job} = result[0][0]

  res.status(200).json({
    id: _id,
    fullname,
    username,
    email,
    job,
  });
});

const generateToken = (id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET,{
    expiresIn: '30d',
  })
}


module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getMe,
  getUserById,
  getUsersWithoutAdmin
};
