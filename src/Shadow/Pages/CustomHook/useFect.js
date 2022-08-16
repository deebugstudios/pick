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
        delivery_agent_id: "62e29e57b635cab842b2290c",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUyOWU1N2I2MzVjYWI4NDJiMjI5MGMiLCJwaG9uZV9ubyI6IisyMzQ5MDM3NzkxNjM3IiwiaWF0IjoxNjU5MDE4ODM5fQ.AdParFVgCDIKuHyD79zYVtLzT6Ny3Bbfa__AYs9bm-Q",
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
