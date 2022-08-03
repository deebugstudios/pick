import {useEffect, useState} from 'react'

export const useFetch = (url) => {
     // console.log(useRiderContext(), UseRiderProvider())
    // console.log(UseRiderProvider());
    const [riderdata, setRiderData] = useState({})
    const [loading, setLoading] = useState(true)
    
    const fetchData = async() => {
        const res = await fetch( url , 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            delivery_agent_id:"62de6928e9d7da95308f28fd",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNjkyOGU5ZDdkYTk1MzA4ZjI4ZmQiLCJwaG9uZV9ubyI6IisyMzQ4MTQ5NTE5MTY2IiwiaWF0IjoxNjU4NzQzMDgwfQ.5owkE0ocEQBhcjCN7dsk2gK46itrDMsnJ2CAq_bOYz8"
          })
  
        });
        const data = await res.json();
        const finalData = await data.delivery_agent
        setLoading(false)
        console.log(finalData)
        setRiderData(finalData);
    }
    useEffect(()=> {
      fetchData()
  },[url])
  return (
    {riderdata, loading}
  )
}
