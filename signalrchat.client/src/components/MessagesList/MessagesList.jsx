import React from 'react'
import './MessagesListStyles.css'

const ChatRoom = ({ messages }) => {
    console.log(messages)
    return (
        <div className="chat-room">
            <div className="chat-room-header">ChatRoom {name}</div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="chat-message">
                        <span className="message-sender">{message.username}: </span>
                        <span className="message-text">{message.message}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatRoom