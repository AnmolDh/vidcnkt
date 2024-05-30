import { useCallback, useEffect } from "react";
import { useSocket } from "../context/SocketProvider"

export default function Room() {
  const socket = useSocket();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`email ${email} joined`);
  }, [])

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => socket.off("user:joined", handleUserJoined);
  }, [socket, handleUserJoined])

  return <>
    Room Page
  </>
}