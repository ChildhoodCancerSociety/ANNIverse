import { useEffect, useState } from "react";

export default function useUserExpected() {
  const [userExpected, setUserExpected] = useState([]);
  useEffect(() => {
    const getUserExpected = async () => {
      try {
        const res = await fetch("/api/userExpected");
        const data = await res.json();
        const expected = data?.map((item: any) => item.user.email);
        setUserExpected(expected);
      } catch (error) {
        console.error(error);
      }
    };
    getUserExpected();
  }, [setUserExpected]);
  return userExpected;
}
