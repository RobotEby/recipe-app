import { AuthProvider /* useAuth */ } from "./contexts/AuthContext";
import { Routes, BrowserRouter, Route /* Navigate */ } from "react-router-dom";
import Login from "./pages/Login";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
