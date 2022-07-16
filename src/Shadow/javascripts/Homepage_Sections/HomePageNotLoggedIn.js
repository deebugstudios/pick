import React from 'react'
import Main from '../Main'
import NavigationBar from '../NavigationBar'
import './homepagenotloggedin.css'
const HomePageNotLoggedIn = () => {
  return (
    <section className="home-notloggedin">
        <NavigationBar className ='component-nav'/>
        <Main/>
    </section>
  )
}

export default HomePageNotLoggedIn