import { useState } from "react";
import axios from "../api/api";
import { useAuth } from "../context/AuthProvider";

export default function Signup() {
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const auth = useAuth();

  const handleInput = (e) => {
    setSignupDetails({
      ...signupDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await axios.post(
      `/signup`,
      signupDetails
    );
    if (data.success == true) {
      localStorage.setItem("token", data.token);
      auth.setUser(data.userId);
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="email" id="name" onChange={handleInput}></input>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={handleInput}></input>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={handleInput}></input>

        <button type="submit" onClick={handleSubmit}>
          signup
        </button>
      </form>
    </>
  );
}
