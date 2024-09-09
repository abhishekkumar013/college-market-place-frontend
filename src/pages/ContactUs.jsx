import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import Layout from '../components/Layout/Layout'

const ContactUs = () => {
  const contactChannels = [
    {
      name: 'Instagram',
      icon: FiInstagram,
      link: 'https://www.instagram.com/kiitmart/',
      color: 'text-red-500',
    },
  ]

  return (
    <Layout title="home" description="" keywords="" author="">
      <div className="flex items-center justify-center mt-20 2xl:mt-32 p-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white  p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            You may contact us via these channels:
          </h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-16">
            {contactChannels.map((channel) => (
              <a
                key={channel.name}
                href={channel.link}
                className="flex flex-col items-center group transition-transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                <channel.icon
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 ${channel.color}`}
                />
                <span className="text-xs sm:text-sm md:text-base font-medium text-center">
                  {channel.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ContactUs
