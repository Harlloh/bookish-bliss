import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";
import ProtectedRouteM from "./components/protectedROutes";

const App = () => {
  const { fetchUser, hasHydrated, user } = useAuthStore();

  useEffect(() => {
    if (hasHydrated && user) {
      fetchUser();
    }
  }, []);

  if (!hasHydrated) {
    return null; // or loading screen
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={
          <ProtectedRouteM>
            <Books />
          </ProtectedRouteM>
        } />
        <Route path="/books/:id" element={<ProtectedRouteM>
          <BookDetail />
        </ProtectedRouteM>} />
        <Route
          path="/books/add"
          element={
            <ProtectedRouteM>
              <AddBook />
            </ProtectedRouteM>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteM>
              <Profile />
            </ProtectedRouteM>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
