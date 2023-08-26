import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { addUser } from "../contexts/Database";

function inchesToRating(inches) {
    return Math.round((inches ** 2 * Math.log2(inches)) / 10);
}

export default function Signup() {
    const usernameRef = useRef();
    const [feet, setFeet] = useState(0);
    const [inches, setInches] = useState(0);
    const [nationality, setNationality] = useState(countries[0].code);

    const { signup } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            if (inches >= 12 || inches < 0) {
                setError("Inches must be between 0 and 11");
                setLoading(false);
                return;
            }

            if (feet < 0) {
                setError("Feet must be greater than 0");
                setLoading(false);
                return;
            }

            const userCrendential = await signup();
            const uid = userCrendential.user.uid;

            await addUser(uid, {
                username: usernameRef.current.value,
                height: `${feet}'${inches}"`,
                nationality: nationality,
                rating: inchesToRating(feet * 12 + inches),
            });
            navigate("/");
        } catch (e) {
            setError(e.toString());
        }

        setLoading(false);
    }

    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    ref={usernameRef}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mt-3">
                                <Form.Label>Height</Form.Label>
                                <Row>
                                    <Col>
                                        <Form.Text>Feet</Form.Text>
                                        <Form.Control
                                            type="number"
                                            required
                                            onChange={(e) =>
                                                setFeet(Number(e.target.value))
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Text>Inches</Form.Text>
                                        <Form.Control
                                            type="number"
                                            required
                                            onChange={(e) =>
                                                setInches(
                                                    Number(e.target.value)
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Text>
                                Current Rating:
                                {inchesToRating(feet * 12 + inches)}
                            </Form.Text>
                            <Form.Group className="mt-3">
                                <Form.Label>Nationality</Form.Label>
                                <Form.Select
                                    onChange={(e) => {
                                        setNationality(e.target.value);
                                    }}
                                >
                                    {countries.map((country) => (
                                        <option
                                            key={country.code}
                                            value={country.code}
                                        >
                                            {country.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Button
                                    disabled={loading}
                                    className="w-100"
                                    type="submit"
                                >
                                    Sign Up
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

const countries = [
    { code: "AU", name: "Australia" },
    { code: "AD", name: "Andorra" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "AF", name: "Afghanistan" },
    { code: "AG", name: "Antigua and Barbuda" },
    { code: "AI", name: "Anguilla" },
    { code: "AL", name: "Albania" },
    { code: "AM", name: "Armenia" },
    { code: "AN", name: "Netherlands Antilles" },
    { code: "AO", name: "Angola" },
    { code: "AQ", name: "Antarctica" },
    { code: "AR", name: "Argentina" },
    { code: "AS", name: "American Samoa" },
    { code: "AT", name: "Austria" },
    { code: "AW", name: "Aruba" },
    { code: "AX", name: "Åland Islands" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "BA", name: "Bosnia and Herzegovina" },
    { code: "BB", name: "Barbados" },
    { code: "BD", name: "Bangladesh" },
    { code: "BE", name: "Belgium" },
    { code: "BF", name: "Burkina Faso" },
    { code: "BG", name: "Bulgaria" },
    { code: "BH", name: "Bahrain" },
    { code: "BI", name: "Burundi" },
    { code: "BJ", name: "Benin" },
    { code: "BL", name: "Saint Barthélemy" },
    { code: "BM", name: "Bermuda" },
    { code: "BN", name: "Brunei Darussalam" },
    { code: "BO", name: "Bolivia" },
    { code: "BQ", name: "Bonaire, Sint Eustatius and Saba" },
    { code: "BR", name: "Brazil" },
    { code: "BS", name: "Bahamas" },
    { code: "BT", name: "Bhutan" },
    { code: "BV", name: "Bouvet Island" },
    { code: "BW", name: "Botswana" },
    { code: "BY", name: "Belarus" },
    { code: "BZ", name: "Belize" },
    { code: "CA", name: "Canada" },
    { code: "CC", name: "Cocos (Keeling) Islands" },
    { code: "CD", name: "Congo, The Democratic Republic Of The" },
    { code: "CF", name: "Central African Republic" },
    { code: "CG", name: "Congo" },
    { code: "CH", name: "Switzerland" },
    { code: "CI", name: "Côte D'Ivoire" },
    { code: "CK", name: "Cook Islands" },
    { code: "CL", name: "Chile" },
    { code: "CM", name: "Cameroon" },
    { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" },
    { code: "CR", name: "Costa Rica" },
    { code: "CU", name: "Cuba" },
    { code: "CV", name: "Cape Verde" },
    { code: "CW", name: "Curaçao" },
    { code: "CX", name: "Christmas Island" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czech Republic" },
    { code: "DE", name: "Germany" },
    { code: "DJ", name: "Djibouti" },
    { code: "DK", name: "Denmark" },
    { code: "DM", name: "Dominica" },
    { code: "DO", name: "Dominican Republic" },
    { code: "DZ", name: "Algeria" },
    { code: "EC", name: "Ecuador" },
    { code: "EE", name: "Estonia" },
    { code: "EG", name: "Egypt" },
    { code: "EH", name: "Western Sahara" },
    { code: "ER", name: "Eritrea" },
    { code: "ES", name: "Spain" },
    { code: "ET", name: "Ethiopia" },
    { code: "FI", name: "Finland" },
    { code: "FJ", name: "Fiji" },
    { code: "FK", name: "Falkland Islands (Malvinas)" },
    { code: "FM", name: "Micronesia, Federated States Of" },
    { code: "FO", name: "Faroe Islands" },
    { code: "FR", name: "France" },
    { code: "GA", name: "Gabon" },
    { code: "GB", name: "United Kingdom" },
    { code: "GD", name: "Grenada" },
    { code: "GE", name: "Georgia" },
    { code: "GF", name: "French Guiana" },
    { code: "GG", name: "Guernsey" },
    { code: "GH", name: "Ghana" },
    { code: "GI", name: "Gibraltar" },
    { code: "GL", name: "Greenland" },
    { code: "GM", name: "Gambia" },
    { code: "GN", name: "Guinea" },
    { code: "GP", name: "Guadeloupe" },
    { code: "GQ", name: "Equatorial Guinea" },
    { code: "GR", name: "Greece" },
    { code: "GS", name: "South Georgia and the South Sandwich Islands" },
    { code: "GT", name: "Guatemala" },
    { code: "GU", name: "Guam" },
    { code: "GW", name: "Guinea-Bissau" },
    { code: "GY", name: "Guyana" },
    { code: "HK", name: "Hong Kong" },
    { code: "HM", name: "Heard and McDonald Islands" },
    { code: "HN", name: "Honduras" },
    { code: "HR", name: "Croatia" },
    { code: "HT", name: "Haiti" },
    { code: "HU", name: "Hungary" },
    { code: "ID", name: "Indonesia" },
    { code: "IE", name: "Ireland" },
    { code: "IL", name: "Israel" },
    { code: "IM", name: "Isle of Man" },
    { code: "IN", name: "India" },
    { code: "IO", name: "British Indian Ocean Territory" },
    { code: "IQ", name: "Iraq" },
    { code: "IR", name: "Iran, Islamic Republic Of" },
    { code: "IS", name: "Iceland" },
    { code: "IT", name: "Italy" },
    { code: "JE", name: "Jersey" },
    { code: "JM", name: "Jamaica" },
    { code: "JO", name: "Jordan" },
    { code: "JP", name: "Japan" },
    { code: "KE", name: "Kenya" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "KH", name: "Cambodia" },
    { code: "KI", name: "Kiribati" },
    { code: "KM", name: "Comoros" },
    { code: "KN", name: "Saint Kitts And Nevis" },
    { code: "KP", name: "Korea, Democratic People's Republic Of" },
    { code: "KR", name: "Korea, Republic of" },
    { code: "KW", name: "Kuwait" },
    { code: "KY", name: "Cayman Islands" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "LA", name: "Lao People's Democratic Republic" },
    { code: "LB", name: "Lebanon" },
    { code: "LC", name: "Saint Lucia" },
    { code: "LI", name: "Liechtenstein" },
    { code: "LK", name: "Sri Lanka" },
    { code: "LR", name: "Liberia" },
    { code: "LS", name: "Lesotho" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "LV", name: "Latvia" },
    { code: "LY", name: "Libya" },
    { code: "MA", name: "Morocco" },
    { code: "MC", name: "Monaco" },
    { code: "MD", name: "Moldova, Republic of" },
    { code: "ME", name: "Montenegro" },
    { code: "MF", name: "Saint Martin" },
    { code: "MG", name: "Madagascar" },
    { code: "MH", name: "Marshall Islands" },
    { code: "MK", name: "Macedonia, the Former Yugoslav Republic Of" },
    { code: "ML", name: "Mali" },
    { code: "MM", name: "Myanmar" },
    { code: "MN", name: "Mongolia" },
    { code: "MO", name: "Macao" },
    { code: "MP", name: "Northern Mariana Islands" },
    { code: "MQ", name: "Martinique" },
    { code: "MR", name: "Mauritania" },
    { code: "MS", name: "Montserrat" },
    { code: "MT", name: "Malta" },
    { code: "MU", name: "Mauritius" },
    { code: "MV", name: "Maldives" },
    { code: "MW", name: "Malawi" },
    { code: "MX", name: "Mexico" },
    { code: "MY", name: "Malaysia" },
    { code: "MZ", name: "Mozambique" },
    { code: "NA", name: "Namibia" },
    { code: "NC", name: "New Caledonia" },
    { code: "NE", name: "Niger" },
    { code: "NF", name: "Norfolk Island" },
    { code: "NG", name: "Nigeria" },
    { code: "NI", name: "Nicaragua" },
    { code: "NL", name: "Netherlands" },
    { code: "NO", name: "Norway" },
    { code: "NP", name: "Nepal" },
    { code: "NR", name: "Nauru" },
    { code: "NU", name: "Niue" },
    { code: "NZ", name: "New Zealand" },
    { code: "OM", name: "Oman" },
    { code: "PA", name: "Panama" },
    { code: "PE", name: "Peru" },
    { code: "PF", name: "French Polynesia" },
    { code: "PG", name: "Papua New Guinea" },
    { code: "PH", name: "Philippines" },
    { code: "PK", name: "Pakistan" },
    { code: "PL", name: "Poland" },
    { code: "PM", name: "Saint Pierre And Miquelon" },
    { code: "PN", name: "Pitcairn" },
    { code: "PR", name: "Puerto Rico" },
    { code: "PS", name: "Palestine, State of" },
    { code: "PT", name: "Portugal" },
    { code: "PW", name: "Palau" },
    { code: "PY", name: "Paraguay" },
    { code: "QA", name: "Qatar" },
    { code: "RE", name: "Réunion" },
    { code: "RO", name: "Romania" },
    { code: "RS", name: "Serbia" },
    { code: "RU", name: "Russian Federation" },
    { code: "RW", name: "Rwanda" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SB", name: "Solomon Islands" },
    { code: "SC", name: "Seychelles" },
    { code: "SD", name: "Sudan" },
    { code: "SE", name: "Sweden" },
    { code: "SG", name: "Singapore" },
    { code: "SH", name: "Saint Helena" },
    { code: "SI", name: "Slovenia" },
    { code: "SJ", name: "Svalbard And Jan Mayen" },
    { code: "SK", name: "Slovakia" },
    { code: "SL", name: "Sierra Leone" },
    { code: "SM", name: "San Marino" },
    { code: "SN", name: "Senegal" },
    { code: "SO", name: "Somalia" },
    { code: "SR", name: "Suriname" },
    { code: "SS", name: "South Sudan" },
    { code: "ST", name: "Sao Tome and Principe" },
    { code: "SV", name: "El Salvador" },
    { code: "SX", name: "Sint Maarten" },
    { code: "SY", name: "Syrian Arab Republic" },
    { code: "SZ", name: "Swaziland" },
    { code: "TC", name: "Turks and Caicos Islands" },
    { code: "TD", name: "Chad" },
    { code: "TF", name: "French Southern Territories" },
    { code: "TG", name: "Togo" },
    { code: "TH", name: "Thailand" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TK", name: "Tokelau" },
    { code: "TL", name: "Timor-Leste" },
    { code: "TM", name: "Turkmenistan" },
    { code: "TN", name: "Tunisia" },
    { code: "TO", name: "Tonga" },
    { code: "TR", name: "Turkey" },
    { code: "TT", name: "Trinidad and Tobago" },
    { code: "TV", name: "Tuvalu" },
    { code: "TW", name: "Taiwan, Republic Of China" },
    { code: "TZ", name: "Tanzania, United Republic of" },
    { code: "UA", name: "Ukraine" },
    { code: "UG", name: "Uganda" },
    { code: "UM", name: "United States Minor Outlying Islands" },
    { code: "US", name: "United States" },
    { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VA", name: "Holy See (Vatican City State)" },
    { code: "VC", name: "Saint Vincent And The Grenadines" },
    { code: "VE", name: "Venezuela, Bolivarian Republic of" },
    { code: "VG", name: "Virgin Islands, British" },
    { code: "VI", name: "Virgin Islands, U.S." },
    { code: "VN", name: "Vietnam" },
];
