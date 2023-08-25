import { Button, Card } from "react-bootstrap";

function Leaderboard() {
    return (
        <div>
            <h1>Leaderboard</h1>
            {/* Styled card */}
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>Leaderboard</Card.Title>
                    <Row name="John" score="100" />
                </Card.Body>
            </Card>
        </div>
    );
}

const Row = ({ name, score }) => {
    return (
        <div>
            <table>
                <tr>
                    <td>{name}</td>
                    <td>{score}</td>
                </tr>
            </table>
        </div>
    );
};

export default Leaderboard;
