import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
    const { currentUser, logout } = useAuth();

    return (
        <div className="Account">
            <MDBContainer className="py-5 opacity-75">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem>
                                <a href="/">Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>
                                Profile
                            </MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src={`https://robohash.org/${currentUser.uid}`}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: "150px" }}
                                    fluid
                                />
                                <div className="d-flex justify-content">
                                    <MDBCardText className="text-muted">
                                        Hugh
                                    </MDBCardText>
                                    <MDBCardText className="text-muted">
                                        AU
                                    </MDBCardText>
                                    <img
                                        src={`https://flagsapi.com/AU/flat/64.png`}
                                        alt="flag"
                                        height="32px"
                                    />
                                </div>

                                <div className="d-flex justify-content-center mb-2">
                                    {/* <MDBBtn outline className="ms-1">
                                        Follow
                                    </MDBBtn> */}
                                    <MDBBtn onClick={logout}>Logout</MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-4 mb-lg-0">
                            <MDBCardBody className="p-0">
                                <MDBListGroup flush className="rounded-3">
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fas
                                            icon="globe fa-lg text-warning"
                                        />
                                        <MDBCardText>
                                            https://mdbootstrap.com
                                        </MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fab
                                            icon="github fa-lg"
                                            style={{ color: "#333333" }}
                                        />
                                        <MDBCardText>mdbootstrap</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fab
                                            icon="twitter fa-lg"
                                            style={{ color: "#55acee" }}
                                        />
                                        <MDBCardText>@mdbootstrap</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fab
                                            icon="instagram fa-lg"
                                            style={{ color: "#ac2bac" }}
                                        />
                                        <MDBCardText>mdbootstrap</MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon
                                            fab
                                            icon="facebook fa-lg"
                                            style={{ color: "#3b5998" }}
                                        />
                                        <MDBCardText>mdbootstrap</MDBCardText>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            Johnatan Smith
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            example@example.com
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            (097) 234-5678
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Mobile</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            (098) 765-4321
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            Bay Area, San Francisco, CA
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4">
                                            <span className="text-primary font-italic me-1">
                                                assigment
                                            </span>{" "}
                                            Project Status
                                        </MDBCardText>
                                        <MDBCardText
                                            className="mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            Web Design
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={80}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            Website Markup
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={72}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            One Page
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={89}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            Mobile Template
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={55}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            Backend API
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={66}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                            <MDBCol md="6">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <MDBCardText className="mb-4">
                                            <span className="text-primary font-italic me-1">
                                                assigment
                                            </span>{" "}
                                            Project Status
                                        </MDBCardText>
                                        <MDBCardText
                                            className="mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            Web Design
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={80}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            Website Markup
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={72}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            One Page
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={89}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            Mobile Template
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={55}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>

                                        <MDBCardText
                                            className="mt-4 mb-1"
                                            style={{ fontSize: ".77rem" }}
                                        >
                                            Backend API
                                        </MDBCardText>
                                        <MDBProgress className="rounded">
                                            <MDBProgressBar
                                                width={66}
                                                valuemin={0}
                                                valuemax={100}
                                            />
                                        </MDBProgress>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
