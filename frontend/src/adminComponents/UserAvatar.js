import {React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple, green, blue } from '@mui/material/colors';

const getUsernameInitials = (username) => {
  if (!username) return '';
  const initials = username.charAt(0).toUpperCase();
  return initials;
};

const getRandomColor = () => {
  const colors = [deepOrange[500], deepPurple[500], green[500], blue[500]]; // Các màu sắc bạn muốn sử dụng
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const UserAvatar = ({ username, width, height }) => {
  const randomColor = getRandomColor();
  const [firstRandomColor, setFirstRandomColor] = useState(randomColor)

  return (
    <Avatar sx={{ backgroundColor: firstRandomColor, width: width, height: height }}>{getUsernameInitials(username)}</Avatar>
  );
};

export default UserAvatar;
