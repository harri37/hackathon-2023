import React, { useState, useEffect } from "react";
import { rankUpImage, rankDownImage, stayImage } from "../images/images";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { streamUsers } from "../contexts/Database";

// const q = query(collection(db, "users"), orderBy("rating", "desc"));

function Leaderboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch {
            console.log("Failed to log out");
        }
    }

    const { currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const unsubscribe = streamUsers(
            (querySnapshot) => {
                const data = querySnapshot.docs.map((docSnapshot) =>
                    docSnapshot.data()
                );
                setUsers(data);
            },
            (error) => console.log(error)
        );
        return unsubscribe;
    }, [users, setUsers]);

    return (
        <div style={{ padding: "10px 40px" }}>
            <h1>Leaderboard</h1>

            <table className="leaderboardTable">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: "10%" }}>
                            Rank
                        </th>
                        <th scope="col" style={{ width: "45%" }}>
                            Name
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                            Height
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                            Nationality
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                            Skill Rating
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((data, index) => (
                        <tr key={index}>
                            <td>
                                <img
                                    style={{
                                        marginRight: "8px",
                                    }}
                                    src={
                                        data.yesterdayIndex > index
                                            ? rankUpImage
                                            : data.yesterdayIndex < index
                                            ? rankDownImage
                                            : stayImage
                                    }
                                    alt="rank change"
                                    height="20px"
                                />
                                {index + 1}
                            </td>
                            <td>{data.username}</td>
                            <td>{data.height}</td>
                            <td>
                                <img
                                    height={32}
                                    src={`https://flagsapi.com/${data.nationality}/flat/64.png`}
                                    alt="flag"
                                />
                            </td>
                            <td>{data.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>
                Logged in as: <strong>{currentUser.uid}</strong>
            </p>
            <Button
                variant="primary"
                onClick={handleLogout}
                style={{ margin: "10px" }}
            >
                Log Out
            </Button>
        </div>
    );
}

export default Leaderboard;
