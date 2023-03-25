import "../Styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Create from "./Create";
import Nopage from "./Nopage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="/create" element={<Create />} />
        <Route path="/*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
