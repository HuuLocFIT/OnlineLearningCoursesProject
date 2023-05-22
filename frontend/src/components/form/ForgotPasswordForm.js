import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu POST tới server
      const response = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Error occurred. Please try again later.");
    }
  };

  return (
    <div className="m-3">
      <h1 className="font-medium text-lg">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label className="block font-medium">Email:</label>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[200px]"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-400 text-white py-3 px-5 ml-auto rounded-md mt-4 w-[200px]"
        >
          Reset Password
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPasswordForm;
