import { useEffect, useState } from "react";

export const useFetch = (url) => {
  // console.log(useRiderContext(), UseRiderProvider())
  // console.log(UseRiderProvider());
  const [riderdata, setRiderData] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("rubbish")
  const fetchData = async () => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delivery_agent_id: "63029e8bd7325cc1c3f1faa4",
        token: JSON.parse(token),
      }),
    });
    const data = await res.json();
    const finalData = await data.delivery_agent;
    setLoading(false);
    setRiderData(finalData);
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return { riderdata, loading, token };
};
