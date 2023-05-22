const express = require("express");
const router = express.Router();

const {
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
  } = require("../controller/orderController");

router.route("/students").get(getNumberOfStudentsEachMonths)
router.route("/courses").get(getNumberOfCoursesInOrderEachMonths)
router.route("/revenues").get(getRevenuesEachMonths)
router.route("/management-revenues/:idOrder").get(getOrderById)
router.route("/management-revenues/details/:idOrder").get(getOrderDetailById )
router.route("/management-revenues").get(getAllRevenues)
router.route("/").get(getListOrders)
router.route("/money?").get(getTotalTodayMoney)
router.route("/client?").get(getTotalTodayClients)
router.route("/course?").get(getTotalTodayCourses)
module.exports = router;