import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider"
import ReactPlayer from "react-player";
import peer from "../service/peer";

export default function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

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


  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    console.log("incoming call", from);
    setRemoteSocketId(from);
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    const ans = await peer.getAnswer(offer);
    socket.emit("call:accepted", {to: from, ans})
  }, [socket])

  const handleCallAccepted = useCallback(({ from, ans }) => {
    peer.setLocalDescription(ans);
    console.log("call accepted");
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream])


  useEffect(() => {
    peer.peer.addEventListener("track", async ev => {
      const remoteStream = ev.streams;
      setRemoteStream(remoteStream);
    })
  })

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
    }
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted])

  return (
    <>
      Room Page
      <h4>{remoteSocketId ? "connected" : "not connected"}</h4>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
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