// PageNotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './PageNotFound.css'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-[#17D059]">
      <svg
        className="w-[500px] h-[400px] fill-current"
        viewBox="0 0 200 82.7"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <text
            id="XMLID_3_"
            transform="matrix(1.2187 0 0 1 13 75.6393)"
            className="st0 st1"
          >
            4
          </text>
          <text
            id="XMLID_4_"
            transform="matrix(1.2187 0 0 1 133.0003 73.6393)"
            className="st0 st1"
          >
            4
          </text>
        </g>
        <g id="Calque_2" className="animate-rotate">
          <path
            id="XMLID_11_"
            d="M81.8,29.2c4.1-5.7,10.7-9.4,18.3-9.4c6.3,0,12.1,2.7,16.1,6.9c0.6-0.4,1.1-0.7,1.7-1.1
            c-4.4-4.8-10.8-7.9-17.8-7.9c-8.3,0-15.6,4.2-20,10.6C80.7,28.5,81.3,28.8,81.8,29.2z"
          />
          <path
            id="XMLID_2_"
            d="M118.1,53.7c-4,5.7-10.7,9.5-18.2,9.5c-6.3,0-12.1-2.6-16.2-6.8c-0.6,0.4-1.1,0.7-1.7,1.1
            c4.4,4.8,10.8,7.8,17.9,7.8c8.3,0,15.6-4.3,19.9-10.7C119.2,54.5,118.6,54.1,118.1,53.7z"
          />
        </g>
        <circle className="circle animate-out" cx="100" cy="41" r="1"></circle>
        <path
          id="XMLID_5_"
          className="st2"
          d="M103.8,16.7c0.1,0.3,0.1,0.6,0.1,0.9c11.6,1.9,20.4,11.9,20.4,24.1c0,13.5-10.9,24.4-24.4,24.4
          S75.6,55.1,75.6,41.7c0-3.2,0.6-6.3,1.7-9.1c-0.3-0.2-0.5-0.3-0.7-0.5c-1.2,3-1.9,6.2-1.9,9.6c0,14,11.3,25.3,25.3,25.3
          s25.3-11.3,25.3-25.3C125.3,29,115.9,18.5,103.8,16.7z"
        />
      </svg>
      <div className="message animate-opacity">Something went wrong</div>
      <br />
      <br />
      <div className="message animate-opacity">Page not found</div>
      <br />
      <br />
      <Link
        to="/"
        className="px-6 py-3 bg-[#17D059] text-black rounded-full hover:bg-[#14b04c] transition-colors duration-300 mb-5"
      >
        Go to Home
      </Link>
    </div>
  )
}

export default PageNotFound
