import { useState, useRef, useEffect } from "react";
import OpenAI from "openai";
function Game() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hiiiiiiiiiiiiiiiiiiiiiiiii" },
  ]);

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });

  function InputBox() {
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    function focusInput() {
      inputRef.current.focus();
    }

    useEffect(() => {
      focusInput();
    }, [messages]);

    async function getResponse(text) {
      console.log("Getting response");
      setMessages([...messages, { role: "user", content: text }]);
      openai.chat.completions
        .create({
          messages: [
            {
              role: "system",
              content:
                "You are a very shy uwu anime girl who is trying to find love but is too shy to talk to anyone.",
            },
            ...messages,
            { role: "user", content: text },
          ],
          model: "gpt-3.5-turbo",
        })
        .then((response) => {
          console.log(response);
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
            console.log("Enter pressed");
            getResponse(text);
            setText("");
          }
        }}
        className="InputBox"
      />
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
            className={
              message.role === "user" ? "message-right" : "message-left"
            }
            key={i}
          >
            <div
              className="Message"
              style={{
                backgroundColor: message.role === "user" ? "green" : "gray",
              }}
            >
              {message.content}
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
