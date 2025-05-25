import logo from "./logo.svg";
import "./App.css";
import UsernameForm from "./components/UsernameForm";
import ChatRoom from "./components/ChatRoom";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState(null);

  return (
    <>
      {username ? (
        <ChatRoom username={username} />
      ) : (
        <UsernameForm onSubmit={setUsername} />
      )}
    </>
  );
}

export default App;
