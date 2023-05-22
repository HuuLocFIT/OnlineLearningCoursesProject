import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSame, setIsSame] = useState(true)
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get("token");
    setToken(tokenParam);
  }, []);

  const handleResetPassword = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/users/reset-password",
      {
        token: token,
        newPassword: confirmPassword,
      }
    );

    return response.data.message;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      setIsSame(false)
    } else {
      setIsSame(true)
      handleResetPassword().then((message) => {
        toast.success(message)
        navigate("/login");
      });
  
      // Xóa giá trị trong form
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-3">
      <div>
        <label htmlFor="password" className="block font-medium">Mật khẩu mới:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-[200px]"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block font-medium">Xác nhận mật khẩu:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="w-[200px]"
        />
      </div>
      <p className={`text-red-600 ${isSame ? 'hidden' : 'block'}`}>Password must be the same</p>
      <button type="submit" className="bg-purple-400 text-white py-3 px-5 ml-auto rounded-md mt-4 w-[200px]">Đặt lại mật khẩu</button>
    </form>
  );
};

export default ResetPasswordForm;
