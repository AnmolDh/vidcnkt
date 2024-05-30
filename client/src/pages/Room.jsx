import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider"
import ReactPlayer from "react-player";

export default function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`email ${email} joined`);
    setRemoteSocketId(id);
  }, [])

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    setMyStream(stream);
  }, [])

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => socket.off("user:joined", handleUserJoined);
  }, [socket, handleUserJoined])

  return <>
    Room Page
    <h4>{remoteSocketId ? "connected" : "not connected"}</h4>
    {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
    <>
      <h3>My Stream</h3>
      {myStream && <ReactPlayer playing muted url={ myStream } />}
    </>
  </>
}