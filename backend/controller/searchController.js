const asyncHandler = require("express-async-handler")
const Course = require("../models/courseModel");

const { Op } = require('sequelize');

const searchCourseByName = asyncHandler(async (req, res) => {
  const { nameCourse, page } = req.query;
  const size = 6;
  const offset = (page - 1) * size;
  const limit = size;
  try {
    const {count, rows} = await Course.findAndCountAll({
      limit,
      offset,
      where: {
        name: {
          [Op.like]: `%${nameCourse}%`,
        },
      },
    });

    const pagination = {
      totalItems: count,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      pageSize: size,
      data: rows,
    };

    res.status(200).json(pagination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {searchCourseByName}