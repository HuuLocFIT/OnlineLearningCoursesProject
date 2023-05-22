import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PaidIcon from "@mui/icons-material/Paid";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import axios from "axios";
import { useState, useEffect } from "react";

import LineChart from "adminComponents/chart/LineChart";
import BarChart from "adminComponents/chart/BarChart";
import PieChart from "adminComponents/chart/PieChart";
import StatBox from "adminComponents/StatBox";
import { mockTransactions } from "dataDashboard/mockData";
import Header from "adminComponents/Header";

const Dashboard = () => {
  const theme = useTheme();
  const [totalMoney, setTotalMoney] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalMoneyPreviousDate, setTotalMoneyPreviousDate] = useState(0);
  const [totalClientsPreviousDate, setTotalClientsPreviousDate] = useState(0);
  const [totalUsersPreviousDate, setTotalUsersPreviousDate] = useState(0);
  const [totalCoursesPreviousDate, setTotalCoursesPreviousDate] = useState(0);
  const [dataNumberOfStudents, setDataNumberOfStudents] = useState([]);
  const [dataNumberOfCourses, setDataNumberOfCourses] = useState([]);
  const [dataRevenues, setDataRevenues] = useState([]);
  const [dataNumberOfClients, setDataNumberOfClients] = useState([]);
  const [dataPieChart, setDataPieChart] = useState([])

  const [listOrders, setListOrders] = useState([]);

  const goalTodayMoney = 10000000;
  const goalTodayUsers = 100;
  const goalTodayClients = 100;
  const goalTodayCourses = 100;

  const [totalRevenues, setTotalRevenues] = useState(0);

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

  // Function to calculate the previous date
  const getPreviousDate = () => {
    var today = new Date(); // Get the current date
    var previousDate = new Date(today); // Create a new date object with the current date

    previousDate.setDate(today.getDate() - 1); // Subtract 1 day from the current date

    var year = previousDate.getFullYear();
    var month = (previousDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
    var day = previousDate.getDate().toString().padStart(2, "0");

    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  };

  const formatCurrency = (value) => {
    // Kiểm tra nếu value không phải là số
    if (isNaN(value)) {
      return "Invalid value";
    }

    // Chuyển đổi giá trị sang số và làm tròn đến 0 chữ số thập phân
    const amount = Number(value).toFixed(0);

    // Chuyển đổi thành chuỗi và thêm dấu phân tách hàng nghìn
    const formattedAmount = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedAmount;
    // Thêm đơn vị tiền tệ (đơn vị và ký hiệu bạn có thể thay đổi tùy ý)
    // return `${formattedAmount} VNĐ`;
  };

  const handleGetTodayMoney = async (nowDate) => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/money?date=${nowDate}`
    );
    return response.data;
  };

  const handleGetTodayClients = async (nowDate) => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/client?date=${nowDate}`
    );
    return response.data;
  };

  const handleGetTodayUsers = async (nowDate) => {
    const response = await axios.get(
      `http://localhost:5000/api/users/total-users?date=${nowDate}`
    );
    return response.data;
  };

  const handleGetTodayCourses = async (nowDate) => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/course?date=${nowDate}`
    );
    return response.data;
  };

  const handleGetPreviousDateMoney = async (previousDate) => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/money?date=${previousDate}`
    );
    return response.data;
  };

  const handleGetPreviousDateClients = async (previousDate) => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/client?date=${previousDate}`
    );
    return response.data;
  };

  const handleGetPreviousDateUsers = async (previousDate) => {
    const response = await axios.get(
      `http://localhost:5000/api/users/total-users?date=${previousDate}`
    );
    return response.data;
  };

  const handleGetPreviousDateCourses = async (previousDate) => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/course?date=${previousDate}`
    );
    return response.data;
  };

  const handleGetListOrders = async () => {
    const response = await axios.get(`http://localhost:5000/api/orders/`);
    return response.data;
  };

  const handleGetDataNumberOfStudents = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/students`
    );
    return response.data;
  };

  const handleGetDataNumberOfCourses = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/courses`
    );
    return response.data;
  };

  const handleGetDataRevenues = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/revenues`
    );
    return response.data;
  };

  useEffect(() => {
    // Sử dụng hàm để lấy ngày hiện tại
    const currentDate = getCurrentDate();
    const previousDate = getPreviousDate();

    handleGetTodayMoney(currentDate).then((result) => {
      if (result) {
        setTotalMoney(result);
      }
    });

    handleGetTodayClients(currentDate).then((result) => {
      if (result) {
        setTotalClients(result);
      }
    });

    handleGetTodayUsers(currentDate).then((result) => {
      if (result) {
        setTotalUsers(result);
      }
    });

    handleGetTodayCourses(currentDate).then((result) => {
      if (result) {
        setTotalCourses(result);
      }
    });

    handleGetPreviousDateMoney(previousDate).then((result) => {
      if (result) {
        setTotalMoneyPreviousDate(result);
      }
    });

    handleGetPreviousDateClients(previousDate).then((result) => {
      if (result) {
        setTotalClientsPreviousDate(result);
      }
    });

    handleGetPreviousDateUsers(previousDate).then((result) => {
      if (result) {
        setTotalUsersPreviousDate(result);
      }
    });

    handleGetPreviousDateCourses(previousDate).then((result) => {
      if (result) {
        setTotalCoursesPreviousDate(result);
      }
    });

    handleGetListOrders().then((result) => {
      setListOrders(result);

      let dataPrice = []
      for(let i = 0; i < 5; i++) {
        dataPrice[i] = 0
      }

      for(let i = 0; i < result.length; i++) {
        if(result[i].sum_price > 4000000) {
          dataPrice[0] += result[i].sum_price
        } else if(result[i].sum_price > 3000000 && result[i].sum_price <= 4000000) {
          dataPrice[1] += result[i].sum_price
        } else if(result[i].sum_price > 2000000 && result[i].sum_price <= 3000000){
          dataPrice[2] += result[i].sum_price
        } else if(result[i].sum_price >= 1000000 && result[i].sum_price <= 2000000) {
          dataPrice[3] += result[i].sum_price
        } else {
          dataPrice[4] += result[i].sum_price
        }
      }

      setDataPieChart(dataPrice);
    });

    handleGetDataNumberOfStudents().then((result) => {
      setDataNumberOfStudents(result);
    });

    handleGetDataNumberOfCourses().then((result) => {
      setDataNumberOfCourses(result);
    });

    handleGetDataRevenues().then((result) => {
      setDataRevenues(result.data);
      setTotalRevenues(result.total_price)
      setDataNumberOfClients(result.total_clients)
    });
  }, []);

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className="mb-3"
      >
        <Header title="DASHBOARD" subtitle="Welcome to Dashboard"/>
        {/* <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.blueAccent[600],
              color: theme.palette.neutral[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: theme.palette.blueAccent[700], // Change the background color on hover
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows={{ xs: "auto", sm: "140px" }}
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6" }}
          xs={{padding: "10px 0"}}
          backgroundColor={theme.palette.primary.main}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={formatCurrency(totalMoney) + " VND"}
            subtitle="Today's Money"
            progress={
              totalMoneyPreviousDate === 0
                ? totalMoney / goalTodayMoney
                : (totalMoney - totalMoneyPreviousDate) / totalMoneyPreviousDate
            }
            increase={
              totalMoneyPreviousDate === 0
                ? Number((totalMoney / goalTodayMoney) * 100).toFixed(2)
                : (
                    (Number(totalMoney - totalMoneyPreviousDate) /
                      totalMoneyPreviousDate) *
                    100
                  ).toFixed(2)
            }
            icon={
              <PaidIcon
                sx={{ color: theme.palette.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6" }}
          xs={{padding: "10px 0"}}
          backgroundColor={theme.palette.primary.main}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalUsers}
            subtitle="Today's Users"
            progress={
              totalUsersPreviousDate === 0
                ? totalUsers / goalTodayUsers
                : (totalUsers - totalUsersPreviousDate) / totalUsersPreviousDate
            }
            increase={
              totalUsersPreviousDate === 0
                ? Number((totalUsers / goalTodayUsers) * 100).toFixed(2)
                : (
                    (Number(totalUsers - totalUsersPreviousDate) /
                      totalUsersPreviousDate) *
                    100
                  ).toFixed(2)
            }
            icon={
              <SupervisedUserCircleIcon
                sx={{ color: theme.palette.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6" }}
          xs={{padding: "10px 0"}}
          backgroundColor={theme.palette.primary.main}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalClients}
            subtitle="Today's Clients"
            progress={
              totalClientsPreviousDate === 0
                ? totalClients / goalTodayClients
                : (totalClients - totalClientsPreviousDate) /
                  totalClientsPreviousDate
            }
            increase={
              totalClientsPreviousDate === 0
                ? Number((totalClients / goalTodayClients) * 100).toFixed(2)
                : (
                    (Number(totalClients - totalClientsPreviousDate) /
                      totalClientsPreviousDate) *
                    100
                  ).toFixed(2)
            }
            icon={
              <PersonAddIcon
                sx={{ color: theme.palette.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6" }}
          backgroundColor={theme.palette.primary.main}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalCourses}
            subtitle="Today's Courses"
            progress={
              totalCoursesPreviousDate === 0
                ? totalCourses / goalTodayCourses
                : (totalCourses - totalCoursesPreviousDate) /
                  totalCoursesPreviousDate
            }
            increase={
              totalCoursesPreviousDate === 0
                ? Number((totalCourses / goalTodayCourses) * 100).toFixed(2)
                : (
                    (Number(totalCourses - totalCoursesPreviousDate) /
                      totalCoursesPreviousDate) *
                    100
                  ).toFixed(2)
            }
            icon={
              <HistoryEduIcon
                sx={{ color: theme.palette.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
      </Box>

      {/* ROW 2 */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        className="mt-4"
      >
        <Box
          gridColumn={{xs: "span 12", sm: "span 8"}}
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
        >
          <Box
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={theme.palette.neutral[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={theme.palette.secondary[500]}
              >
                {Number(totalRevenues).toFixed(2)} Million
              </Typography>
            </Box>
            {/* <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: theme.palette.secondary[500] }}
                />
              </IconButton>
            </Box> */}
          </Box>
          <Box height="440px">
            <LineChart
              dataNumberOfStudents={dataNumberOfStudents}
              dataNumberOfCourses={dataNumberOfCourses}
              dataRevenues={dataRevenues}
            />
          </Box>
        </Box>

        <Box
          gridColumn={{xs: "span 12", sm: "span 4"}}
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${theme.palette.primary[400]}`}
            color={theme.palette.neutral[100]}
            p={2}
          >
            <Typography variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {listOrders.map((order, i) => (
            <Box
              key={order.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${theme.palette.primary[500]}`}
              p={2}
            >
              <Box>
                <Typography
                  color={theme.palette.redAccent.main}
                  variant="h5"
                  fontWeight="600"
                >
                  {i + 1}
                </Typography>
                <Typography color={theme.palette.neutral[100]}>
                  {order.username}
                </Typography>
              </Box>
              <Box color={theme.palette.neutral[100]}>{order.created_at}</Box>
              <Box
                backgroundColor={theme.palette.greenAccent.main}
                p={1}
                borderRadius="4px"
              >
                {formatCurrency(order.sum_price)} VND
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
        className="mt-4"
      >
        <Box
          gridColumn={{xs: "span 12", sm: "span 6"}}
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          className="p-6"
        >
          <Box overflow="auto" mt={-2}>
            <BarChart 
              dataNumberOfClients={dataNumberOfClients}
              dataNumberOfCourses={dataNumberOfCourses}
            />
          </Box>
        </Box>

        <Box
          gridColumn={{xs: "span 12", sm: "span 6"}}
          gridRow="span 2"
          backgroundColor={theme.palette.primary.main}
          overflow="auto"
          display="flex"
          justifyContent="center"
          className="pb-4 pt-2"
        >
          <PieChart dataPieChart={dataPieChart}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
