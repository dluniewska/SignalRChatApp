import React, { useState } from 'react'
import './SendMessageFormStyles.css'

const SendMessageForm = ({ sendMessage }) => {
    const[msg, setMsg] = useState('');

    const handleSend = () => {
        console.log(`Sending message: ${msg}`);
        sendMessage(msg);
        setMsg('');
    }

    return (
        <div id="chatForm" className="input-area">
            <input 
                type="text" 
                id="messageInput" 
                placeholder="Type your message..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)} />
            <button className='button-submit' onClick={() => handleSend()}>Send</button>
        </div>
    )
}

export default SendMessageForm