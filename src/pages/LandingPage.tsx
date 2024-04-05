import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaBook,
  FaBookReader,
  FaStar,
} from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

import "../assets/LandingPage.css";
import Home from "./Home";
import Users from "./Users";
import Books from "./Books";
import BookLoan from "./BookLoan";
import Reviews from "./Reviews";

const LandingPage = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  return (
    <main className={show ? "space-toggle" : ""}>
      <header className={`header ${show ? "space-toggle" : ""}`}>
        <div className="header-toggle" onClick={() => setShow(!show)}>
          {show ? <FaTimes /> : <FaBars />}
        </div>
      </header>

      <aside className={`sidebar ${show ? "show" : ""}`}>
        <nav className="nav">
          <div>
            <Link to="/" className="nav-logo">
              <FaHome className="nav-logo-icon" />
              <span className="nav-logo-name">Home</span>
            </Link>

            <div className="nav-list">
              <Link
                to="/users"
                className={`nav-link ${
                  location.pathname === "/users" ? "active" : ""
                }`}
              >
                <FaUsers className="nav-link-icon" />
                <span className="nav-link-name">Users</span>
              </Link>
              <Link
                to="/books"
                className={`nav-link ${
                  location.pathname === "/books" ? "active" : ""
                }`}
              >
                <FaBook className="nav-link-icon" />
                <span className="nav-link-name">Books</span>
              </Link>
              <Link
                to="/bookLoan"
                className={`nav-link ${
                  location.pathname === "/bookLoan" ? "active" : ""
                }`}
              >
                <FaBookReader className="nav-link-icon" />
                <span className="nav-link-name">Book Loans</span>
              </Link>
              <Link
                to="/reviews"
                className={`nav-link ${
                  location.pathname === "/reviews" ? "active" : ""
                }`}
              >
                <FaStar className="nav-link-icon" />
                <span className="nav-link-name">Reviews</span>
              </Link>
            </div>
          </div>

          <Link to="/" className="nav-link">
            <FaArrowRightFromBracket />
            <span className="nav-link-name">Logout</span>
          </Link>
        </nav>
      </aside>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/books" element={<Books />} />
        <Route path="/bookLoan" element={<BookLoan />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </main>
  );
};

export default LandingPage;
