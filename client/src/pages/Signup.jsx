import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setSignupDetails({
      ...signupDetails,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/signup`,
      signupDetails
    );
    console.log(res.data);
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