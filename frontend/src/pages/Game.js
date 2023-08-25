import React from "react";
import { useState } from "react";

function Game() {
  const [messages, setMessages] = useState([
    { sender: "other", text: "Hello" },
  ]);

  function InputBox() {
    const [text, setText] = useState("");

    return (
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setMessages([...messages, { sender: "user", text: text }]);
            setText("");
          }
        }}
        className="InputBox"
      />
    );
  }

  function Chat({ messages }) {
    return (
      <div className="Chat">
        {messages.map((message, i) => (
          <div
            className={
              message.sender === "user" ? "message-right" : "message-left"
            }
            key={i}
          >
            <div
              className="Message"
              style={{
                backgroundColor: message.sender === "user" ? "green" : "gray",
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="Game">
      <Chat messages={messages} />
      <InputBox />
    </div>
  );
}

export default Game;
