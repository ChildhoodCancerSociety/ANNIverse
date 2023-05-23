import { useEffect, useState } from "react";

export default function useUserEmail() {
  const [userEmail, setUserEmail] = useState([]);

  useEffect(() => {
    const getUserEmail = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        const email = data?.data.map((item: any) => item.email);
        setUserEmail(email);
      } catch (error) {
        console.error(error);
      }
    };
    getUserEmail();
  }, [setUserEmail]);
  return userEmail;
}
