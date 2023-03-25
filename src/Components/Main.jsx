import { useEffect, useState } from "react";
import "../Styles/Main.css";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";

export default function Main() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [show,setShow] = useState({})

 function getData(){
    const token = sessionStorage.getItem("token");
    fetch("https://note-app-exmz.onrender.com/notes/", {
      method: "GET",
      headers: { authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  };

  useEffect(() => {
    getData();
  },[])
  
  useEffect(() => {
    if (!search || !data) {
      setSearchData([]);
      return;
    }
    else {
      const regex = new RegExp("^" + search)
      const filterdata = data.filter((i) => {
        return regex.test(i.title);
      });
      setSearchData(filterdata);
    }
  }, [search, data]);

  function getShow(data) {
    setShow(data)
  }

  return (
    <>
      {sessionStorage.getItem("token") ? (
        <div className="main">
          <nav className="nav">
            <div className="main-nav">
              <span onClick={() => navigate("/main")}>Home</span>
              <span onClick={() => navigate("/create")}>Add-Note</span>
              <span>Delete-All</span>
            </div>
            <span
              onClick={() => {
                sessionStorage.setItem("token", "");
                navigate("/");
              }}
            >
              Logout
            </span>
          </nav>
          <main className="main-body">
            <input
              placeholder="Search title here..."
              className="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="content-box">
              {(searchData.length != 0 ? searchData : data).map((data, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => getShow(data)}
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
            {Object.keys(show).length != 0 ? (
              <div className="fixed">
                <div className="content-show-div">
                  <div className="content absolute">
                    <span className="content-close" onClick={()=>setShow({})}>X Close</span>
                    <span className="time">
                      {formatRelative(new Date(show.createdAt), new Date())}
                    </span>
                    <span className="content-head">{show.title}</span>
                    <p className="content-para-show">{show.description}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </main>
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
