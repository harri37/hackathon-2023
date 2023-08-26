import React, { useState, useEffect } from "react";
import { rankUpImage, rankDownImage, stayImage } from "../images/images";
import { streamUsers } from "../contexts/Database";
import { MDBContainer, MDBRow, MDBCard } from "mdb-react-ui-kit";
import Navbar from "../components/Navbar";

const pageLimit = 100;

function Leaderboard() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const unsubscribe = streamUsers(
            (querySnapshot) => {
                const data = querySnapshot.docs.map((docSnapshot) =>
                    docSnapshot.data()
                );
                setUsers(data);
                console.log("Updated leaderboard");
            },
            (error) => console.log(error)
        );
        return unsubscribe;
        // setUsers(testUsers);
    }, []);

    return (
        <div className="Leaderboard">
            <MDBContainer className="py-5 opacity-75">
                <Navbar />
                <MDBRow className="px-5 py-4">
                    <MDBCard className="pt-4 p-5">
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
                                    <tr key={index} className="font-monospace">
                                        <td>
                                            <img
                                                style={{
                                                    marginRight: "8px",
                                                }}
                                                src={
                                                    data.yesterdayIndex > index
                                                        ? rankUpImage
                                                        : data.yesterdayIndex <
                                                          index
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
                    </MDBCard>
                </MDBRow>
                <nav
                    aria-label="Page navigation example"
                    className="d-flex justify-content-center"
                >
                    <ul class="pagination">
                        <li class="page-item">
                            <button class="page-link">Previous</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link">1</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link">2</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link">3</button>
                        </li>
                        <li class="page-item">
                            <button class="page-link">Next</button>
                        </li>
                    </ul>
                </nav>
            </MDBContainer>
        </div>
    );
}

const testUsers = [
    {
        username: "test1",
        height: "5'10\"",
        nationality: "US",
        rating: 4372,
    },
    {
        username: "test2",
        height: "6'2\"",
        nationality: "NZ",
        rating: 3250,
    },
    {
        username: "test3",
        height: "5'4\"",
        nationality: "CN",
        rating: 3173,
    },
];

export default Leaderboard;
