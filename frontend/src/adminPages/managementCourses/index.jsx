import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import Header from "adminComponents/Header";
import axios from "axios";
import useDebounce from "../../myhooks/useDebounce";
import FlexBetween from "adminComponents/FlexBetween";
import Pagination from "components/pagination/Pagination";

const AdminManagementCourse = ({
  id,
  id_author,
  name,
  image,
  description,
  rating,
  price,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 0rem">
          <Box
            component="img"
            alt="course"
            src={image}
            height="60px"
            width="60px"
            borderRadius="5px"
            sx={{ objectFit: "cover" }}
          />
          <Box textAlign="left">
            <Typography
              fontWeight="bold"
              fontSize="0.9rem"
              sx={{ color: theme.palette.secondary[100] }}
            >
              {name}
            </Typography>
            <Typography
              fontSize="0.8rem"
              sx={{ color: theme.palette.secondary[200] }}
            >
              Price: {price} VND
            </Typography>
          </Box>
        </FlexBetween>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>ID: {id}</Typography>
          <Typography>Author's ID: {id_author}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const AdminManagementCourses = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const allCourses = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:5000/api/courses?page=${page}`
    );
    return response.data;
  };

  useEffect(() => {
    allCourses().then((result) => {
      setCourses(result.data);
      setTotalPages(result.totalPages);
    });
  }, [page]);

  const handleLoadOtherPage = (newPage) => {
    setPage(newPage);
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

    // Thêm đơn vị tiền tệ (đơn vị và ký hiệu bạn có thể thay đổi tùy ý)
    return `${formattedAmount} VNĐ`;
  };

  const isNoneMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="COURSES" subtitle="These are the Courses" />
      {allCourses || !loading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNoneMobile ? undefined : "span 4" },
          }}
        >
          {courses.map(
            ({ id, id_author, name, image, description, rating, price }) => (
              <AdminManagementCourse
                key={id}
                id={id}
                id_author={id_author}
                name={name}
                image={image}
                description={description}
                rating={rating}
                price={price}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
      <Pagination
        onClickOtherPage={handleLoadOtherPage}
        totalPages={totalPages}
        page={page}
      />
    </Box>
  );
};

export default AdminManagementCourses;
