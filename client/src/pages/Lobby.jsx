import { useState, useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Lobby() {
  const [userDetail, SetUserDetail] = useState({
    email: "",
    room: "",
  });

  const socket = useSocket();


  const handleUserDetail = (e) => {
    SetUserDetail({
      ...userDetail,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", userDetail);
    },
    [socket, userDetail]
  );

  useEffect(() => {
    socket.on("room:join", data => {
      console.log(`data from server: ${data}`);
    });
  }, [socket])

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

