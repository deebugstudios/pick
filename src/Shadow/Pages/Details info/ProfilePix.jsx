import React from 'react'
import './profilepix.css'
import profileimage from '../../images/profileimage.png'
export const ProfilePix = () => {
  return (
    <div className='profile-prop'>
        <div className='profile-picture'>
            <img src={profileimage} alt='profile picture' />
        </div>
        <div className='profile-text'>
            <h3>Andrew Olatunji</h3>
            <h6>andrewtunji@gmail.com</h6>
        </div>
    </div>
  )
}
