import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer(){
  return(
    <div className="footerContainer">
      <div className="iconContainer">
        <a href = "mailto: danielrs9504@gmail.com"><i className="fas fa-envelope-square"></i></a>
        <a target="_blank" href="https://www.linkedin.com/in/daniel-ramirez-salazar-800081145/?locale=en_US"><i className="fab fa-linkedin"></i></a>
        <a target="_blank" href="https://github.com/danielrs95"><i className="fab fa-github"></i></a>
      </div>
      <div className="footerBottom"><span className='footerText'>Check my social media</span></div>
    </div>
  )
}
