import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";

const RevenueDetail = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  const pathStringArray = pathname.split("/");
  const idOrder = pathStringArray[pathStringArray.length - 2];
  const idUser = pathStringArray[pathStringArray.length - 1];
  const [order, setOrder] = useState(null);
  const [infoClient, setInfoClient] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  const handleGetOrder = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/management-revenues/${idOrder}`
    );
    return response.data;
  };

  const handleGetOrderDetail = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/orders/management-revenues/details/${idOrder}`
    );
    return response.data;
  };

  const handleGetInfoClient = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/users/${idUser}`
    );
    return response.data;
  };

  useEffect(() => {
    handleGetOrder().then((result) => {
      setOrder(result);
    });

    handleGetOrderDetail().then((result) => {
      setOrderDetails(result);
    });

    handleGetInfoClient().then((result) => {
      setInfoClient(result);
    });
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh" mt="20px">
      {order && infoClient && (
        <Box
          sx={{
            width: { xs: "90%", sm: "60%" },
            border: `1px solid ${theme.palette.blueAccent[400]}`,
            padding: "10px",
          }}
        >
          <Typography mb="5px" fontSize="16px">ID: {idOrder}</Typography>
          <Typography mb="5px" fontSize="16px">Date: {order.created_at}</Typography>
          <Typography mb="5px" fontSize="16px">Username: {infoClient.username}</Typography>
          <Typography mb="5px" fontSize="16px">Email: {infoClient.email}</Typography>
          <Typography mb="5px" fontSize="16px">Full Name: {infoClient.fullname}</Typography>
          <Typography mb="5px" fontSize="16px">Courses: </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
            }}
            justifyContent="space-between"
            gap="10px"
            columnGap="1.33%"
          >
            {orderDetails.length > 0 &&
              orderDetails.map((orderDetail, index) => (
                <Card
                  key={index}
                  sx={{
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "0.55rem",
                  }}
                >
                  <CardContent>
                    <Typography>Name: {orderDetail.name}</Typography>
                    <Typography>Price: {orderDetail.price}</Typography>
                  </CardContent>
                </Card>
              ))}
          </Box>
          <Typography mt="10px" textAlign="right">
            Total Price: {order.sum_price}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RevenueDetail;
