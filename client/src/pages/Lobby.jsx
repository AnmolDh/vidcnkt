import { useState, useCallback } from "react";

export default function Lobby() {
  const [userDetail, SetUserDetail] = useState({
    email: "",
    room: "",
  });

  const handleUserDetail = (e) => {
    SetUserDetail({
      ...userDetail,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(userDetail);
    },
    [userDetail]
  );

  return (
    <>
      <h1>Lobby</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          value={userDetail.email}
          onChange={handleUserDetail}
        ></input>
        <br />
        <br />
        <label htmlFor="room">Room ID</label>
        <input
          type="text"
          id="room"
          value={userDetail.room}
          onChange={handleUserDetail}
        ></input>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

