import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  function submit(e) {
    e.preventDefault();
    if (!mail.includes("@")) {
      alert("Input a valid mail");
      return
    }
    if (!mail || !password) {
      alert("All fields should be enterd");
      return;
    }
    if (password.length < 8) {
      alert("Password shold be more than 7 charecters long");
      return;
    }
    if (!check) {
      alert("Agree to the terms and conditions to continue");
      return;
    }
    const formData = new FormData();
    formData.append("email", mail);
    formData.append("password", password);
    fetch("https://note-app-exmz.onrender.com/user/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          navigate("/");
        } else {
          alert(data.message);
        }
      });
  }
  return (
    <div className="login-main">
      <form className="login-form-div">
        <span className="login-header">REGISTER</span>
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
        <span className="checkbox-span">
          <input
            id="checkbox"
            onChange={(e) => setCheck(e.target.checked)}
            type="checkbox"
          />
          <label htmlFor="checkbox" className="lable">
            I agree to the{" "}
            <a className="link" href="/register">
              terms and conditions
            </a>
          </label>
        </span>
        <button className="login-btn" onClick={submit}>
          Submit
        </button>
      </form>
      <span className="login-message">
        Aready have an account{" "}
        <span onClick={() => navigate("/")} className="change">
          Login Here
        </span>
      </span>
    </div>
  );
}
