import React from "react";
import Link from 'next/link';

function ChatList({ data }) {
  return (
    <Link href={`/chat?id=${data.uid}`}>
      <div className="mb-4 flex items-center gap-2 active:bg-gray-200 py-2">
        <div className="w-14">
          <img
            className="rounded rounded-full"
            src={data.photo}
            alt="Profile Pic"
            width="100%"
          />
        </div>
        <div className="text-gray-500">
          <h4>{data.name}</h4>
          <p>{data.date}</p>
        </div>
      </div>
    </Link>
  );
}

export default ChatList;
