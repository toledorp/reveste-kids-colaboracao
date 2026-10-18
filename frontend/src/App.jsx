import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Footer from "./components/Footer";


import FeedTikTok from "./pages/FeedTikTok";
import MyCloset from "./pages/MyCloset";
import AddClothing from "./pages/AddClothing";
import Matches from "./pages/Matches";
import SearchClosets from "./pages/SearchClosets";
import Login from "./pages/Login";
import Register from "./pages/Register";

function LoginPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/feed" replace />;
  }

  return <Login onAuthSuccess={() => navigate("/feed")} />;
}

function AppContent() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const location = useLocation();

  const pagesWithoutGlobalLayout = [
    "/",
    "/register",
    "/feed",
    "/feed-tiktok",
    "/closet",
    "/add-clothing",
    "/matches",
    "/search-closets",
  ];

  const hideGlobalLayout = pagesWithoutGlobalLayout.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/feed"
          element={
            <FeedTikTok
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />

        <Route
          path="/feed-tiktok"
          element={
            <FeedTikTok
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />

        <Route path="/closet" element={<MyCloset />} />

        <Route path="/add-clothing" element={<AddClothing />} />

        <Route path="/matches" element={<Matches />} />

        <Route path="/search-closets" element={<SearchClosets />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>


      {!hideGlobalLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;