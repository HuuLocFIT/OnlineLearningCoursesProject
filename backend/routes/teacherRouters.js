const express = require('express');
const router = express.Router();
const {getTeachers} = require('../controller/teacherController')
router.get('/', getTeachers);

module.exports = router;