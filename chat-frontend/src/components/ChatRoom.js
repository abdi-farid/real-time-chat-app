// components/ChatRoom.js
import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { FaPaperPlane } from "react-icons/fa";


const ChatRoom = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const stompClient = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current.subscribe("/topic/public", (payload) => {
        const msg = JSON.parse(payload.body);
        setMessages((prev) => [...prev, msg]);
      });

      stompClient.current.send(
        "/app/chat.addUser",
        {},
        JSON.stringify({
          sender: username,
          type: "JOIN",
        })
      );
    });

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [username]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (
      message.trim() &&
      stompClient.current &&
      stompClient.current.connected
    ) {
      stompClient.current.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify({
          sender: username,
          content: message,
          type: "CHAT",
        })
      );
      setMessage("");
    } else {
      console.warn("STOMP non connecté. Message non envoyé.");
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      "#2196F3",
      "#32c787",
      "#00BCD4",
      "#ff5652",
      "#ffc107",
      "#ff85af",
      "#FF9800",
      "#39bbb0",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = 31 * hash + name.charCodeAt(i);
    }
    return colors[Math.abs(hash % colors.length)];
  };

  return (
    <div className="chat-container">
      <div className="chat-header text-center p-3 border-bottom">
        <h2>SpringBoot-React Real Time Chat</h2>
      </div>
      <ul
        className="list-unstyled overflow-auto px-3"
        style={{ height: "400px" }}
      >
        {messages.map((msg, index) => {
          const isOwnMessage = msg.sender === username;
          return (
            <li
              key={index}
              className={`my-2 d-flex ${
                isOwnMessage ? "justify-content-end" : "justify-content-start"
              }`}
            >
              {msg.type === "CHAT" ? (
                <div
                  className={`p-2 rounded shadow-sm ${
                    isOwnMessage ? "bg-success text-white" : "bg-light"
                  }`}
                  style={{
                    maxWidth: "70%",
                  }}
                >
                  <div className="small fw-bold">
                    {isOwnMessage ? "You" : msg.sender}
                  </div>
                  <div>{msg.content}</div>
                </div>
              ) : (
                <div className="w-100 text-center text-muted small">
                  {msg.sender} {msg.type === "JOIN" ? "joined!" : "left!"}
                </div>
              )}
            </li>
          );
        })}
        <div ref={messageEndRef} />
      </ul>
      <form onSubmit={sendMessage} className="p-3 border-top d-flex">
        <input
            type="text"
            className="form-control me-2"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-success" title="Send">
          <FaPaperPlane size={18}/>
        </button>

      </form>
    </div>
  );
};

export default ChatRoom;
