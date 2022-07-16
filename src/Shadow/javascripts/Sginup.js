import React, {useState} from 'react'

export const Sginup = () => {
const [fullname, setFullname] = useState("");
function handleChange (e) {
    setFullname(
            e.target.value
    )
    
}

  return (
    <div>
        <input type="text" name='fullname' onChange={handleChange} />

    </div>
  )
}
