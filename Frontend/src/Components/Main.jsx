import { useEffect, useState } from "react";
import "../Styles/Main.css";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";
import { IoMdAdd } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdDelete, MdLogout, MdEdit } from "react-icons/md";
import Update from "./Update";

export default function Main() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [show, setShow] = useState({});
  const [searchTrue, setSearchTrue] = useState(false);
  const [update, setUpdate] = useState({});

  function getData() {
    const token = sessionStorage.getItem("token");
    fetch("https://note-app-exmz.onrender.com/notes/", {
      method: "GET",
      headers: { authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!search || !data) {
      setSearchTrue(false);
      setSearchData([]);
      return;
    } else {
      if (
        search.includes("[") ||
        search.includes("*") ||
        search.includes("(") ||
        search.includes(")") ||
        search.match(/\\$/)
      ) {
        alert("Please dont input invalud charecters");
        return;
      }
      const regex = new RegExp("^" + search.toLowerCase());
      const filterdata = data.filter((i) => {
        return regex.test(i.title.toLowerCase());
      });
      setSearchTrue(true);
      setSearchData(filterdata);
    }
  }, [search, data]);

  function remove(id) {
    const token = sessionStorage.getItem("token");
    fetch(`https://note-app-exmz.onrender.com/notes/${id}`, {
      method: "DELETE",
      headers: { authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        setShow({});
        getData();
        alert(data.message);
      });
  }

  function removeall() {
    const token = sessionStorage.getItem("token");
    fetch(`https://note-app-exmz.onrender.com/notes/`, {
      method: "DELETE",
      headers: { authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        setShow({});
        getData();
        alert(data.message);
      });
  }

  useEffect(() => {
    setShow({});
    if (Object.keys(update).length === 0) getData();
  }, [update]);

  return (
    <>
      {sessionStorage.getItem("token") ? (
        <div className="main">
          <nav className="nav">
            <div className="main-nav">
              <span className="icon-body" onClick={() => navigate("/create")}>
                <IoMdAdd className="icon" />
                Add-Note
              </span>

              <span className="icon-body" onClick={removeall}>
                <MdDelete className="icon" />
                Delete-All
              </span>
            </div>
            <span
              className="icon-body"
              onClick={() => {
                sessionStorage.setItem("token", "");
                navigate("/");
              }}
            >
              <MdLogout className="icon" />
              Logout
            </span>
          </nav>
          {Object.keys(update).length !== 0 ? (
            <Update update={update} setUpdate={setUpdate} />
          ) : (
            <main className="main-body">
              <input
                placeholder="Search title here..."
                className="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="content-box">
                {(searchTrue ? searchData : data).map((data, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => setShow(data)}
                      className="content"
                    >
                      <span className="time">
                        {formatRelative(new Date(data.createdAt), new Date())}
                      </span>
                      <span className="content-head">{data.title}</span>
                      <p className="content-para">{data.description}</p>
                    </div>
                  );
                })}
              </div>
              {Object.keys(show).length !== 0 ? (
                <div className="fixed">
                  <div className="content-show-div">
                    <div className="content no-hover absolute">
                      <span
                        className="icon-body content-close"
                        onClick={() => setShow({})}
                      >
                        <IoClose className="icon black" />
                        Close
                      </span>
                      <span className="time">
                        {formatRelative(new Date(show.createdAt), new Date())}
                      </span>
                      <span className="content-head">{show.title}</span>
                      <p className="content-para-show">{show.description}</p>
                      <span className="content-show-btns">
                        <button
                          className="error-btn remove-btn icon-body"
                          onClick={() => remove(show._id)}
                        >
                          <MdDelete className="icon black" />
                          Remove
                        </button>
                        <button
                          className="error-btn icon-body"
                          onClick={() => setUpdate(show)}
                        >
                          <MdEdit className="icon black" />
                          Update
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ) : null}
            </main>
          )}
        </div>
      ) : (
        <div className="error">
          <span className="error-head">SESSION EXPIRED</span>
          <span className="error-body">Please login again</span>
          <button className="error-btn" onClick={() => navigate("/")}>
            Go to login
          </button>
        </div>
      )}
    </>
  );
}
