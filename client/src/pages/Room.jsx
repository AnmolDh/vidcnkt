import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider"
import ReactPlayer from "react-player";
import peer from "../service/peer";

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
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket])


  const handleIncommingCall = useCallback(({ from, offer }) => {
    console.log("incoming call", from, offer);
  }, [])

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
    }
  }, [socket, handleUserJoined, handleIncommingCall])

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