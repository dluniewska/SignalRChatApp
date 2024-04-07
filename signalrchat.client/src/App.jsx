import { useState } from 'react'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import './App.css'
import WaitingRoom from './components/WaitingRoom/WaitingRoom';
import ChatRoom from './components/MessagesList/MessagesList';
import SendMessageForm from './components/SendMessageForm/SendMessageForm';

function App() {
  const [conn, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      const connection = new HubConnectionBuilder()
        .configureLogging(LogLevel.Debug)
        .withUrl(import.meta.env.VITE_CHAT_HUB)
        .withAutomaticReconnect()
        .build();

      connection.on("ReceiveMessage", (username, message) => {
        console.log("msg:", message)
        setMessages(messages => [...messages, { username, message }]);
      });

      connection.on("ReceiveSpecificMessage", (username, message) => {
        console.log("msg:", message)
        setMessages(messages => [...messages, { username, message }]);
      });

      await connection.start();
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(connection);
    }
    catch (error) {
      console.log("JoinChat error", error)
    }
  }

  const sendMessage = async (message) => {
    try {
      conn.invoke("SendMessage", message)
    } catch (error) {
      console.log("Sending error", error)
    }
  }

  return (
    <>
      {!conn ?
        <WaitingRoom joinChatRoom={joinChatRoom} />
        :
        <div className="chat-container">
          <div className="messages" id="messages">
            <ChatRoom messages={messages} />
          </div>
          <div className="notification-area" id="notificationArea">
          </div>
            <SendMessageForm sendMessage={sendMessage}/>
        </div>
      }
    </>
  )
}

export default App
