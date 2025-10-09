import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function BoardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/board"
          element={isAuthenticated ? <BoardPage /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/board" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default BoardPage;
