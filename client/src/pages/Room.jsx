import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import useCallHandler from "../hooks/useCallHandlers";
import useSocketEvent from "../hooks/useSocketEvents";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handlers = useCallHandler(socket, remoteSocketId, setRemoteSocketId, myStream, setMyStream);

  useSocketEvent(socket, remoteSocketId,  handlers, peer, setRemoteStream)

  return (
    <>
      Room Page
      <h4>{remoteSocketId ? "connected" : "not connected"}</h4>
      {myStream && (
        <>
          <h3>My Stream</h3>
          <ReactPlayer playing muted url={myStream} />
        </>
      )}
      {remoteStream && (
        <>
          <h3>Remote Stream</h3>
          <ReactPlayer playing muted url={remoteStream} />
        </>
      )}
    </>
  );
}
