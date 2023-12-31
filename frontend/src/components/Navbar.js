import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
    const navigate = useNavigate();

    return (
        <nav className="rounded-3 navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarExample01"
                    aria-controls="navbarExample01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarExample01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    props.active === "home"
                                        ? "text-primary"
                                        : ""
                                }`}
                                onClick={() => navigate("/")}
                            >
                                Home
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    props.active === "game"
                                        ? "text-primary"
                                        : ""
                                }`}
                                onClick={() => navigate("/game")}
                            >
                                Game
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    props.active === "leaderboard"
                                        ? "text-primary"
                                        : ""
                                }`}
                                onClick={() => navigate("/leaderboard")}
                            >
                                Leaderboard
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    props.active === "profile"
                                        ? "text-primary"
                                        : ""
                                }`}
                                onClick={() => navigate("/profile")}
                            >
                                Profile
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
