import { rankUpImage, rankDownImage, stayImage } from "../images/images";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
                    {testData.map((data, index) => (
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
                            <td>{data.skillRating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

const testData = [
    {
        username: "Username",
        nationality: "AU",
        height: "6'3",
        skillRating: 4320,
        yesterdayIndex: 2,
    },
    {
        username: "Username2",
        nationality: "GR",
        height: "6'3",
        skillRating: 4317,
        yesterdayIndex: 1,
    },
    {
        username: "Username3",
        nationality: "SC",
        height: "6'2",
        skillRating: 4294,
        yesterdayIndex: 0,
    },
    {
        username: "Username4",
        nationality: "CA",
        height: "6'1",
        skillRating: 4246,
        yesterdayIndex: 3,
    },
];

export default Leaderboard;
