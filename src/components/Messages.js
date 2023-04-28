import React from "react";
import { v4 as uuidv4 } from 'uuid';

function Messages(props) {
  const { messages, currentMember } = props;

  function renderMessage(message) {
    const { member, text } = message;
    const myMessage = member.id === currentMember.id;
    const className = myMessage
      ? "Messages-message currentMember"
      : "Messages-message";
      const messageId = uuidv4();
      
    return (
      <div key={messageId} className={className}>
        <span
          className="avatar"
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </div>
    );
  }

  return (
    <ul className="Messages-list">
      {messages.map((m) => renderMessage(m))}
    </ul>
  );
}

export default Messages;