import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { useAuth } from "../context/AuthProvider";

export default function Lobby() {
  const [userDetail, setUserDetail] = useState({
    email: "",
    room: "",
  });

  const socket = useSocket();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    setUserDetail(prev => ({
      ...prev,
      email: user ? user : ""
    }))
  }, [user]);

  const handleUserDetail = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", userDetail);
      console.log(userDetail)
    },
    [socket, userDetail]
  );

  const handleJoinRoom = useCallback((data) => {
    const { room } = data;
    navigate(`/room/${room}`);
  }, [navigate])

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => socket.off("room:join", handleJoinRoom);
  }, [socket, handleJoinRoom])

  return (
    <>
      <h1>Lobby</h1>
      <br />
      <form onSubmit={handleSubmit}>
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

