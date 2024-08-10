import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-green-500 text-white text-center py-2 text-sm">
      <p>© Copyright {currentYear} | KIITMart | All Rights Reserved</p>
    </footer>
  )
}

export default Footer
