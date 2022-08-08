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
            delivery_agent_id:"62de5fcae9d7da95308f28a8",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmRlNWZjYWU5ZDdkYTk1MzA4ZjI4YTgiLCJwaG9uZV9ubyI6IisyMzQ5MTUzNTQwMDIzIiwiaWF0IjoxNjU4NzQwNjgyfQ.Lf1I9AZLNRuY5Q3w7uOqQSGDRoKb5yUUe61LNpdQMUU"
          })
  
        });
        const data = await res.json();
        const finalData = await data.delivery_agent
        setLoading(false)
        setRiderData(finalData);
    }
    useEffect(()=> {
      fetchData()
  },[url])
  return (
    {riderdata, loading}
  )
}
