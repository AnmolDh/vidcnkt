import { useCallback } from "react";
import peer from "../service/peer";

export default function useCallHandler(socket, remoteSocketId, setRemoteSocketId, myStream, setMyStream) {
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`email ${email} joined`);
    setRemoteSocketId(id);
  }, [setRemoteSocketId]);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket, setMyStream]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      console.log("incoming call", from);
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket, setRemoteSocketId, setMyStream]
  );

  const sendStream = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("call accepted");
      sendStream();
    },
    [sendStream]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [socket, remoteSocketId]);

  const handleNegoIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  return {
    handleUserJoined,
    handleCallUser,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeeded,
    handleNegoIncoming,
    handleNegoFinal
  }
}