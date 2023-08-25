import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Game from "./pages/Game";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/game"
                    element={
                        <PrivateRoute>
                            <Game />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/leaderboard"
                    element={
                        <PrivateRoute>
                            <Leaderboard />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
