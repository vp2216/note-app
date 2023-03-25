import "../Styles/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  function submit(e) {
    e.preventDefault();
    if (!mail.includes("@")) {
      alert("Input a valid mail");
      return;
    }
    if (!mail || !password) {
      alert("All fields should be enterd");
      return;
    }
    const formData = new FormData();
    formData.append("email", mail);
    formData.append("password", password);
    fetch("https://note-app-exmz.onrender.com/user/login", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          sessionStorage.setItem("token", data.token);
          navigate("/main");
        } else {
          alert(data.message);
        }
      });
  }
  return (
    <div className="login-main">
      <form className="login-form-div">
        <span className="login-header">LOGIN</span>
        <input
          placeholder="Email"
          onChange={(e) => setMail(e.target.value)}
          className="login-input"
          type="email"
          value={mail}
        />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          type="password"
          value={password}
        />
        <button className="login-btn" onClick={submit}>
          Submit
        </button>
      </form>
      <span className="login-message">
        Dont have an account{" "}
        <span onClick={()=>navigate("/register")} className="change">
          Register Here
        </span>
      </span>
    </div>
  );
}
