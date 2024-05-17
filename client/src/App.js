import { Routes, Route } from "react-router-dom";
import Lobby from "./pages/Lobby";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lobby/>}/>
    </Routes>
  );
}

export default App;
