import React from "react";
import Ahmad from "../../assets/Ahmad.jpg"; // fallback image

function User({ user }) {
  return (
    <div>
      <div className="flex space-x-4 px-8 py-7 hover:bg-slate-600 duration-300 cursor-pointer">
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img
              src={user?.image || Ahmad}
              alt={user?.name || "User Avatar"}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold">{user?.name || "Unknown User"}</h1>
          <span>{user?.email || "No email provided"}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
