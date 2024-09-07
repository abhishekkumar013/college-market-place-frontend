import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className=" bg-green-500 hidden lg:block text-white text-center py-2 text-sm mt-auto md:mt-20 fixed bottom-0 left-0 right-0 lg:relative">
      <p>© Copyright {currentYear} | KIITMart | All Rights Reserved</p>
    </footer>
  )
}

export default Footer
