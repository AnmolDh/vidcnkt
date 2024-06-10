import { useState } from "react"
import axios from "../api/api";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })

  const handleInput = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.id]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await axios.post(`/login`, loginDetails);
    if (data.success == true) {
      localStorage.setItem("token", data.token);
    } else {
      console.log(data);
    }
  }

  return <>
    <form>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" onChange={handleInput}></input>

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" onChange={handleInput}></input>

      <button type="submit" onClick={handleSubmit}>login</button>
    </form>
  </>
}