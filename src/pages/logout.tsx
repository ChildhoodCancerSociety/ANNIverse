"use client";

import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      console.log("user signed out");
      router.push("/login");
    } else {
      console.log("error signing out");
    }
  };
  return (
    <button onClick={handleLogout}>Logout</button>
    // <div></div>
  );
};

export default Logout;
