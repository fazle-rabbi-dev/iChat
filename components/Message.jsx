import React from "react";

function Message({data}) {
  const { msg, user, receiver } = data
  
  return (
    <div
      className={`${
        msg.senderId === user?.uid ? "ml-auto text-end" : ""
      } w-[70%] break-all`}
      key={msg.id}
    >
      <p className="font-light text-gray-800 text-sm">
        {msg.senderId !== user?.uid && receiver?.data.name}
      </p>
      <span
        className={`${msg.senderId === user?.uid ? "sender_msg" : "other_msg"}`}
      >
        {msg.message}
      </span>
    </div>
  );
}

export default Message;
