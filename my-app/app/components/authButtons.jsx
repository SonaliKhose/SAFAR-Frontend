"use client"
import Link from "next/link";

import jwt from "jsonwebtoken";
import { usePathname } from "next/navigation";

const AuthButtons = () => {
  const pathName = usePathname();
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  let username = null;

  if (token) {
    const decodedToken = jwt.decode(token);
    if (decodedToken) {
      username = decodedToken.username;
    }
  }

  return (
    <>
      {username ? (
        <div>{username}</div>
      ) : (
        <div className="flex gap-6">
          <button className="text-blue-600 border-2 border-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition duration-300">
            <Link href="/login">Login</Link>
          </button>
          <button className="text-blue-600 border-2 border-blue-600 px-5 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition duration-300">
            <Link href="/signup">Sign Up</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default AuthButtons;
