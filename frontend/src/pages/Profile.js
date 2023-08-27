import React, { useState, useEffect } from "react";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
} from "mdb-react-ui-kit";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    bronzeImage,
    silverImage,
    copperImage,
    diamondImage,
    masterImage,
    grandmasterImage,
} from "../images/images";
import { streamUser } from "../contexts/Database";
import Navbar from "../components/Navbar";

const getRankImage = (rating) => {
    if (rating < 1000) {
        return bronzeImage;
    } else if (rating < 2000) {
        return silverImage;
    } else if (rating < 3000) {
        return copperImage;
    } else if (rating < 4000) {
        return diamondImage;
    } else if (rating < 4500) {
        return masterImage;
    } else {
        return grandmasterImage;
    }
};

export default function Profile() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch {
            console.log("Failed to log out");
        }
    }

    const [user, setUser] = useState([]);
    useEffect(() => {
        const unsubscribe = streamUser(
            currentUser.uid,
            (docSnapshot) => {
                const data = docSnapshot.data();
                setUser(data);
                console.log("Updated profile");
            },
            (error) => console.log(error)
        );
        return unsubscribe;
    }, [currentUser.uid]);

    return (
        <div className="Account">
            <MDBContainer className="py-5 opacity-75">
                <Navbar active="profile" />

                <MDBRow className="py-4">
                    <MDBCol lg="4">
                        <MDBCard>
                            <MDBCardBody className="text-center mb-4">
                                <MDBRow>
                                    <MDBCol className="mt-5">
                                        <MDBCardImage
                                            src={`https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff&size=128}`}
                                            alt="avatar"
                                            className="rounded-circle border border-2 border-dark"
                                            style={{ width: "150px" }}
                                            fluid
                                        />
                                    </MDBCol>
                                    <MDBCol className="mt-5">
                                        <MDBCardImage
                                            src={getRankImage(user.rating)}
                                            alt="rank"
                                            style={{ width: "150px" }}
                                            fluid
                                        />
                                        <MDBCardText>
                                            <strong>{user.rating}</strong>
                                            <small> RR</small>
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Username</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {user.username}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Height</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            {user.height}
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Nationality</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <img
                                            src={`https://flagsapi.com/${user.nationality}/flat/64.png`}
                                            alt="flag"
                                            height="32px"
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="12" offsetMd={0}>
                                <MDBCard className="mb-4 mb-md-0 rounded-3">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
