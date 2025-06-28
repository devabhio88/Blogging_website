import React from 'react'
import { Link } from 'react-router-dom'

function Logo({width = '100px'}) {
  return (
    <div>
       <Link to='/'>
            <img
             src="/assets/settings.png" 
             alt="" 
             srcset="" 
             width="30px"
             height="30px"
             />

              </Link>
    </div>
  )
}

export default Logo