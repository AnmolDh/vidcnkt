import { Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
