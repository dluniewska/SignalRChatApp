import React, { useState } from 'react'
import './WaitingRoomStyles.css'

const WaitingRoom = ({ joinChatRoom }) => {

    const[username, setUsername] = useState('');
    const[chatroom, setChatroom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Chatroom:", chatroom);
        joinChatRoom(username, chatroom)
      };

      return (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="join-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <span> </span>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="chatroom">Chatroom Name:</label>
              <span> </span>
              <input
                type="text"
                id="chatroom"
                name="chatroom"
                placeholder="Enter chatroom name"
                value={chatroom}
                onChange={(e) => setChatroom(e.target.value)}
              />
            </div>
            <button type="submit">Join Chatroom</button>
          </form>
        </div>
      );
}

export default WaitingRoom