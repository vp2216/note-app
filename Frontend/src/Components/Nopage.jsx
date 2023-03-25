import { useNavigate } from "react-router-dom";

export default function Nopage() {
  const navigate = useNavigate();

  return (
    <div className="error">
      <span className="error-head">404 NOT FOUND</span>
      <span className="error-body">Page not found</span>
      <button className="error-btn" onClick={() => navigate("/main")}>
        Go to main
      </button>
    </div>
  );
}
