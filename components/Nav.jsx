import { useContext } from "react";
import AppContext from "@/context-api/AppContext";
import Link from "next/link";

function Nav() {
  const { user, handleSignOut } = useContext(AppContext);

  return (
    <nav className="fixed top-0 w-[100%] z-10 h-16 flex justify-between items-center gap-2 bg-gray-800 text-white p-4">
      <span className="font_ptmono w-[40%] font-bold text-xl">
        <Link href="/">️💬 iChat</Link>
      </span>
      <div className="w-[60%] flex items-center justify-end gap-2">
        <div className="">
          {user && (
            <button onClick={() => handleSignOut()} className="outline_btn">
              Logout
            </button>
          )}
        </div>
        <Link className="" href="/profile">
          {user && (
            <img
              className="w-[100%] md:w-[100%] h-10 rounded rounded-full"
              src={user?.photoURL}
              alt="Profile Pic"
              // width="100%"
            />
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
