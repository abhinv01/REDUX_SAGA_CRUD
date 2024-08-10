import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import AddUpdateUser from "./pages/AddUpdateUser";
import UserInfo from "./pages/UserInfo";
import Header from "./component/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<AddUpdateUser />} />
          <Route path="editUser/:id" element={<AddUpdateUser />} />
          <Route path="userInfo/:id" element={<UserInfo />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>Page not found </h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
