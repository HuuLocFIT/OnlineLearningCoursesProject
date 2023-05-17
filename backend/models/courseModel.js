const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../mysqldb/dbSequelize");

const Course = sequelize.define(
  "course",
  {
    id_author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // Vô hiệu hóa createdAt và updatedAt
    tableName: "course"
  },

);

module.exports = Course;
