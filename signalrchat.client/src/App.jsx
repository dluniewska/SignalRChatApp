import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <div class="chat-container">
        <div class="messages" id="messages">
        </div>
        <div class="notification-area" id="notificationArea">
        </div>
        <form id="chatForm" class="input-area">
          <input type="text" id="messageInput" placeholder="Type your message..." />
          <input type="submit" value="Send" />
        </form>
      </div>
    </>
  )
}

export default App
