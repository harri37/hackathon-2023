import { useState, useRef, useEffect } from "react";
import OpenAI from "openai";
import speech from "speech-synth";
import { personlities } from "../data/personalities";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const LENGTH_PROMPT =
  "keep your messages short and sweet. any more than 2 sentences and you will seem over interested.";

const GAME_TIME = 18000;

function Game() {
  const [personality, setPersonality] = useState(personlities[9]);
  const [text, setText] = useState("");
  const [gameTime, setGameTime] = useState(GAME_TIME);
  const [responseTimeScore, setResponseTimeScore] = useState(GAME_TIME);
  const [previousMessageTime, setPreviousMessageTime] = useState(GAME_TIME);
  const [messageLengthScore, setMessageLengthScore] = useState(0);
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState([
    { role: "system", content: personality.start },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [sentimentScore, setSentimentScore] = useState(0);

  useEffect(() => {
    if (messages[messages.length - 1].role === "system") {
      fetch("https://api.edenai.run/v2/text/sentiment_analysis", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_EDENAI_KEY}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          text: messages[messages.length - 1].content,
          providers: "ibm",
          language: "en",
        }),
      }).then((response) => {
        response
          .json()
          .then((data) => {
            console.log(data);
            setSentimentScore(
              sentimentScore + 100 * data.ibm.general_sentiment_rate
            );
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (gameTime > 0) {
        setGameTime(gameTime - 1000);
      }
    }, 1000);
    if (gameTime <= 0) {
      setGameOver(true);
    }
    return () => clearTimeout(timer);
  }, [gameTime]);

  useEffect(() => {
    if (messages[messages.length - 1].role === "user") {
      setPreviousMessageTime(gameTime);
    }
    if (responseTimeScore > 0) {
      setResponseTimeScore(previousMessageTime - gameTime);
    }
  }, [messages]);

  useEffect(() => {
    if (messages[messages.length - 1].role === "user") {
      setMessageLengthScore(
        messageLengthScore + messages[messages.length - 1].content.length
      );
    }
  }, [messages]);

  useEffect(() => {
    if (gameOver) {
      setScore(responseTimeScore + messageLengthScore);
    }
  }, [gameOver]);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  function InputBox() {
    const inputRef = useRef(null);

    function focusInput() {
      inputRef.current.focus();
    }

    useEffect(() => {
      focusInput();
    }, [messages]);

    async function getResponse(text) {
      setMessages([...messages, { role: "user", content: text }]);
      openai.chat.completions
        .create({
          messages: [
            {
              role: "system",
              content: personality.prompt + " " + LENGTH_PROMPT,
            },
            ...messages,
            { role: "user", content: text },
          ],
          model: "gpt-3.5-turbo",
        })
        .then((response) => {
          speech.say(
            response.choices[0].message.content,
            speech.getVoiceNames()[19]
          );
          setMessages([
            ...messages,
            { role: "user", content: text },
            { role: "system", content: response.choices[0].message.content },
          ]);
        });
    }

    return (
      <input
        ref={inputRef}
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyUp={async (e) => {
          if (e.key === "Enter") {
            getResponse(text);
            setText("");
          }
        }}
        className="InputBox"
        disabled={gameOver}
      />
    );
  }

  function Score() {
    function Stat({ name, value }) {
      return (
        <div className="Stat">
          <div className="StatName">{name}</div>
          <div className="StatValue">{value}</div>
        </div>
      );
    }

    return (
      <div className="Score">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={require("../images/game2.jpg")} />
          <Card.Body>
            <Card.Title>Game Over</Card.Title>
            <Card.Text>
              <Stat name="Score" value={score} />
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <Stat name="Response Time" value={responseTimeScore} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Stat name="Message Length" value={messageLengthScore} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Stat name="Sentiment" value={sentimentScore} />
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link>
              <Link to="/">Home</Link>
            </Card.Link>
            <Card.Link
              onClick={() => {
                setGameOver(false);
                setGameTime(180000);
                setMessages([{ role: "system", content: personality.start }]);
              }}
            >
              Play Again
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  }

  function GameTimer() {
    const minutes = Math.floor(gameTime / 60000);
    const seconds = Math.floor((gameTime % 60000) / 1000);
    return (
      <div className="GameTimer">
        {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </div>
    );
  }

  return (
    <div className="Game">
      <GameTimer />
      <Chat messages={messages} />
      <InputBox />
      {gameOver && <Score />}
    </div>
  );
}

function Chat({ messages }) {
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    const chat = document.querySelector(".Chat");
    chat.scrollTop = chat.scrollHeight;
  }

  return (
    <div className="Chat">
      {messages.map((message, i) => (
        <div
          className={message.role === "user" ? "message-right" : "message-left"}
          key={i}
        >
          <div
            className="Message"
            style={{
              backgroundColor:
                message.role === "user" ? "lightgreen" : "lightgray",
              color: "white",
            }}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Game;
