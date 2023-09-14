import React from "react";
import Link from 'next/link';

function ActiveFriends({userData}) {
  return (
    <div key={userData.id} className="w-14">
      <Link href={`/chat?id=${userData.data.uid}`}>
        <img
          className="rounded rounded-full"
          src={userData.data.photo}
          alt="Profile Pic"
          width="100%"
        />
        <p className="text-sm text-center break-words">
          {userData.data.name.slice(0, 10)}...
        </p>
      </Link>
    </div>
  );
}

export default ActiveFriends;
