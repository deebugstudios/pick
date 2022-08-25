import { useEffect, useState } from "react";

export const useFetch = (url) => {
  // console.log(useRiderContext(), UseRiderProvider())
  // console.log(UseRiderProvider());
  const [riderdata, setRiderData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        delivery_agent_id: "63029e8bd7325cc1c3f1faa4",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9ubyI6IisyMzQ4MTMwNDM5ODM0IiwiX2lkIjoiNjMwMjllOGJkNzMyNWNjMWMzZjFmYWE0IiwiaWF0IjoxNjYxMzM0NzIyfQ.lJqklLaU1XWNjHGc105Iy724DEnLcV64ADbpPSzQlbw",
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
  return { riderdata, loading };
};
