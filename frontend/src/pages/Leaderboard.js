import React, { useState, useEffect } from "react";
import { rankUpImage, rankDownImage, stayImage } from "../images/images";
import { streamUsers } from "../contexts/Database";
import { MDBContainer, MDBRow, MDBCard } from "mdb-react-ui-kit";
import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

function Leaderboard() {
    const [users, setUsers] = useState([]);
    const { currentUser } = useAuth();
    useEffect(() => {
        const unsubscribe = streamUsers(
            (querySnapshot) => {
                const data = querySnapshot.docs.map((docSnapshot) => {
                    const data = docSnapshot.data();
                    data.uid = docSnapshot.id;
                    return data;
                });
                setUsers(data);
                console.log("Updated leaderboard");
            },
            (error) => console.log(error)
        );
        return unsubscribe;
    }, []);

    return (
        <div className="Leaderboard">
            <MDBContainer className="py-5 opacity-75">
                <Navbar active="leaderboard" />
                <MDBRow className="px-5 py-4">
                    <MDBCard className="pt-4 p-5">
                        <h1>Leaderboard</h1>
                        <div style={{ maxHeight: "60vh", overflow: "auto" }}>
                            <table
                                className="leaderboardTable"
                                style={{
                                    overflow: "auto",
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            style={{ width: "10%" }}
                                        >
                                            Rank
                                        </th>
                                        <th
                                            scope="col"
                                            style={{ width: "45%" }}
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            style={{ width: "15%" }}
                                        >
                                            Height
                                        </th>
                                        <th
                                            scope="col"
                                            style={{ width: "15%" }}
                                        >
                                            Nationality
                                        </th>
                                        <th
                                            scope="col"
                                            style={{ width: "15%" }}
                                        >
                                            Skill Rating
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...users, ...testUsers].map(
                                        (data, index) => (
                                            <tr
                                                key={index}
                                                className={`font-monospace ${
                                                    data.uid === currentUser.uid
                                                        ? "text-primary"
                                                        : ""
                                                }`}
                                            >
                                                <td>
                                                    <img
                                                        style={{
                                                            marginRight: "8px",
                                                        }}
                                                        src={
                                                            index === 0
                                                                ? [
                                                                      stayImage,
                                                                      rankUpImage,
                                                                  ][
                                                                      Math.floor(
                                                                          Math.random() *
                                                                              2
                                                                      )
                                                                  ]
                                                                : index ===
                                                                  users.length -
                                                                      1
                                                                ? [
                                                                      stayImage,
                                                                      rankDownImage,
                                                                  ][
                                                                      Math.floor(
                                                                          Math.random() *
                                                                              2
                                                                      )
                                                                  ]
                                                                : [
                                                                      stayImage,
                                                                      rankUpImage,
                                                                      rankDownImage,
                                                                  ][
                                                                      Math.floor(
                                                                          Math.random() *
                                                                              3
                                                                      )
                                                                  ]
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
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </MDBCard>
                </MDBRow>
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
