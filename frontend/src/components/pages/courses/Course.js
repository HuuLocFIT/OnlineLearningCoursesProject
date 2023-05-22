import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { Rating } from "@mui/material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../features/cart/cartSlice";
import styled from "styled-components";
import { toast } from "react-toastify";

import Pagination from "components/pagination/Pagination";
import CourseNotFound from "./CourseNotFound";
import Loading from "../../common/Loading";
import useDebounce from "../../../myhooks/useDebounce";
import Button from "./../../common/Button";

const CourseStyle = styled.div`
  @media screen and (width: 1024px) {
    max-width: 960px;
  }

  @media screen and (max-width: 1023px) {
    padding: 0 40px;
    .course-heading-container {
      flex-direction: column;
    }
    .course-search-box {
      margin-top: 20px;
      width: 100%;
    }
    .course-body-container {
      grid-template-columns: repeat(2, 1fr);
    }
    .course-item-price {
      font-size: 24px;
      font-weight: 700;
    }
  }

  @media screen and (max-width: 767px) {
    .course-body-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media screen and (max-width: 500px) {
    padding: 0 20px;
    .course-heading-title {
      font-size: 30px;
      font-weight: 600;
    }
    .course-search-box {
      display: flex;
      flex-direction: column;
    }
  }
`;

const Course = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const searchValueDebounce = useDebounce(searchQuery, 1000);
  const searchRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllCourse = async (queryString) => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:5000/api/search/course?nameCourse=${queryString}&page=${page}`
    );
    return response.data;
  };

  const countAllCourses = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/courses/countCourses`
    );
    return response.data;
  };

  // Lấy totalPages để phân trang
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== "") {
        getAllCourse(searchValueDebounce).then((result) => {
          setTotalPages(result.totalPages);
        });
      } else {
        countAllCourses().then((result) => {
          setTotalPages(result);
        });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValueDebounce, searchQuery]);

  const handleSearch = () => {
    setSearch((prev) => !prev);
  };
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      getAllCourse(searchValueDebounce).then((result) => {
        setCourses(result.data);
        setLoading(false);
      });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValueDebounce, search, page]);

  useEffect(() => {
    if (!loading) {
      searchRef.current.focus();
    }
  }, [loading]);

  if (loading) {
    return <Loading width={"50px"} height={"50px"} />;
  }

  const handleAddToCart = ({ id, name, price, image }) => {
    if (user) {
      dispatch(
        addProductToCart({
          id,
          name,
          price,
          image,
        })
      );
      toast.success("Course be added to cart successfully");
    } else {
      navigate("/login");
    }
  };

  const handleLoadOtherPage = (newPage) => {
    setPage(newPage);
  };

  const handleBuyCourse = ({ id, name, price, image }) => {
    if (user) {
      dispatch(
        addProductToCart({
          id,
          name,
          price,
          image,
        })
      );
      navigate("/cart");
    } else {
      navigate("/login");
    }
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

  return (
    <CourseStyle className="max-w-[1320px] mx-auto pb-[128px]">
      <div className="course-heading-container mb-[80px] mt-[80px] flex justify-between items-center">
        <div>
          <h2 className="course-heading-title text-[46px] text-[var(--primary-color)]">
            Danh sách các khóa học
          </h2>
        </div>
        <div className="course-search-box flex gap-[12px] w-[40%]">
          <input
            type="text"
            name="course"
            id="course"
            placeholder="Nhập khóa học muốn tìm kiếm"
            className="h-[50px] flex-grow rounded-3xl px-5"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            ref={searchRef}
          />
          <button
            className="rounded-2xl bg-[var(--primary-color)] text-white px-[15px] py-[5px]"
            onClick={handleSearch}
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      {courses.length === 0 && <CourseNotFound />}
      <div className="course-body-container grid grid-cols-3 gap-[40px]">
        {courses.length > 0 &&
          courses.map((course, index) => {
            return (
              <div key={index} className="flex flex-col">
                <div className="w-full h-[250px] ">
                  <img
                    className="w-full h-full rounded-lg"
                    src={course.image}
                    alt=""
                  />
                </div>
                <div className="mt-[12px] flex flex-col flex-1">
                  <NavLink
                    to={`/courses/${course.id}`}
                    className="text-2xl font-semibold"
                  >
                    {course.name}
                  </NavLink>
                  <div className="mt-[12px] mt-auto">
                    <div className="flex items-center">
                      <span className="text-yellow-900 mr-2 text-xl items-center">
                        {course.rating}
                      </span>
                      <Rating
                        value={course.rating}
                        // initialRating={Math.ceil(course.rating)}
                        // emptySymbol={
                        //   <FontAwesomeIcon
                        //     icon={regularStar}
                        //     className="text-yellow-600"
                        //   />
                        // }
                        // fullSymbol={
                        //   <FontAwesomeIcon
                        //     icon={faStar}
                        //     className="text-yellow-600"
                        //   />
                        // }
                        readonly
                      />
                    </div>
                    <p className="course-item-price mt-[8px] text-3xl text-[var(--primary-color)]">
                      {formatCurrency(course.price)}
                    </p>
                  </div>
                  <div className="flex gap-5 mt-5">
                    <Button
                      primary={true}
                      onClick={() =>
                        handleAddToCart({
                          id: course.id,
                          name: course.name,
                          price: course.price,
                          image: course.image,
                        })
                      }
                    >
                      Add to Cart
                    </Button>
                    <Button
                      deleteBtn={true}
                      onClick={() =>
                        handleBuyCourse({
                          id: course.id,
                          name: course.name,
                          price: course.price,
                          image: course.image,
                        })
                      }
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <Pagination
        onClickOtherPage={handleLoadOtherPage}
        totalPages={totalPages}
        page={page}
      />
    </CourseStyle>
  );
};

export default Course;
