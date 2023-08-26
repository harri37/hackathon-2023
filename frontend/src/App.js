import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Game from "./pages/Game";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./pages/Signup";

import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/login" element={<Signup />} />
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
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
