import React from 'react'
import {Link} from 'react-router-dom'
import './Home.scss'

const Home = () => {
  return (
    <div id='home'>
      <h1>Welcome!</h1>
      <Link to='/words'>Words</Link>
      <br></br>
      <Link to='/projects'>Projects</Link>
    </div>
  )
}

// returnib Home functsioni
export default Home
