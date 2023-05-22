const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");

const db = require("../mysqldb/db");

const getOrderById = asyncHandler(async(req, res) => {
  const idOrder = req.params.idOrder;

  const result = await db.connection.execute("SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM orders WHERE id=?", [idOrder])
  if(result) {
    console.log(result[0][0])
    res.status(200).json(result[0][0])
  } else {
    res.status(400)
  }
})

const getOrderDetailById = asyncHandler(async (req, res) => {
  const idOrder = req.params.idOrder;

  const result = await db.connection.execute("SELECT *, (SELECT name FROM course WHERE id=order_detail.id_course) AS name FROM order_detail WHERE id_order=?", [idOrder])
  if(result) {
    console.log(result[0])
    res.status(200).json(result[0])
  } else {
    res.status(400)
  }
})

const getTotalTodayMoney = asyncHandler(async (req, res) => {
  const nowDate = req.query.date;

  const result = await db.connection.execute(
    "SELECT SUM(sum_price) AS total FROM orders WHERE created_at=?",
    [nowDate]
  );

  if (result) {
    res.status(200).json(result[0][0].total);
  } else {
    res.status(404);
  }
});

const getTotalTodayClients = asyncHandler(async (req, res) => {
  const nowDate = req.query.date;

  const order = await db.connection.execute(
    "SELECT COUNT(id_user) AS total FROM orders WHERE created_at=?",
    [nowDate]
  );

  if (order) {
    res.status(200).json(order[0][0].total);
  } else {
    res.status(404);
  }
});

const getTotalTodayCourses = asyncHandler(async (req, res) => {
  const nowDate = req.query.date;

  const result = await db.connection.execute(
    "SELECT COUNT(id_course) AS total FROM order_detail, orders WHERE order_detail.id_order = orders.id AND orders.created_at = ?",
    [nowDate]
  );

  if (result) {
    res.status(200).json(result[0][0].total);
  } else {
    res.status(404);
  }
});

const getListOrders = asyncHandler(async (req, res) => {
  const result = await db.connection.execute(
    "SELECT id, (SELECT username FROM user WHERE orders.id_user = user.id) AS username, sum_price, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM orders ORDER BY created_at DESC LIMIT 6"
  );

  if (result) {
    res.status(200).json(result[0]);
  } else {
    res.status(400);
  }
});

const getNumberOfStudentsEachMonths = asyncHandler(async (req, res) => {
  let result = await db.connection.execute(`
  SELECT 
  months.month,
  COUNT(users.id) AS count
FROM (
  SELECT 1 AS month UNION SELECT 2 AS month UNION SELECT 3 AS month UNION
  SELECT 4 AS month UNION SELECT 5 AS month UNION SELECT 6 AS month UNION
  SELECT 7 AS month UNION SELECT 8 AS month UNION SELECT 9 AS month UNION
  SELECT 10 AS month UNION SELECT 11 AS month UNION SELECT 12 AS month
) AS months
LEFT JOIN user AS users
ON MONTH(users.created_at) = months.month
GROUP BY 
  months.month
ORDER BY
  months.month
  `);
  
  if(result) {
    result = result[0]
    // Xử lý kết quả để tạo mảng chỉ chứa giá trị count
    const dataNumberOfStudents = result.map(result => result.count);
    res.status(200).json(dataNumberOfStudents)
  } else {
    res.status(404)
  }
});

const getNumberOfCoursesInOrderEachMonths = asyncHandler(async(req, res) => {
  let result = await db.connection.execute(`
  SELECT 
  months.month,
  IFNULL(COUNT(order_detail.id_course), 0) AS count
FROM (
  SELECT 1 AS month UNION SELECT 2 AS month UNION SELECT 3 AS month UNION
  SELECT 4 AS month UNION SELECT 5 AS month UNION SELECT 6 AS month UNION
  SELECT 7 AS month UNION SELECT 8 AS month UNION SELECT 9 AS month UNION
  SELECT 10 AS month UNION SELECT 11 AS month UNION SELECT 12 AS month
) AS months
LEFT JOIN orders
  ON MONTH(orders.created_at) = months.month
LEFT JOIN order_detail
  ON orders.id = order_detail.id_order
GROUP BY 
  months.month
ORDER BY
  months.month;

  `);
  
  if(result) {
    result = result[0]
    // Xử lý kết quả để tạo mảng chỉ chứa giá trị count
    const dataNumberOfCourses = result.map(result => result.count);
    res.status(200).json(dataNumberOfCourses)
  } else {
    res.status(404)
  }
})

const getRevenuesEachMonths = asyncHandler(async (req, res) => {
  let result = await db.connection.execute(`
  SELECT 
  months.month,
  IFNULL(SUM(orders.sum_price), 0) AS sum_price,
  IFNULL(COUNT(orders.id_user), 0) AS total_clients
FROM (
  SELECT 1 AS month UNION SELECT 2 AS month UNION SELECT 3 AS month UNION
  SELECT 4 AS month UNION SELECT 5 AS month UNION SELECT 6 AS month UNION
  SELECT 7 AS month UNION SELECT 8 AS month UNION SELECT 9 AS month UNION
  SELECT 10 AS month UNION SELECT 11 AS month UNION SELECT 12 AS month
) AS months
LEFT JOIN orders
  ON MONTH(orders.created_at) = months.month
GROUP BY 
  months.month
ORDER BY
  months.month;
  `);
  
  if(result) {
    result = result[0]
    
    const dataNumberOfRevenues = result.map(result => (result.sum_price / 100000));
    const totalSumPrice = result.reduce((accumulator, result) => accumulator + (result.sum_price / 1000000), 0);
    const totalClients = result.map(result => (result.total_clients));

    res.status(200).json({data: dataNumberOfRevenues, total_price: totalSumPrice, total_clients: totalClients})
  } else {
    res.status(404)
  }
})

const getAllRevenues = asyncHandler(async (req, res) => {
  const result = await db.connection.execute(`
  SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at, (SELECT username FROM user WHERE orders.id_user = user.id) AS username, 
  (SELECT email FROM user WHERE orders.id_user = user.id) AS email,
  (SELECT fullname FROM user WHERE orders.id_user = user.id) AS fullname
  FROM orders`)

  if(result) {
    res.status(200).json(result[0])
  } else {
    res.status(404)
  }
})

module.exports = {
  getTotalTodayMoney,
  getTotalTodayClients,
  getTotalTodayCourses,
  getListOrders,
  getNumberOfStudentsEachMonths,
  getNumberOfCoursesInOrderEachMonths,
  getRevenuesEachMonths,
  getAllRevenues,
  getOrderById,
  getOrderDetailById
};
