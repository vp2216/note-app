import "../Styles/Create.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdEdit, MdLogout } from "react-icons/md";

export default function Update({ update, setUpdate }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(update.title);
  const [description, setDesription] = useState(update.description);

  function add(e) {
    e.preventDefault();
    if (!title || !description) {
      alert("Fill all fields");
      return;
    }
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    fetch(`https://note-app-exmz.onrender.com/notes/${update._id}`, {
      method: "PUT",
      body: formData,
      headers: { authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
          alert(data.message);
          setUpdate({});
          return;
      });
  }

  return (
    <>
      {sessionStorage.getItem("token") ? (
        <div className="update-main">
          <main className="create-body">
            <form>
              <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                value={title}
                className="create-input"
              />
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDesription(e.target.value)}
                placeholder="Write your note here..."
                className="create-input create-textarea"
              ></textarea>
              <button className="create-btn icon-body" onClick={add}>
                <MdEdit className="icon black" />
                Update
              </button>
            </form>
          </main>
        </div>
      ) : (
        <div className="error">
          <span className="error-head">SESSION EXPIRED</span>
          <span className="error-body">Please login again</span>
          <button className="error-btn" onClick={() => navigate("/")}>
            <MdLogout className="icon" />
            Go to login
          </button>
        </div>
      )}
    </>
  );
}
